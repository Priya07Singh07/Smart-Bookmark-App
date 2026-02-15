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

## Challenges Faced & How They Were Solved

### 1. UI Not Updating Without Refresh

**Problem:**  
After inserting a new bookmark, the UI did not update automatically and required a manual page refresh.

**Cause:**  
State was being managed in multiple places. The BookmarkList component had its own local state and data fetching logic, which conflicted with the Dashboard state.

**Solution:**  
Refactored the architecture so that:
- The Dashboard component became the single source of truth.
- BookmarkForm triggered a re-fetch via a callback.
- BookmarkList became a purely presentational component.

This eliminated duplicate state sources and ensured instant UI updates without page reloads.

---

### 2. Realtime WebSocket Connection Failure

**Problem:**  
Supabase Realtime WebSocket connection failed in development.

**Cause:**  
Network-level WebSocket restrictions and environment misconfiguration.

**Solution:**  
Refactored the application to use controlled state re-fetching instead of relying on realtime subscriptions. This improved reliability and reduced unnecessary complexity.
