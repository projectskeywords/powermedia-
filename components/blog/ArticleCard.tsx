import Link from 'next/link'
import Image from 'next/image'
import type { StoredArticle } from '@/lib/articles-db'
import type { Lang } from '@/lib/i18n'

interface ArticleCardProps {
  article: StoredArticle
  lang: Lang
  readMoreLabel: string
}

function getGradient(id: string) {
  const gradients = [
    'from-violet-900/60 to-zinc-900',
    'from-blue-900/60 to-zinc-900',
    'from-emerald-900/60 to-zinc-900',
    'from-orange-900/60 to-zinc-900',
    'from-rose-900/60 to-zinc-900',
    'from-cyan-900/60 to-zinc-900',
  ]
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return gradients[hash % gradients.length]
}

export default function ArticleCard({ article, lang, readMoreLabel }: ArticleCardProps) {
  const version = article[lang]

  // Skip articles without a version for the current language
  if (!version || !version.slug || !version.title) return null

  const image = article.images?.[0]
  const gradient = getGradient(article.id)

  const initials = (version.title || '')
    .split(' ')
    .slice(0, 2)
    .map((w) => w?.[0] ?? '')
    .join('')
    .toUpperCase() || 'PM'

  return (
    <article className="group rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/25 transition-all hover:-translate-y-1 duration-300">
      <Link href={`/${lang}/articole/${version.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          {image?.url ? (
            <>
              <Image
                src={image.url}
                alt={image.alt || version.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent" />
            </>
          ) : (
            <div className={`h-full bg-gradient-to-br ${gradient} flex items-center justify-center relative`}>
              <div className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                  backgroundSize: '24px 24px',
                }}
              />
              <div className="relative text-5xl font-black text-white/20 select-none tracking-tighter">
                {initials}
              </div>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {(version.keywords ?? []).slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="px-2.5 py-0.5 text-[11px] font-medium bg-white/5 text-white/40 rounded-full border border-white/8 capitalize"
            >
              {kw}
            </span>
          ))}
        </div>

        <h2 className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-[#e8ff00] transition-colors line-clamp-2">
          <Link href={`/${lang}/articole/${version.slug}`}>
            {version.title}
          </Link>
        </h2>

        <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2">
          {version.metaDescription}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <time className="text-white/25 text-xs">
            {new Date(article.createdAt).toLocaleDateString(
              lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-GB' : 'ro-RO',
              { day: 'numeric', month: 'short', year: 'numeric' }
            )}
          </time>
          <Link
            href={`/${lang}/articole/${version.slug}`}
            className="text-[#e8ff00] text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all"
          >
            {readMoreLabel}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
