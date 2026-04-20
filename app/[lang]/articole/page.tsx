import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getMessages, isValidLang, type Lang } from '@/lib/i18n'
import { getAllArticles } from '@/lib/articles-db'
import ArticleCard from '@/components/blog/ArticleCard'

export const dynamic = 'force-dynamic'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const t = getMessages(lang as Lang)
  return { title: `${t.blog.title} | Powermedia`, description: t.blog.subtitle }
}

export default async function ArticolePage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  const t = getMessages(lang as Lang)
  const articles = await getAllArticles()

  return (
    <main className="bg-black min-h-screen">
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            {t.blog.title}
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">{t.blog.subtitle}</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          {articles.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-white/40 text-xl mb-8">
                {lang === 'ro' ? 'Nu există articole încă.' : lang === 'ru' ? 'Статей пока нет.' : 'No articles yet.'}
              </p>
              <a
                href={`/api/articles/generate`}
                className="px-6 py-3 bg-[#e8ff00] text-black font-bold rounded-xl hover:bg-[#c8db00] transition-colors"
              >
                {t.blog.generate}
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  lang={lang as Lang}
                  readMoreLabel={t.blog.readMore}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
