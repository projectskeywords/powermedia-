import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles-db'
import AdminShell from '../../AdminShell'
import ArticleEditor from './ArticleEditor'

interface PageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params
  const articles = await getAllArticles()
  const article = articles.find((a) => a.id === id)

  if (!article) notFound()

  return (
    <AdminShell>
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white line-clamp-1">
              ✏️ {article.ro.title}
            </h1>
            <p className="text-white/30 text-sm mt-1">
              Creat: {new Date(article.createdAt).toLocaleDateString('ro-RO')} · ID: {article.id}
            </p>
          </div>
          <div className="flex gap-2">
            {(['ro', 'ru', 'en'] as const).map((lang) => (
              <a
                key={lang}
                href={`/${lang}/articole/${article[lang].slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-white/5 text-white/40 hover:text-[#e8ff00] hover:bg-[#e8ff00]/10 transition-colors uppercase"
              >
                🔗 {lang}
              </a>
            ))}
          </div>
        </div>

        <ArticleEditor article={article} />
      </div>
    </AdminShell>
  )
}
