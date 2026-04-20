'use client'

import { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function LangNotFound() {
  const router = useRouter()
  const params = useParams()
  const lang = (params?.lang as string) || 'ro'
  const validLangs = ['ro', 'ru', 'en']
  const safeLang = validLangs.includes(lang) ? lang : 'ro'

  useEffect(() => {
    router.replace(`/${safeLang}`)
  }, [router, safeLang])

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-[#e8ff00] font-black text-2xl mb-2">Powermedia</div>
        <p className="text-white/30 text-sm">Redirecting...</p>
      </div>
    </div>
  )
}
