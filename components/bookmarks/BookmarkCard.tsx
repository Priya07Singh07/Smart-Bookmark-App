'use client'

import { supabase } from '@/components/lib/supabaseClient'

export default function BookmarkCard({ bookmark, onDelete }: any) {
  const handleDelete = async () => {
    await supabase.from('bookmarks').delete().eq('id', bookmark.id)
    onDelete()
  }

  return (
  <div className="relative bg-gray-950/70 border border-gray-900 rounded-2xl p-6 backdrop-blur-xl transition duration-300 hover:border-gray-700 hover:shadow-xl group">

  <h3 className="font-semibold text-lg mb-3 group-hover:text-white transition">
    {bookmark.title}
  </h3>

  <a
    href={bookmark.url}
    target="_blank"
    className="text-gray-500 text-sm break-all hover:text-gray-300 transition"
  >
    {bookmark.url}
  </a>

  <button
    onClick={handleDelete}
    className=" p-3 mt-6 text-sm text-red-300 hover:text-white transition"
  >
    Delete
  </button>
</div>


  )
}
