'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { StoredArticle } from '@/lib/articles-db'

type TabLang = 'ro' | 'ru' | 'en'

const SUGGESTED_TOPICS = [
  'SEO pentru afaceri mici în Moldova 2025',
  'Cum să-ți deschizi un magazin online în Moldova',
  'Beneficiile automatizării AI pentru IMM-uri',
  'Google Ads vs Facebook Ads — ce funcționează în Moldova',
  'CRM vs ERP — ce are nevoie afacerea ta',
  'Tendințe e-commerce Europa 2025',
]

export default function GenerateForm() {
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState<'idle' | 'generating' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<StoredArticle | null>(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<TabLang>('ro')
  const router = useRouter()

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault()
    if (!topic.trim()) return

    setStatus('generating')
    setError('')
    setResult(null)

    try {
      const res = await fetch('/api/articles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      })

      const data = await res.json() as { article?: StoredArticle; error?: string }

      if (!res.ok || !data.article) throw new Error(data.error ?? 'Generation failed')

      setResult(data.article)
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Eroare necunoscută')
      setStatus('error')
    }
  }

  function handleGoToEdit() {
    if (result) router.push(`/admin/articles/${result.id}`)
  }

  return (
    <div className="space-y-6">
      {/* Generate form */}
      <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-white/60 text-sm mb-1.5 font-medium">
              Subiectul articolului *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="ex: SEO pentru magazine online în Moldova"
              required
              disabled={status === 'generating'}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors disabled:opacity-50"
            />
          </div>

          {/* Quick suggestions */}
          <div>
            <p className="text-white/30 text-xs mb-2">Sugestii rapide:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-white/5 text-white/50 hover:bg-[#e8ff00]/10 hover:text-[#e8ff00] transition-colors border border-white/5"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'generating' || !topic.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#e8ff00] text-black font-bold rounded-xl hover:bg-[#c8db00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'generating' ? (
              <>
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Se generează RO + RU + EN...
              </>
            ) : (
              <>
                <span>✨</span>
                Generează articol cu Gemini AI
              </>
            )}
          </button>
        </form>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          ❌ {error}
        </div>
      )}

      {/* Preview after generation */}
      {status === 'done' && result && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-white font-semibold">Articol generat cu succes!</span>
            </div>
            <button
              onClick={handleGoToEdit}
              className="flex items-center gap-2 px-5 py-2 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/15 transition-colors text-sm"
            >
              ✏️ Editează articolul
            </button>
          </div>

          {/* Lang tabs */}
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex border-b border-white/10 bg-zinc-900/50">
              {(['ro', 'ru', 'en'] as TabLang[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  className={`px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === lang
                      ? 'text-[#e8ff00] border-b-2 border-[#e8ff00]'
                      : 'text-white/40 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="p-6 bg-zinc-900">
              <ArticlePreview article={result} lang={activeTab} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ArticlePreview({ article, lang }: { article: StoredArticle; lang: TabLang }) {
  const version = article[lang]
  const image = article.images[0]

  return (
    <div className="space-y-4">
      {image && (
        <img src={image.url} alt={image.alt} className="w-full h-40 object-cover rounded-xl" />
      )}

      <div>
        <span className="text-xs font-semibold text-[#e8ff00]/60 uppercase tracking-wider">Titlu</span>
        <p className="text-white font-bold text-lg mt-1">{version.title}</p>
      </div>

      <div>
        <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">Meta description</span>
        <p className="text-white/60 text-sm mt-1">{version.metaDescription}</p>
      </div>

      <div>
        <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">Slug</span>
        <p className="text-white/40 font-mono text-xs mt-1">/{lang}/articole/{version.slug}</p>
      </div>

      <div>
        <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">Keywords</span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {version.keywords.map((kw) => (
            <span key={kw} className="px-2 py-0.5 text-xs bg-white/5 text-white/40 rounded-full border border-white/10">
              {kw}
            </span>
          ))}
        </div>
      </div>

      <div>
        <span className="text-xs font-semibold text-white/30 uppercase tracking-wider">Preview conținut</span>
        <div
          className="mt-2 text-white/50 text-sm leading-relaxed line-clamp-6 prose prose-invert prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: version.content }}
        />
      </div>
    </div>
  )
}
