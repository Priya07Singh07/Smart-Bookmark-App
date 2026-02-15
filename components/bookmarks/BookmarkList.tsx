'use client'

import BookmarkCard from './BookmarkCard'

export default function BookmarkList({
  bookmarks,
  onDelete,
}: {
  bookmarks: any[]
  onDelete: () => void
}) {

  if (bookmarks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-20">
        No bookmarks yet. Add your first one.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
