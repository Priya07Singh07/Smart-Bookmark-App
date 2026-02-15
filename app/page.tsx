'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/components/lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        router.push('/dashboard')
      } else {
        setLoading(false)
      }
    }
    checkUser()
  }, [router])

  if (loading) return null

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-xl font-semibold tracking-wide">
          SmartBookmark
        </h1>

        <button
          onClick={() => router.push('/login')}
          className="px-5 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl">
          Organize your favorite links.
          <br />
          Access them anywhere.
        </h2>

        <p className="mt-6 text-gray-400 max-w-xl text-lg">
          Save, manage, and access your bookmarks securely.
          Simple. Private. Fast.
        </p>

        <div className="mt-10 flex gap-6">
          <button
            onClick={() => router.push('/login')}
            className="px-8 py-3 bg-white text-black rounded-full font-medium hover:opacity-80 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => router.push('/login')}
            className="px-8 py-3 border border-gray-600 rounded-full hover:border-white transition"
          >
            Try Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 text-sm">
        © {new Date().getFullYear()} SmartBookmark. All rights reserved.
      </footer>
    </main>
  )
}
