'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function DeleteButton({ id }: { id: string }) {
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    setLoading(true)
    try {
      await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
      router.refresh()
    } finally {
      setLoading(false)
      setConfirming(false)
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors disabled:opacity-50"
        >
          {loading ? '...' : 'Confirmă'}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/5 text-white/40 hover:bg-white/10 transition-colors"
        >
          Anulează
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400/60 hover:bg-red-500/20 hover:text-red-400 transition-colors"
    >
      🗑️ Șterge
    </button>
  )
}
