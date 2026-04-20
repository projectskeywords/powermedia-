'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { StoredArticle } from '@/lib/articles-db'
import type { ArticleVersion } from '@/lib/gemini'

type TabLang = 'ro' | 'ru' | 'en'

interface ArticleEditorProps {
  article: StoredArticle
}

export default function ArticleEditor({ article }: ArticleEditorProps) {
  const [activeTab, setActiveTab] = useState<TabLang>('ro')
  const [data, setData] = useState({
    ro: { ...article.ro },
    ru: { ...article.ru },
    en: { ...article.en },
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [preview, setPreview] = useState(false)
  const router = useRouter()

  function updateField(lang: TabLang, field: keyof ArticleVersion, value: string | string[]) {
    setData((prev) => ({
      ...prev,
      [lang]: { ...prev[lang], [field]: value },
    }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      await fetch(`/api/admin/articles/${article.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ro: data.ro, ru: data.ru, en: data.en }),
      })
      setSaved(true)
      router.refresh()
    } finally {
      setSaving(false)
    }
  }

  const version = data[activeTab]

  return (
    <div className="space-y-4">
      {/* Tab bar + save */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-zinc-900 rounded-xl p-1 border border-white/10">
          {(['ro', 'ru', 'en'] as TabLang[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-5 py-2 text-sm font-bold rounded-lg uppercase tracking-wider transition-colors ${
                activeTab === lang
                  ? 'bg-[#e8ff00] text-black'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors border ${
              preview
                ? 'bg-white/10 text-white border-white/20'
                : 'text-white/40 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            {preview ? '📝 Editor' : '👁️ Preview'}
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`flex items-center gap-2 px-5 py-2 font-bold rounded-xl text-sm transition-colors ${
              saved
                ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                : 'bg-[#e8ff00] text-black hover:bg-[#c8db00]'
            } disabled:opacity-50`}
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Salvare...
              </>
            ) : saved ? (
              '✓ Salvat'
            ) : (
              '💾 Salvează'
            )}
          </button>
        </div>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div className="rounded-2xl border border-white/10 bg-zinc-900 p-8">
          <h1 className="text-white text-3xl font-black mb-3">{version.title}</h1>
          <p className="text-white/40 text-sm mb-4 italic">{version.metaDescription}</p>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {version.keywords.map((kw) => (
              <span key={kw} className="px-2 py-0.5 text-xs bg-[#e8ff00]/10 text-[#e8ff00]/70 rounded-full border border-[#e8ff00]/20">
                {kw}
              </span>
            ))}
          </div>
          <div
            className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/70 prose-a:text-[#e8ff00]"
            dangerouslySetInnerHTML={{ __html: version.content }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left column: meta fields */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Meta — {activeTab.toUpperCase()}
              </h3>

              <Field
                label="Titlu (H1)"
                value={version.title}
                onChange={(v) => updateField(activeTab, 'title', v)}
                placeholder="Titlul articolului..."
              />

              <Field
                label="Slug URL"
                value={version.slug}
                onChange={(v) => updateField(activeTab, 'slug', v)}
                placeholder="slug-articol"
                mono
              />

              <Field
                label="Meta Description (max 155 caractere)"
                value={version.metaDescription}
                onChange={(v) => updateField(activeTab, 'metaDescription', v)}
                multiline
                rows={3}
                maxLength={155}
                placeholder="Descriere SEO pentru motoarele de căutare..."
              />

              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5">
                  Keywords (separate prin virgulă)
                </label>
                <input
                  type="text"
                  value={version.keywords.join(', ')}
                  onChange={(e) =>
                    updateField(
                      activeTab,
                      'keywords',
                      e.target.value.split(',').map((k) => k.trim()).filter(Boolean)
                    )
                  }
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5">
                  Image Query (Unsplash)
                </label>
                <input
                  type="text"
                  value={version.imageQuery}
                  onChange={(e) => updateField(activeTab, 'imageQuery', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors font-mono"
                />
              </div>
            </div>

            {/* Images preview */}
            {article.images.length > 0 && (
              <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10">
                <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-3">
                  Imagini Unsplash
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {article.images.map((img, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden aspect-video bg-zinc-800">
                      <img src={img.thumb} alt={img.alt} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 bg-[#e8ff00] text-black font-bold rounded">
                          HERO
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column: content editor */}
          <div className="p-5 rounded-2xl bg-zinc-900 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Conținut HTML
              </h3>
              <span className="text-white/20 text-xs">
                {version.content.replace(/<[^>]+>/g, '').split(/\s+/).length} cuvinte
              </span>
            </div>
            <textarea
              value={version.content}
              onChange={(e) => updateField(activeTab, 'content', e.target.value)}
              rows={28}
              className="w-full px-3 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white text-xs font-mono leading-relaxed placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors resize-none"
              spellCheck={false}
            />
            <p className="text-white/20 text-xs mt-2">
              HTML valid. Folosiți &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;a href="..."&gt;
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

interface FieldProps {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
  rows?: number
  maxLength?: number
  mono?: boolean
}

function Field({ label, value, onChange, placeholder, multiline, rows = 2, maxLength, mono }: FieldProps) {
  const cls = `w-full px-3 py-2.5 rounded-xl bg-zinc-800 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors ${mono ? 'font-mono' : ''}`

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-white/50 text-xs font-medium">{label}</label>
        {maxLength && (
          <span className={`text-xs ${value.length > maxLength ? 'text-red-400' : 'text-white/20'}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className={`${cls} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cls}
        />
      )}
    </div>
  )
}
