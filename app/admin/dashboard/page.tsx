import Link from 'next/link'
import { getAllArticles } from '@/lib/articles-db'
import AdminShell from '../AdminShell'
import DeleteButton from './DeleteButton'

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const articles = getAllArticles()

  return (
    <AdminShell>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white">Articole</h1>
            <p className="text-white/40 text-sm mt-1">{articles.length} articole în baza de date</p>
          </div>
          <Link
            href="/admin/articles/new"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#e8ff00] text-black font-bold rounded-xl hover:bg-[#c8db00] transition-colors text-sm"
          >
            <span>✨</span>
            Generează articol nou
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total articole', value: articles.length },
            { label: 'Publicate azi', value: articles.filter((a) => new Date(a.createdAt).toDateString() === new Date().toDateString()).length },
            { label: 'Limbi acoperite', value: 3 },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-zinc-900 border border-white/10">
              <div className="text-3xl font-black text-[#e8ff00]">{s.value}</div>
              <div className="text-white/40 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Article table */}
        {articles.length === 0 ? (
          <div className="text-center py-24 rounded-2xl border border-dashed border-white/10">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-white/40 mb-6">Niciun articol generat încă.</p>
            <Link
              href="/admin/articles/new"
              className="px-6 py-3 bg-[#e8ff00] text-black font-bold rounded-xl hover:bg-[#c8db00] transition-colors text-sm"
            >
              Generează primul articol
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-zinc-900/50">
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Titlu (RO)</th>
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Subiect</th>
                  <th className="text-left px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Data</th>
                  <th className="text-right px-5 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, i) => (
                  <tr
                    key={article.id}
                    className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}
                  >
                    <td className="px-5 py-4">
                      <p className="text-white font-medium text-sm line-clamp-1">
                        {article.ro.title}
                      </p>
                      <div className="flex gap-1.5 mt-1">
                        {(['ro', 'ru', 'en'] as const).map((lang) => (
                          <a
                            key={lang}
                            href={`/${lang}/articole/${article[lang].slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-white/5 text-white/30 hover:text-[#e8ff00] hover:bg-[#e8ff00]/10 transition-colors uppercase"
                          >
                            {lang}
                          </a>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-white/40 text-sm">{article.topic}</span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <span className="text-white/30 text-sm">
                        {new Date(article.createdAt).toLocaleDateString('ro-RO')}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/articles/${article.id}`}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                        >
                          ✏️ Editează
                        </Link>
                        <DeleteButton id={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
