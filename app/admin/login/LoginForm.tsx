'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!res.ok) {
        setError('Parolă incorectă.')
        return
      }

      const from = searchParams.get('from') ?? '/admin/dashboard'
      router.push(from)
      router.refresh()
    } catch {
      setError('Eroare de conexiune. Încearcă din nou.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-white/60 text-sm mb-1.5">Parolă admin</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoFocus
          placeholder="••••••••••••"
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#e8ff00] text-black font-black rounded-xl hover:bg-[#c8db00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Se verifică...' : 'Intră în admin'}
      </button>
    </form>
  )
}
