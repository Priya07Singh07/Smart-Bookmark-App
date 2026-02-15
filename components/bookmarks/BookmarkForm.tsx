'use client'

import { useState } from 'react'
import { supabase } from '@/components/lib/supabaseClient'

export default function BookmarkForm({
  onBookmarkAdded,
}: {
  onBookmarkAdded: () => void
}) {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

const [loading, setLoading] = useState(false)
const [errorMsg, setErrorMsg] = useState('')

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  

  if (!title.trim() || !url.trim()) {
    setErrorMsg('Both fields are required')
    return
  }
  

  setLoading(true)
  setErrorMsg('')

  const { data: userData } = await supabase.auth.getUser()

  if (!userData.user) {
    setErrorMsg('User not authenticated')
    setLoading(false)
    return
  }

  const { error } = await supabase.from('bookmarks').insert({
    title,
    url,
    user_id: userData.user.id
  })
  if (!error) {
  setTitle('')
  setUrl('')
  onBookmarkAdded()   // 🔥 THIS IS CRITICAL
}


  if (error) {
    setErrorMsg(error.message)
  } else {
    setTitle('')
    setUrl('')
  }

  setLoading(false)
}


  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border p-2 rounded"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="URL"
        className="border p-2 rounded"
      />
      <button
  type="submit"
  disabled={loading}
  className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
>
  {loading ? 'Adding...' : 'Add'}
</button>

{errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}


    </form>
    
  )
}
