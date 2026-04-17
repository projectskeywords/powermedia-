'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { href: '/admin/dashboard', label: 'Articole', icon: '📝' },
  { href: '/admin/articles/new', label: 'Articol nou', icon: '✨' },
  { href: '/ro', label: 'Vezi site-ul', icon: '🌐', external: true },
]

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 bg-black border-r border-white/10 flex flex-col">
        <div className="p-5 border-b border-white/10">
          <span className="text-xl font-black">
            Power<span className="text-[#e8ff00]">media</span>
          </span>
          <p className="text-white/30 text-xs mt-0.5">Admin Panel</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => {
            const active = !item.external && pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? 'bg-[#e8ff00]/10 text-[#e8ff00] border border-[#e8ff00]/20'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
                {item.external && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="ml-auto opacity-40">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                )}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-colors"
          >
            <span>🚪</span>
            Deconectare
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-zinc-950">
        {children}
      </main>
    </div>
  )
}
