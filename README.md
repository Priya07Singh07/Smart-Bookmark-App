# SmartBookmark

A modern, minimal bookmark management application built with Next.js and Supabase.

Live Demo: https://smart-bookmark-app-xi-beryl.vercel.app/

---

## Overview

SmartBookmark allows users to securely save, manage, and search their bookmarks.

Each user has their own private workspace. Authentication is handled using Google OAuth via Supabase, and all data is securely stored in PostgreSQL with Row Level Security enabled.

This project focuses on:

- Clean architecture
- Proper state management (no refresh required)
- Production deployment
- Secure database access
- Minimal, modern black/gray UI

---

## Tech Stack

Frontend:
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS

Backend / Database:
- Supabase (PostgreSQL)
- Supabase Auth (Google OAuth)
- Row Level Security (RLS)

Deployment:
- Vercel

---

## Features

- Google OAuth authentication
- Private bookmarks per user
- Add bookmarks instantly (no page refresh)
- Delete bookmarks instantly
- Real-time UI updates via proper state handling
- Search functionality
- Responsive grid layout
- Production deployment on Vercel

---

## Database Schema

Table: `bookmarks`

| Column      | Type        | Description |
|------------|------------|-------------|
| id         | uuid (PK)  | Unique bookmark ID |
| user_id    | uuid (FK)  | Linked to auth.users |
| title      | text       | Bookmark title |
| url        | text       | Bookmark URL |
| created_at | timestamp  | Auto-generated |

Row Level Security ensures:
- Users can only read their own bookmarks
- Users can only delete their own bookmarks
- Users cannot access other users’ data

---

## How It Works

1. User logs in via Google OAuth.
2. Supabase generates a JWT session.
3. Bookmarks are fetched based on `user_id`.
4. Adding a bookmark inserts into PostgreSQL.
5. Dashboard re-fetches bookmarks to update UI instantly.
6. No page reloads required.

---

## Running Locally

### 1. Clone the Repository

```bash
git clone 
cd YOUR_REPO_NAME

npm install

Create a file named:
.env.local

Add:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


You can find these in:
Supabase → Settings → API

4. Run Development Server
npm run dev


Open:

http://localhost:3000