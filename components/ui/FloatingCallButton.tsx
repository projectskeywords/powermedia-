'use client'

export default function FloatingCallButton() {
  return (
    <a
      href="tel:+37368996315"
      aria-label="Sună acum"
      className="
        fixed bottom-6 right-6 z-50
        md:hidden
        w-14 h-14
        bg-[#e8ff00] text-black
        rounded-full shadow-2xl shadow-black/40
        flex items-center justify-center
        transition-transform duration-200 active:scale-95 hover:scale-105
        ring-4 ring-[#e8ff00]/30
      "
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z"/>
      </svg>
    </a>
  )
}
