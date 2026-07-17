import Link from 'next/link'
import type { Lang } from '@/lib/i18n'

/** Un paragraf, sau o listă cu puncte. Ajunge pentru documente juridice. */
export type LegalBlock = string | { readonly list: readonly string[] }

export interface LegalSection {
  readonly heading: string
  readonly blocks: readonly LegalBlock[]
}

export interface LegalDoc {
  readonly title: string
  readonly subtitle: string
  readonly updatedLabel: string
  readonly sections: readonly LegalSection[]
}

interface LegalDocumentProps {
  doc: LegalDoc
  lang: Lang
  updated: string
  /** Randat după secțiuni — ex. panoul de retragere a consimțământului. */
  children?: React.ReactNode
}

function Blocks({ blocks }: { blocks: readonly LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) =>
        typeof block === 'string' ? (
          <p key={i} className="text-white/50 leading-relaxed mb-4">
            {block}
          </p>
        ) : (
          <ul key={i} className="mb-4 space-y-2">
            {block.list.map((item, j) => (
              <li key={j} className="flex gap-3 text-white/50 leading-relaxed">
                <span className="text-[#e8ff00] flex-shrink-0 mt-1.5 text-[8px]">●</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )
      )}
    </>
  )
}

const CONTACT_CTA: Record<Lang, string> = {
  ro: 'Ai o întrebare despre datele tale?',
  ru: 'Есть вопрос о ваших данных?',
  en: 'A question about your data?',
}

export default function LegalDocument({ doc, lang, updated, children }: LegalDocumentProps) {
  return (
    <main className="bg-black">
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8ff00]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
            {doc.title}
          </h1>
          <p className="text-lg text-white/50 leading-relaxed mb-6">{doc.subtitle}</p>
          <p className="text-white/30 text-sm">
            {doc.updatedLabel}{' '}
            <time dateTime={updated} className="text-white/50">
              {updated}
            </time>
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          {doc.sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="text-2xl font-black text-white mb-4 scroll-mt-24">
                {section.heading}
              </h2>
              <Blocks blocks={section.blocks} />
            </section>
          ))}

          {children}

          <div className="mt-16 p-8 rounded-2xl bg-zinc-900 border border-white/10">
            <p className="text-white font-bold text-lg mb-4">{CONTACT_CTA[lang]}</p>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#e8ff00] text-black font-bold rounded-xl hover:bg-[#c8db00] transition-colors"
            >
              {lang === 'ro' ? 'Contactează-ne' : lang === 'ru' ? 'Свяжитесь с нами' : 'Contact us'} →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
