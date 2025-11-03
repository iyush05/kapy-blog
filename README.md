# KapyBlog — A Full-Stack Blog Platform

**KapyBlog** is a modern, full-stack blogging application built with **Next.js**, **tRPC**, **Drizzle ORM**, and **PostgreSQL**.  
It provides a complete, **type-safe experience** from the database to the client, featuring **user authentication**, a **rich text editor**, and **post management**.

---

##  Live Deployment

[https://kapy-blog.vercel.app](https://kapy-blog.vercel.app)  

---

## Features Implemented

### Priority 1: Core Functionality
- [x] **User Authentication** — Secure sign-up and sign-in using JWTs stored in `httpOnly` cookies.  
- [x] **Post Management (CRUD)** — Authenticated users can create, read, update, and delete their own posts.  
- [x] **Public Post Viewing** — All published posts are visible to the public on a paginated main feed.  
- [x] **Single Post View** — Users can view full post content on a dedicated page.  

---

### Priority 2: Blogging Features
- [x] **Draft & Publish System** — Users can save posts as drafts or publish them.  
- [x] **Profile Page** — Dedicated page (`/u/[username]`) showing all of a user’s posts (published + drafts).  
- [x] **Post Categories** — Posts support multiple categories (many-to-many relationship).  
- [x] **Dynamic Category Creation** — Create new categories directly from the post editor.  
- [x] **Image Uploads** — The rich text editor supports Cloudinary image uploads.  
- [x] **Recent Posts** — Homepage highlights the 3 most recently updated posts.  

---

### Priority 3: Polish & UX
- [x] **Responsive Design** — Fully responsive and mobile-friendly.  
- [x] **Pagination** — Efficiently handles a large number of posts.  
- [x] **Category Filtering** — Filter the main feed by category.  
- [x] **Loading Skeletons** — Shown while data is being fetched.  
- [x] **Toasts/Notifications** — Feedback for saving, publishing, and errors.  

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| **Framework** | Next.js (App Router) |
| **API** | tRPC (end-to-end type safety) |
| **ORM** | Drizzle ORM |
| **Database** | PostgreSQL (via Vercel Postgres) |
| **Auth** | JWT (stored in httpOnly cookies) |
| **Styling** | Tailwind CSS |
| **UI Components** | shadcn/ui |
| **Validation** | Zod (via tRPC + react-hook-form) |
| **Image Hosting** | Cloudinary |
| **Language** | TypeScript |

---

## Local Setup & Installation

Follow these steps to get the project running locally.

### 1. Clone the Repository
```bash
git clone https://github.com/iyush05/kapy-blog.git
cd kapy-blog
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of your project and add:

```bash
# 1. Database URL
# Get this from your PostgreSQL provider (e.g., Neon)
DATABASE_URL="postgres://..."

# 2. JWT Secret
# Generate one here: https://generate-secret.now.sh/32
JWT_SECRET="YOUR_SUPER_SECRET_JWT_KEY"

# 3. Cloudinary (for image uploads)
# Get these from your Cloudinary dashboard
NEXT_PUBLIC_CLOUD_NAME="YOUR_CLOUDINARY_CLOUD_NAME"
NEXT_PUBLIC_UPLOAD_PRESET="YOUR_CLOUDINARY_UPLOAD_PRESET"
NEXT_PUBLIC_DEPLOYED_URL="YOUR_DEPLOYED_URL"
```

### 4. Set Up the Database
This project uses **Drizzle ORM**. Push your schema to the database:

```bash
npx drizzle-kit push
```

### 5. Run the Development Server
```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) in your browser 

---

## Database Seeding

This project does **not** include a dedicated seed script.  
To seed manually:

1. Sign up for a new user account.  
2. Go to **Create Post**.  
3. Under **Select categories**, create categories (e.g., “Tech”, “Lifestyle”, “Productivity”).  
4. Create and publish a few posts.  

---

## tRPC Router Structure

KapyBlog uses **tRPC** for end-to-end type safety.  
Routers are modularized by feature and combined in `src/trpc/routers/_app.ts`.

### File Overview

#### Initialization
- **`src/trpc/init.ts`** — Initializes tRPC and defines `protectedProcedure` middleware to enforce authentication.

#### Main Router
- **`src/trpc/routers/_app.ts`** — Merges all sub-routers.

#### Sub-Routers
- **`authRouter`** (`src/modules/auth/server/procedures.ts`)  
  - `create` — Handles new user sign-up.  
  - `login` — Handles user sign-in.  

- **`postRouter`** (`src/modules/posts/server/procedures.ts`)  
  - `create` / `save` — Upsert logic (create or update post; handles publish/draft).  
  - `remove` — Delete a post (protected).  
  - `getAll` — Fetch all published posts (paginated).  
  - `getRecent` — Get 3 most recent posts.  
  - `getOne` — Get a single post by slug.  

- **`categoriesRouter`** (`src/modules/categories/server/procedures.ts`)  
  - `create` — Create new category (protected).  
  - `list` — List all available categories.  

- **`profileRouter`** (`src/modules/profile/server/procedures.ts`)  
  - `getMany` — Fetch all posts (published + drafts) for logged-in user.  

---

## Design Decisions & Trade-offs

### Authentication
- Uses **JWTs stored in httpOnly cookies** — secure, simple, and prevents XSS.
- Trade-off: No built-in session invalidation (requires DB-backed sessions for that).

### Editor
- Custom **rich text editor** using `document.execCommand`.  
- Fast to build, supports bold/italic and image uploads.  
- Trade-off: `execCommand` is deprecated; better long-term option is **TipTap** or **Lexical**.

### Post Slugs
- Generated client-side before creation (simplifies UI flow).  
- Trade-off: Relies on random strings instead of title-based slugs checked for uniqueness.

### Database & ORM
- **Drizzle ORM** chosen for its lightweight nature, speed, and excellent type-safety — pairs well with tRPC.

---
