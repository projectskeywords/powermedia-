import { Suspense } from 'react'
import LoginForm from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-3xl font-black">
            Power<span className="text-[#e8ff00]">media</span>
          </span>
          <p className="text-white/40 text-sm mt-2">Admin Panel</p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
