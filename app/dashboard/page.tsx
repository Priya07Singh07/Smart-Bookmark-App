'use client'

import { useEffect, useState, useMemo } from 'react'
import { supabase } from '@/components/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import BookmarkForm from '@/components/bookmarks/BookmarkForm'
import BookmarkList from '@/components/bookmarks/BookmarkList'

export default function Dashboard() {
  const router = useRouter()

  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()

      if (!data.user) {
        router.replace('/login')
      } else {
        setUser(data.user)
        await fetchBookmarks()
      }

      setLoading(false)
    }

    init()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.url.toLowerCase().includes(search.toLowerCase())
    )
  }, [bookmarks, search])

  if (loading) return null

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Subtle Grid Background */}
      <div className="absolute inset-0 -z-10 
        bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),
            linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]
        bg-[size:64px_64px]" />

      {/* Navbar */}
      <header className="sticky top-0 backdrop-blur-xl bg-black/80 border-b border-gray-900 px-10 py-5 flex justify-between items-center">
        <h1 className="text-lg font-semibold">SmartBookmark</h1>

        <div className="flex items-center gap-6">
          <span className="text-gray-500 text-sm hidden sm:block">
            {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-gray-800 rounded-full text-sm hover:border-gray-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-10 py-16">

        {/* Header + Search */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold mb-2">Your Bookmarks</h2>
            <p className="text-gray-500">
              {bookmarks.length} total saved links
            </p>
          </div>

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-950 border border-gray-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-gray-700 transition"
          />
        </div>

        {/* Form */}
        <div className="mb-14 bg-gray-950 border border-gray-900 rounded-2xl p-8">
          <BookmarkForm onBookmarkAdded={fetchBookmarks} />
        </div>

        {/* List */}
        <BookmarkList
          bookmarks={filteredBookmarks}
          onDelete={fetchBookmarks}
        />
      </div>
    </main>
  )
}
