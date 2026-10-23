import { readFileSync } from 'node:fs'
import { PGlite } from '@electric-sql/pglite'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

// Real Postgres (in-memory WASM) behind the same query() signature as lib/db.ts
const pg = new PGlite()
const failNext = { value: false }

vi.mock('./db', () => ({
  query: async (text: string, params: unknown[] = []) => {
    if (failNext.value) {
      failNext.value = false
      throw new Error('connection refused')
    }
    return (await pg.query(text, params)).rows
  },
}))

vi.mock('next/cache', () => ({
  unstable_cache: <T>(fn: T) => fn,
  revalidateTag: vi.fn(),
}))

import { revalidateTag } from 'next/cache'
import {
  deleteArticle,
  getAllArticles,
  getArticleById,
  getArticleBySlug,
  getArticleSummaries,
  saveArticle,
  updateArticle,
  type StoredArticle,
} from './articles-db'

function makeArticle(id: string, slug: string, createdAt: string): StoredArticle {
  const version = (lang: string) => ({
    title: `Title ${slug} ${lang}`,
    slug: `${slug}-${lang}`,
    metaDescription: `Meta ${slug}`,
    content: `<p>Long content for ${slug}</p>`,
    keywords: ['seo', 'web'],
    imageQuery: 'office',
  })
  return {
    id,
    topic: `Topic ${slug}`,
    createdAt,
    ro: version('ro'),
    ru: version('ru'),
    en: version('en'),
    images: [{ url: `https://images.unsplash.com/${slug}`, thumb: '', alt: slug, photographer: 'x', photographerUrl: '' }],
  }
}

async function seed(...articles: StoredArticle[]) {
  for (const a of articles) {
    await pg.query(
      `INSERT INTO articles (id, topic, created_at, ro, ru, en, images) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [a.id, a.topic, a.createdAt, JSON.stringify(a.ro), JSON.stringify(a.ru), JSON.stringify(a.en), JSON.stringify(a.images)]
    )
  }
}

const older = makeArticle('1', 'a', '2026-04-14T09:42:49.523Z')
const newer = makeArticle('2', 'b', '2026-10-15T08:00:00.000Z')

beforeAll(async () => {
  await pg.exec(readFileSync(new URL('../db/schema.sql', import.meta.url), 'utf8'))
})

beforeEach(async () => {
  await pg.exec('TRUNCATE articles')
  failNext.value = false
  vi.mocked(revalidateTag).mockClear()
})

describe('reads', () => {
  it('lists summaries newest first, without content', async () => {
    await seed(older, newer)

    const summaries = await getArticleSummaries()

    expect(summaries.map((s) => s.id)).toEqual(['2', '1'])
    expect(summaries[0]).toEqual({
      id: '2',
      topic: 'Topic b',
      createdAt: '2026-10-15T08:00:00.000Z',
      ro: { title: 'Title b ro', slug: 'b-ro', metaDescription: 'Meta b', keywords: ['seo', 'web'] },
      ru: { title: 'Title b ru', slug: 'b-ru', metaDescription: 'Meta b', keywords: ['seo', 'web'] },
      en: { title: 'Title b en', slug: 'b-en', metaDescription: 'Meta b', keywords: ['seo', 'web'] },
      image: newer.images[0],
    })
  })

  it('summary image is null when an article has no images', async () => {
    await seed({ ...older, images: [] })
    expect((await getArticleSummaries())[0].image).toBeNull()
  })

  it('getArticleById returns the full article unchanged', async () => {
    await seed(older)
    expect(await getArticleById('1')).toEqual(older)
    expect(await getArticleById('missing')).toBeNull()
  })

  it('getArticleBySlug matches the slug of the requested language only', async () => {
    await seed(older, newer)
    expect((await getArticleBySlug('a-ru', 'ru'))?.id).toBe('1')
    expect(await getArticleBySlug('a-ru', 'ro')).toBeNull()
  })

  it('getAllArticles returns full articles newest first', async () => {
    await seed(older, newer)
    expect(await getAllArticles()).toEqual([newer, older])
  })

  it('propagates database errors instead of returning an empty list', async () => {
    failNext.value = true
    await expect(getArticleSummaries()).rejects.toThrow('connection refused')
  })
})

describe('writes', () => {
  it('saveArticle inserts a new row with a generated id and invalidates the cache', async () => {
    const saved = await saveArticle({
      topic: newer.topic, ro: newer.ro, ru: newer.ru, en: newer.en, images: newer.images,
    })

    expect(saved.id).toMatch(/^\d+$/)
    expect(await getArticleById(saved.id)).toEqual(saved)
    expect(saved.ro).toEqual(newer.ro)
    expect(revalidateTag).toHaveBeenCalledWith('articles', { expire: 0 })
  })

  it('updateArticle keeps id and createdAt immutable', async () => {
    await seed(older)

    const updated = await updateArticle('1', {
      id: 'hijack',
      createdAt: '2000-01-01T00:00:00.000Z',
      ro: { ...older.ro, title: 'New title' },
    })

    expect(updated).toEqual({ ...older, ro: { ...older.ro, title: 'New title' } })
    expect(await getArticleById('hijack')).toBeNull()
    expect((await getArticleSummaries())[0].ro.title).toBe('New title')
    expect(revalidateTag).toHaveBeenCalledTimes(1)
  })

  it('updateArticle returns null for an unknown id without invalidating', async () => {
    expect(await updateArticle('nope', { topic: 'x' })).toBeNull()
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('deleteArticle removes only the given article', async () => {
    await seed(older, newer)

    expect(await deleteArticle('1')).toBe(true)

    expect((await getArticleSummaries()).map((s) => s.id)).toEqual(['2'])
    expect(revalidateTag).toHaveBeenCalledTimes(1)
  })

  it('deleteArticle returns false for an unknown id', async () => {
    expect(await deleteArticle('nope')).toBe(false)
    expect(revalidateTag).not.toHaveBeenCalled()
  })

  it('stores content with quotes and unicode intact', async () => {
    const tricky = { ...older.ro, content: `<p class="x">Afacerea ta — „ghid” 'complet' ✓</p>` }
    await seed(older)
    await updateArticle('1', { ro: tricky })
    expect((await getArticleById('1'))?.ro.content).toBe(tricky.content)
  })
})
