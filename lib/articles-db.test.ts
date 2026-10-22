import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next/cache', () => ({
  unstable_cache: <T>(fn: T) => fn,
  revalidateTag: vi.fn(),
}))

import { revalidateTag } from 'next/cache'
import {
  deleteArticle,
  getAllArticles,
  getArticleBySlug,
  getArticleSummaries,
  saveArticle,
  updateArticle,
  type StoredArticle,
} from './articles-db'

// ── In-memory fake of the Upstash REST API ────────────────────────────────────

let store: Map<string, string>
let failNextRequest: boolean
let requests: Array<{ endpoint: string; commands: string[][] }>

function runCommand([cmd, ...args]: string[]): unknown {
  switch (cmd) {
    case 'GET': return store.get(args[0]) ?? null
    case 'SET': store.set(args[0], args[1]); return 'OK'
    case 'DEL': return store.delete(args[0]) ? 1 : 0
    case 'MGET': return args.map((k) => store.get(k) ?? null)
    case 'STRLEN': return store.get(args[0])?.length ?? 0
    default: throw new Error(`unsupported command ${cmd}`)
  }
}

const fakeFetch = vi.fn(async (url: string, init: { body: string }) => {
  const endpoint = url.split('/').pop() ?? ''
  const commands = JSON.parse(init.body) as string[][]
  requests.push({ endpoint, commands })
  if (failNextRequest) {
    failNextRequest = false
    return new Response('boom', { status: 500, statusText: 'Internal Server Error' })
  }
  return Response.json(commands.map((c) => ({ result: runCommand(c) })))
})

function makeArticle(id: string, slug: string): StoredArticle {
  const version = (lang: string) => ({
    title: `Title ${slug} ${lang}`,
    slug: `${slug}-${lang}`,
    metaDescription: `Meta ${slug}`,
    content: `<p>Long content for ${slug}</p>`,
    keywords: ['seo'],
    imageQuery: 'office',
  })
  return {
    id,
    topic: `Topic ${slug}`,
    createdAt: '2026-04-17T14:11:44.898Z',
    ro: version('ro'),
    ru: version('ru'),
    en: version('en'),
    images: [{ url: `https://images.unsplash.com/${slug}`, thumb: '', alt: slug, photographer: 'x', photographerUrl: '' }],
  }
}

beforeEach(() => {
  store = new Map()
  failNextRequest = false
  requests = []
  vi.stubEnv('UPSTASH_REDIS_REST_URL', 'https://fake.upstash.io')
  vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', 'token')
  vi.stubGlobal('fetch', fakeFetch)
  vi.mocked(revalidateTag).mockClear()
})

describe('legacy migration', () => {
  it('moves the single "articles" blob into per-article keys and an index, keeping the blob', async () => {
    const legacy = [makeArticle('2', 'b'), makeArticle('1', 'a')]
    store.set('articles', JSON.stringify(legacy))

    const summaries = await getArticleSummaries()

    expect(summaries.map((s) => s.id)).toEqual(['2', '1'])
    expect(JSON.parse(store.get('article:1')!)).toEqual(legacy[1])
    expect(JSON.parse(store.get('articles:index')!)).toHaveLength(2)
    expect(store.get('articles')).toBe(JSON.stringify(legacy))
  })

  it('splits a large legacy blob into several requests and writes the index last', async () => {
    const big = Array.from({ length: 30 }, (_, i) => {
      const a = makeArticle(String(i), `s${i}`)
      return { ...a, ro: { ...a.ro, content: 'x'.repeat(40_000) } }
    })
    store.set('articles', JSON.stringify(big))

    await getArticleSummaries()

    const writes = requests.filter((r) => r.commands.some(([c]) => c === 'SET'))
    expect(writes.length).toBeGreaterThan(2)
    writes.forEach((r) => expect(JSON.stringify(r.commands).length).toBeLessThan(500_000))
    expect(writes.at(-1)?.commands).toEqual([['SET', 'articles:index', expect.any(String)]])
    expect(store.size).toBe(32)
  })

  it('leaves no index when the migration is interrupted, so it retries on the next read', async () => {
    store.set('articles', JSON.stringify([makeArticle('1', 'a')]))
    let calls = 0
    fakeFetch.mockImplementationOnce(async (url, init) => {
      calls++
      return Response.json(JSON.parse(init.body).map((c: string[]) => ({ result: runCommand(c) })))
    })
    fakeFetch.mockImplementationOnce(async (url, init) => {
      calls++
      return Response.json(JSON.parse(init.body).map((c: string[]) => ({ result: runCommand(c) })))
    })
    fakeFetch.mockImplementationOnce(async () => {
      calls++
      return new Response('boom', { status: 500 })
    })

    await expect(getArticleSummaries()).rejects.toThrow()
    expect(calls).toBe(3)
    expect(store.has('articles:index')).toBe(false)

    expect(await getArticleSummaries()).toHaveLength(1)
  })

  it('handles a double-encoded legacy blob', async () => {
    store.set('articles', JSON.stringify(JSON.stringify([makeArticle('1', 'a')])))
    expect(await getArticleSummaries()).toHaveLength(1)
  })

  it('returns an empty list when neither index nor legacy blob exists', async () => {
    expect(await getArticleSummaries()).toEqual([])
    expect(store.size).toBe(0)
  })

  it('does not migrate again once the index exists', async () => {
    store.set('articles', JSON.stringify([makeArticle('1', 'a')]))
    await getArticleSummaries()
    requests = []

    await getArticleSummaries()

    expect(requests).toEqual([{ endpoint: 'pipeline', commands: [['GET', 'articles:index']] }])
  })
})

describe('reads', () => {
  it('summaries carry no article content', async () => {
    await saveArticle(makeArticle('ignored', 'a'))
    const [summary] = await getArticleSummaries()
    expect(JSON.stringify(summary)).not.toContain('Long content')
    expect(summary.image?.url).toBe('https://images.unsplash.com/a')
  })

  it('getArticleBySlug fetches only the matching article', async () => {
    store.set('articles', JSON.stringify([makeArticle('2', 'b'), makeArticle('1', 'a')]))
    await getArticleSummaries()
    requests = []

    const article = await getArticleBySlug('a-ru', 'ru')

    expect(article?.id).toBe('1')
    expect(requests.flatMap((r) => r.commands)).toEqual([['GET', 'articles:index'], ['GET', 'article:1']])
  })

  it('getArticleBySlug returns null for an unknown slug', async () => {
    expect(await getArticleBySlug('missing', 'ro')).toBeNull()
  })

  it('getAllArticles returns full articles in index order', async () => {
    store.set('articles', JSON.stringify([makeArticle('2', 'b'), makeArticle('1', 'a')]))
    const all = await getAllArticles()
    expect(all.map((a) => a.ro.content)).toEqual(['<p>Long content for b</p>', '<p>Long content for a</p>'])
  })

  it('throws instead of returning an empty list when Redis fails', async () => {
    failNextRequest = true
    await expect(getArticleSummaries()).rejects.toThrow(/500/)
  })

  it('throws when the Upstash env vars are missing', async () => {
    vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '')
    await expect(getArticleSummaries()).rejects.toThrow(/not set/)
  })
})

describe('writes', () => {
  it('saveArticle prepends to the index atomically and invalidates the cache', async () => {
    store.set('articles', JSON.stringify([makeArticle('1', 'a')]))

    const saved = await saveArticle(makeArticle('ignored', 'b'))

    const index = JSON.parse(store.get('articles:index')!)
    expect(index.map((s: { id: string }) => s.id)).toEqual([saved.id, '1'])
    expect(store.has(`article:${saved.id}`)).toBe(true)
    expect(requests.at(-1)?.endpoint).toBe('multi-exec')
    expect(revalidateTag).toHaveBeenCalledWith('articles', { expire: 0 })
  })

  it('saveArticle does not overwrite existing articles when the index read fails', async () => {
    store.set('articles', JSON.stringify([makeArticle('1', 'a')]))
    await getArticleSummaries()
    const before = new Map(store)
    failNextRequest = true

    await expect(saveArticle(makeArticle('ignored', 'b'))).rejects.toThrow()

    expect(store).toEqual(before)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('updateArticle keeps id and createdAt and refreshes the summary', async () => {
    store.set('articles', JSON.stringify([makeArticle('1', 'a')]))
    const original = makeArticle('1', 'a')

    const updated = await updateArticle('1', {
      id: 'hijack',
      createdAt: '2000-01-01T00:00:00.000Z',
      ro: { ...original.ro, title: 'New title' },
    })

    expect(updated?.id).toBe('1')
    expect(updated?.createdAt).toBe(original.createdAt)
    expect(JSON.parse(store.get('articles:index')!)[0].ro.title).toBe('New title')
    expect(store.has('article:hijack')).toBe(false)
  })

  it('updateArticle returns null for an unknown id without writing', async () => {
    expect(await updateArticle('nope', { topic: 'x' })).toBeNull()
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('deleteArticle removes the article key and index entry', async () => {
    store.set('articles', JSON.stringify([makeArticle('2', 'b'), makeArticle('1', 'a')]))

    expect(await deleteArticle('1')).toBe(true)

    expect(store.has('article:1')).toBe(false)
    expect(JSON.parse(store.get('articles:index')!).map((s: { id: string }) => s.id)).toEqual(['2'])
  })

  it('deleteArticle returns false for an unknown id', async () => {
    expect(await deleteArticle('nope')).toBe(false)
  })

  it('a deleted-everything index is not re-migrated from the legacy blob', async () => {
    store.set('articles', JSON.stringify([makeArticle('1', 'a')]))
    await deleteArticle('1')
    expect(await getArticleSummaries()).toEqual([])
  })
})
