'use client'

import { supabase } from '@/components/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    })
  }

  return (
    <main className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/80 to-black" />

      {/* Card */}
      <div className="w-full max-w-md bg-gray-900/60 backdrop-blur-xl border border-gray-800 rounded-2xl p-10 shadow-2xl">

        {/* Logo / Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-wide">
            SmartBookmark
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            Sign in to manage your bookmarks securely
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? 'Redirecting...' : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="w-5 h-5"
              >
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.4 2.2 30.1 0 24 0 14.6 0 6.5 5.5 2.6 13.5l7.8 6.1C12.1 13.3 17.5 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.6c-.3 2-1.5 5-4.2 7l6.6 5.1c3.9-3.6 6.1-9 6.1-15.7z" />
                <path fill="#FBBC05" d="M10.4 28.6c-.6-1.8-1-3.7-1-5.6s.4-3.8 1-5.6l-7.8-6.1C.9 15.4 0 19.6 0 24s.9 8.6 2.6 12.7l7.8-6.1z" />
                <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-6.6-5.1c-2 1.3-4.7 2.2-9.4 2.2-6.5 0-11.9-3.8-13.8-9.1l-7.8 6.1C6.5 42.5 14.6 48 24 48z" />
              </svg>
              Continue with Google
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-gray-800" />
          <span className="text-gray-500 text-xs uppercase tracking-widest">
            Secure OAuth
          </span>
          <div className="flex-1 h-px bg-gray-800" />
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm">
          Your bookmarks are private and encrypted.
        </p>
      </div>
    </main>
  )
}
