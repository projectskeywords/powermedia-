import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getMessages, isValidLang, type Lang } from '@/lib/i18n'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params

  if (!isValidLang(lang)) notFound()

  const t = getMessages(lang as Lang)

  return (
    <ThemeProvider>
      <Header lang={lang as Lang} t={t} />
      <div className="flex-1 pt-16">{children}</div>
      <Footer lang={lang as Lang} t={t} />
    </ThemeProvider>
  )
}
