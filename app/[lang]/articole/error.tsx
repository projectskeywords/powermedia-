'use client'

export default function ArticlesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-white text-2xl font-bold mb-2">Eroare la încărcare</h1>
        <p className="text-white/40 mb-2 text-sm font-mono">{error.message}</p>
        {error.digest && (
          <p className="text-white/20 text-xs mb-6">ID: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#e8ff00] text-black font-bold rounded-xl hover:bg-[#c8db00] transition-colors"
        >
          Încearcă din nou
        </button>
      </div>
    </main>
  )
}
