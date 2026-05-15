# Phase 5: Route Protection Implementation - RESOLVED

## Issue Summary
**RESOLVED**: Misunderstood how Next.js route groups work. Route groups in parentheses (like `(auth)` and `(app)`) do NOT appear in URLs—they're only for code organization.

Previous mistake: Expected `/auth/login` but route groups don't add path segments.
Correct URLs: `/login`, `/signup`, `/forgot-password` (clean, standard auth routes).

## Environment
- **Next.js Version**: 16.2.6 (webpack)
- **OS**: Windows 10 Pro 10.0.19045
- **Node.js**: Available via nvm4w
- **Project**: the-tab (React 19.2.4, TypeScript)

## What We're Trying to Do

Implement Phase 5 of auth feature: route protection using Next.js route groups to separate:
- **Public routes**: `/auth/login`, `/auth/signup`, `/auth/forgot-password` → in `app/(auth)/`
- **Protected routes**: `/feed`, `/tabs`, `/leaderboard`, `/receipts`, `/add-drink` → in `app/(app)/`

The (auth) layout redirects authenticated users to home, the (app) layout wraps routes with ProtectedRoute component that checks auth state.

## File Structure Created

```
app/
├── layout.tsx (root, wraps with AuthClientShell)
├── page.tsx
├── (auth)/
│   ├── layout.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── forgot-password/
│       └── page.tsx
├── (app)/
│   ├── layout.tsx (wraps with ProtectedRoute)
│   ├── feed/
│   │   └── page.tsx
│   ├── tabs/
│   │   └── page.tsx
│   ├── leaderboard/
│   │   └── page.tsx
│   ├── add-drink/
│   │   └── page.tsx
│   └── receipts/
│       └── page.tsx
```

## The Problem

### Routes That Work ✓
- `GET /leaderboard` → 200 OK
- `GET /tabs` → 200 OK
- (Both are in the (app) route group)

### Routes That Don't Work ✗
- `GET /auth/login` → 404 Not Found
- `GET /auth/signup` → 404 Not Found
- `GET /auth/forgot-password` → 404 Not Found
- (All are in the (auth) route group)

### Dev Server Logs
```
○ Compiling /_not-found ...
 GET /leaderboard 200 in 3.7s (next.js: 3.1s, application-code: 589ms)
 GET /tabs 200 in 9.5s (next.js: 8.9s, application-code: 590ms)
 GET /auth/login 404 in 9.5s (next.js: 9.0s, application-code: 477ms)
```

## What We've Tried

1. **Cleared .next build cache** → Still 404
2. **Restarted dev server multiple times** → Still 404
3. **Changed (auth) layout from client to server component** → Still 404
4. **Renamed (auth) directory to _auth** → Still 404 for /_auth/login
5. **Created simple test page in _auth without hooks** → Still 404
6. **Cleaned .eslintcache** → Still 404

## Diagnostic Findings

### App-Paths Manifest (`.next/dev/server/app-paths-manifest.json`)
```json
{
  "/_not-found/page": "app/_not-found/page.js",
  "/(app)/leaderboard/page": "app/(app)/leaderboard/page.js"
}
```

**Issue**: 
- Only shows `_not-found` and one app route
- Missing all other (app) pages (feed, tabs, receipts, add-drink)
- Missing all _auth pages entirely
- Yet `/leaderboard` and `/tabs` return 200 OK
- Suggests manifest is incomplete or dev server uses different routing

### File Verification
- All files exist at correct paths ✓
- All pages export default functions ✓
- Layout files exist and are syntactically correct ✓
- (auth) test page without hooks still returns 404 ✓

### Layout Files

**app/(auth)/layout.tsx:**
```typescript
"use client";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**app/(app)/layout.tsx:**
```typescript
"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
```

## Observations

1. **Route groups ARE working** - The (app) group is recognized for leaderboard
2. **Only (auth) group is broken** - _auth pages don't load either
3. **Not a permissions/cache issue** - Multiple clean builds didn't help
4. **Not a hook issue** - Simple test page without imports still 404
5. **Not a page export issue** - All pages have correct default exports
6. **Manifest incomplete** - Dev server's route manifest missing most pages yet routes work

## Questions for Debugging

1. Is there a middleware or catch-all route interfering with (auth) paths?
2. Why is the app-paths-manifest incomplete but routes still work?
3. Is this a Next.js 16.2.6 webpack bug with certain route group names?
4. Could there be a reserved keyword issue with "auth" that prevents (auth) from working?
5. Is the dev server caching route resolution differently than the manifest?

## Files Changed
- Created: `app/(auth)/layout.tsx`, `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx`, `app/(auth)/forgot-password/page.tsx`
- Created: `app/(app)/layout.tsx`, moved app pages into (app) group
- Created: `components/auth/ProtectedRoute.tsx`
- Modified: `app/layout.tsx` to wrap with AuthClientShell
- Attempted rename: `(auth)` → `_auth` (still broken)

## Next Steps Needed

Need investigation into why (auth) route group isn't being recognized while (app) works fine.
