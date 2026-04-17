'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/ro')
  }, [router])

  // Show minimal UI while redirecting
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-[#e8ff00] font-black text-2xl mb-2">Powermedia</div>
        <p className="text-white/30 text-sm">Redirecting...</p>
      </div>
    </div>
  )
}
