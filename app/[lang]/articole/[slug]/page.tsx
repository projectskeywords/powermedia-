import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { isValidLang, type Lang } from '@/lib/i18n'
import { getArticleBySlug, getAllArticles } from '@/lib/articles-db'
import ArticleLangSwitcher from '@/components/blog/ArticleLangSwitcher'

// Dynamic — articles are stored in Redis and change at runtime
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ lang: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isValidLang(lang)) return {}

  const article = await getArticleBySlug(slug, lang as Lang)
  if (!article) return {}

  const version = article[lang as Lang]
  const image = article.images[0]

  return {
    title: `${version.title} | Powermedia`,
    description: version.metaDescription,
    keywords: version.keywords.join(', '),
    openGraph: {
      title: version.title,
      description: version.metaDescription,
      images: image ? [{ url: image.url, alt: image.alt }] : [],
      type: 'article',
    },
  }
}


function PhotoCredit({ url, name, profileUrl }: { url: string; name: string; profileUrl: string }) {
  return (
    <a
      href={profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-white/25 hover:text-white/50 text-xs transition-colors"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      {name} · Unsplash
    </a>
  )
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { lang, slug } = await params
  if (!isValidLang(lang)) notFound()

  const article = await getArticleBySlug(slug, lang as Lang)
  if (!article) notFound()

  const version = article[lang as Lang]
  const images = article.images

  // Correct slugs per language for the language switcher
  const articleSlugs: Record<Lang, string> = {
    ro: article.ro.slug,
    ru: article.ru.slug,
    en: article.en.slug,
  }

  const backLabel = lang === 'ro' ? 'Înapoi la articole' : lang === 'ru' ? 'Назад к статьям' : 'Back to articles'
  const publishedLabel = lang === 'ro' ? 'Publicat' : lang === 'ru' ? 'Опубликовано' : 'Published'
  const minReadLabel = lang === 'ro' ? 'min citire' : lang === 'ru' ? 'мин. чтения' : 'min read'
  const ctaTitle = lang === 'ro' ? 'Gata să crești digital?' : lang === 'ru' ? 'Готовы к цифровому росту?' : 'Ready to grow digitally?'
  const ctaDesc = lang === 'ro'
    ? 'Echipa Powermedia transformă afaceri din Moldova prin soluții digitale complete.'
    : lang === 'ru'
    ? 'Команда Powermedia трансформирует бизнесы в Молдове через комплексные цифровые решения.'
    : 'The Powermedia team transforms businesses in Moldova through complete digital solutions.'
  const ctaBtn = lang === 'ro' ? 'Solicită o consultație gratuită' : lang === 'ru' ? 'Получить бесплатную консультацию' : 'Get a free consultation'

  const midCtaLabel = lang === 'ro' ? 'Ai nevoie de ajutor?' : lang === 'ru' ? 'Нужна помощь?' : 'Need help?'
  const midCtaText = lang === 'ro'
    ? 'Suntem la un telefon distanță — consultație gratuită.'
    : lang === 'ru'
    ? 'Мы на расстоянии звонка — бесплатная консультация.'
    : 'We\'re one call away — free consultation.'
  const callNowLabel = lang === 'ro' ? 'Sună acum' : lang === 'ru' ? 'Позвонить' : 'Call now'

  const wordCount = version.content.replace(/<[^>]+>/g, '').split(/\s+/).length
  const readTime = Math.ceil(wordCount / 200)

  const date = new Date(article.createdAt).toLocaleDateString(
    lang === 'ru' ? 'ru-RU' : lang === 'en' ? 'en-GB' : 'ro-RO',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  // Strip H1 tags from Gemini content (the hero already has the title as H1)
  // Replace <h1...>...</h1> with <h2>...</h2> to avoid duplicate H1
  const contentHtml = version.content
    .replace(/<h1([^>]*)>/gi, '<h2$1>')
    .replace(/<\/h1>/gi, '</h2>')
  const h2Positions: number[] = []
  let searchFrom = 0
  while (true) {
    const idx = contentHtml.indexOf('<h2', searchFrom)
    if (idx === -1) break
    h2Positions.push(idx)
    searchFrom = idx + 1
  }

  // Split at the 3rd h2 if available, else at midpoint
  const splitIdx = h2Positions.length >= 3
    ? h2Positions[Math.floor(h2Positions.length / 2)]
    : Math.floor(contentHtml.length / 2)

  const contentPart1 = contentHtml.slice(0, splitIdx)
  const contentPart2 = contentHtml.slice(splitIdx)

  return (
    <main className="bg-zinc-950 min-h-screen">
      {/* HERO — full-bleed with title overlay */}
      <div className="relative pt-16">
        {images[0] ? (
          <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
            <Image
              src={images[0].url}
              alt={images[0].alt}
              fill
              priority
              className="object-cover scale-[1.02]"
              style={{ objectPosition: 'center 30%' }}
            />
            {/* Multi-layer gradient for dramatic effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/40 via-transparent to-zinc-950/40" />

            {/* Title overlaid on hero */}
            <div className="absolute inset-0 flex flex-col justify-end pb-16">
              <div className="container mx-auto px-6 max-w-4xl">
                {/* Back link + lang switcher */}
                <div className="flex items-center justify-between mb-6">
                  <Link
                    href={`/${lang}/articole`}
                    className="inline-flex items-center gap-2 text-white/50 hover:text-[#e8ff00] text-sm transition-colors group"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="19" y1="12" x2="5" y2="12"/>
                      <polyline points="12 5 5 12 12 19"/>
                    </svg>
                    {backLabel}
                  </Link>
                  <ArticleLangSwitcher currentLang={lang as Lang} slugs={articleSlugs} />
                </div>

                {/* Keywords */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {version.keywords.slice(0, 4).map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 text-[11px] font-semibold bg-[#e8ff00]/15 text-[#e8ff00] rounded-full border border-[#e8ff00]/30 backdrop-blur-sm uppercase tracking-wider"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6 max-w-3xl drop-shadow-xl">
                  {version.title}
                </h1>

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {readTime} {minReadLabel}
                  </span>
                  <span className="text-white/20">·</span>
                  <span>{publishedLabel} {date}</span>
                </div>
              </div>
            </div>

            {/* Photo credit bottom-right */}
            {images[0].photographer && (
              <div className="absolute bottom-4 right-4">
                <PhotoCredit url={images[0].url} name={images[0].photographer} profileUrl={images[0].photographerUrl} />
              </div>
            )}
          </div>
        ) : (
          /* No image fallback */
          <div className="pt-24 pb-12 border-b border-white/10">
            <div className="container mx-auto px-6 max-w-4xl">
              <div className="flex items-center justify-between mb-8">
                <Link href={`/${lang}/articole`} className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm transition-colors">
                  ← {backLabel}
                </Link>
                <ArticleLangSwitcher currentLang={lang as Lang} slugs={articleSlugs} />
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">{version.title}</h1>
            </div>
          </div>
        )}
      </div>

      {/* Meta description pull quote */}
      <div className="border-y border-white/5 bg-zinc-900/50">
        <div className="container mx-auto px-6 max-w-4xl py-6">
          <p className="text-white/50 text-lg leading-relaxed italic font-light">
            {version.metaDescription}
          </p>
        </div>
      </div>

      {/* Article body */}
      <article className="container mx-auto px-6 max-w-4xl pb-32">
        {/* Part 1 of content */}
        <div
          className="article-body mt-12
            [&_h1]:text-white [&_h1]:text-3xl [&_h1]:font-black [&_h1]:mb-6 [&_h1]:mt-10
            [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:leading-snug
            [&_h3]:text-white/90 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8
            [&_p]:text-white/65 [&_p]:text-lg [&_p]:leading-[1.85] [&_p]:mb-6
            [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:pl-0
            [&_li]:text-white/65 [&_li]:text-base [&_li]:leading-relaxed [&_li]:pl-5 [&_li]:relative
            [&_li]:before:content-['→'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[#e8ff00] [&_li]:before:font-bold
            [&_strong]:text-white [&_strong]:font-semibold
            [&_a]:text-[#e8ff00] [&_a]:font-medium [&_a]:underline [&_a]:decoration-[#e8ff00]/30 [&_a]:underline-offset-2 hover:[&_a]:decoration-[#e8ff00]
            [&_blockquote]:border-l-4 [&_blockquote]:border-[#e8ff00]/40 [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:text-white/50 [&_blockquote]:italic [&_blockquote]:text-lg"
          dangerouslySetInnerHTML={{ __html: contentPart1 }}
        />

        {/* Mid-article image — image[1] */}
        {images[1] && (
          <div className="my-14 -mx-6 md:-mx-12">
            <div className="relative h-[420px] md:h-[520px] overflow-hidden rounded-2xl mx-6 md:mx-12">
              <Image
                src={images[1].url}
                alt={images[1].alt}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <PhotoCredit url={images[1].url} name={images[1].photographer} profileUrl={images[1].photographerUrl} />
              </div>
            </div>
          </div>
        )}

        {/* Mid-article CTA call banner */}
        <div className="my-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 rounded-2xl bg-gradient-to-r from-[#e8ff00]/8 to-transparent border border-[#e8ff00]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#e8ff00]/15 flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#e8ff00">
                <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z"/>
              </svg>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{midCtaLabel}</p>
              <p className="text-white/50 text-sm">{midCtaText}</p>
            </div>
          </div>
          <a
            href="tel:+37368996315"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-[#e8ff00] text-black font-bold rounded-xl text-sm hover:bg-[#c8db00] transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z"/>
            </svg>
            {callNowLabel} · +373 68 996 315
          </a>
        </div>

        {/* Part 2 of content */}
        {contentPart2 && (
          <div
            className="article-body
              [&_h1]:text-white [&_h1]:text-3xl [&_h1]:font-black [&_h1]:mb-6 [&_h1]:mt-10
              [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:leading-snug
              [&_h3]:text-white/90 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8
              [&_p]:text-white/65 [&_p]:text-lg [&_p]:leading-[1.85] [&_p]:mb-6
              [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:pl-0
              [&_li]:text-white/65 [&_li]:text-base [&_li]:leading-relaxed [&_li]:pl-5 [&_li]:relative
              [&_li]:before:content-['→'] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:text-[#e8ff00] [&_li]:before:font-bold
              [&_strong]:text-white [&_strong]:font-semibold
              [&_a]:text-[#e8ff00] [&_a]:font-medium [&_a]:underline [&_a]:decoration-[#e8ff00]/30 [&_a]:underline-offset-2 hover:[&_a]:decoration-[#e8ff00]
              [&_blockquote]:border-l-4 [&_blockquote]:border-[#e8ff00]/40 [&_blockquote]:pl-6 [&_blockquote]:my-8 [&_blockquote]:text-white/50 [&_blockquote]:italic [&_blockquote]:text-lg"
            dangerouslySetInnerHTML={{ __html: contentPart2 }}
          />
        )}

        {/* Third image — full-width editorial panel */}
        {images[2] && (
          <div className="mt-16 mb-12">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative h-[300px] md:h-[380px] overflow-hidden rounded-2xl">
                <Image
                  src={images[2].url}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <PhotoCredit url={images[2].url} name={images[2].photographer} profileUrl={images[2].photographerUrl} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-0.5 bg-[#e8ff00]" />
                <p className="text-white/60 text-lg leading-relaxed italic">
                  {version.metaDescription}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {version.keywords.slice(0, 6).map((kw) => (
                    <span key={kw} className="px-2.5 py-1 text-xs bg-white/5 text-white/40 rounded-lg border border-white/10">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="my-16 flex items-center gap-3">
          <div className="flex-1 h-px bg-white/8" />
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff00]/40" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff00]/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff00]/40" />
          </div>
          <div className="flex-1 h-px bg-white/8" />
        </div>

        {/* Author / source block */}
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/3 border border-white/8">
          <div className="w-12 h-12 rounded-xl bg-[#e8ff00] flex items-center justify-center flex-shrink-0">
            <span className="text-black font-black text-sm">PM</span>
          </div>
          <div>
            <p className="text-white font-semibold">Powermedia Editorial</p>
            <p className="text-white/40 text-sm mt-0.5">
              {lang === 'ro'
                ? 'Agenție digitală din Moldova · Experți în web, SEO & automatizări AI'
                : lang === 'ru'
                ? 'Цифровое агентство Молдовы · Эксперты в web, SEO & автоматизации AI'
                : 'Digital agency from Moldova · Experts in web, SEO & AI automation'}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {version.keywords.slice(0, 5).map((kw) => (
                <span key={kw} className="px-2 py-0.5 text-[10px] bg-[#e8ff00]/10 text-[#e8ff00]/70 rounded border border-[#e8ff00]/20 uppercase tracking-wider">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CTA block */}
        <div className="mt-12 relative overflow-hidden rounded-3xl">
          {/* Background with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#e8ff00]/10 via-zinc-900 to-zinc-900 rounded-3xl" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#e8ff00]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

          <div className="relative p-10 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold tracking-widest uppercase bg-[#e8ff00]/15 text-[#e8ff00] rounded-full border border-[#e8ff00]/30">
              Powermedia Moldova
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              {ctaTitle}
            </h2>
            <p className="text-white/50 text-base max-w-md mx-auto mb-8 leading-relaxed">
              {ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#e8ff00] text-black font-bold rounded-xl hover:bg-[#c8db00] transition-colors text-sm"
              >
                {ctaBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <a
                href="tel:+37368996315"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-sm border border-white/10"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81 19.79 19.79 0 01.02 2.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14z"/>
                </svg>
                +373 68 996 315
              </a>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
