# 🔧 Vercel Database Fix

## Problem

SQLite can't write to the filesystem on Vercel because serverless functions have read-only filesystems.

**Error**: `SQLITE_CANTOPEN: unable to open database file`

## Solution

The code now automatically uses an **in-memory database** when deployed to Vercel (production).

### How It Works

```javascript
// Detects production environment
const isProduction = process.env.NODE_ENV === "production";

// Uses in-memory DB in production, file-based locally
const dbPath = isProduction ? ":memory:" : "./faqs.db";
```

### What This Means

✅ **Local Development**: Uses `faqs.db` file (persistent)
✅ **Vercel Production**: Uses in-memory database (recreated on each cold start)

### Trade-offs

**Pros**:

- ✅ Works on Vercel without issues
- ✅ Fast (in-memory is faster than disk)
- ✅ No file system permissions needed

**Cons**:

- ⚠️ Database resets on cold starts (every ~15 minutes of inactivity)
- ⚠️ FAQs are recreated each time

### For Production Use

If you need persistent data, consider these alternatives:

#### Option 1: Vercel Postgres (Recommended)

```bash
npm install @vercel/postgres
```

#### Option 2: MongoDB Atlas (Free Tier)

```bash
npm install mongodb
```

#### Option 3: Supabase (Free Tier)

```bash
npm install @supabase/supabase-js
```

#### Option 4: PlanetScale (MySQL)

```bash
npm install @planetscale/database
```

## Current Setup is Perfect For

- ✅ Demos and prototypes
- ✅ Assignments and projects
- ✅ Testing and development
- ✅ Static FAQ data (doesn't change)

## When to Upgrade

Upgrade to a persistent database when:

- Users can add/edit FAQs
- You need data to persist between deployments
- You have dynamic content
- You need analytics/logging

## Verification

After deploying, check Vercel logs:

✅ **Success**:

```
Connected to SQLite database (in-memory)
Sample FAQs inserted successfully
```

❌ **Error** (old code):

```
Error opening database: SQLITE_CANTOPEN
```

## No Action Needed!

The fix is already applied. Just deploy and it will work! 🚀
