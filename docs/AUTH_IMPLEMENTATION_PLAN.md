# Auth / Account Feature Epic Plan

## Overview

Login and account management is a foundational feature affecting:
- User identity across all screens
- Buddies system
- Tab ownership and membership
- Drink ownership and attribution
- Attestations / verification
- Likes / comments
- Media uploads (avatars, photos, videos)
- Leaderboards (real user data)
- Receipts / personal stats
- Privacy settings
- Account settings

Auth is not just "add a login page" — it's the foundation for every other feature that requires user context.

---

## Recommended Technical Direction

**Stack**: Supabase Auth + Postgres profiles table + RLS (phased)

**Supabase Auth handles**:
- Email / password signup & login
- Magic links (future)
- OAuth (future)
- Session persistence
- Password reset
- Email verification
- Auth tokens

**App handles**:
- Display name, username
- Avatar
- Bio, home city
- Buddies list
- Drink stats
- Tab membership
- User settings

---

## Core Auth Model

### Supabase-Managed: uth.users

Stores (you don't manage directly):
- id (uuid)
- email
- encrypted_password
- uth_metadata
- created_at
- confirmed_at

### App-Managed: profiles Table

`sql
profiles
- id uuid primary key references auth.users(id) on delete cascade
- email text
- display_name text not null
- username text unique
- initials text
- avatar_url text
- bio text
- home_city text
- is_private boolean default false
- created_at timestamptz default now()
- updated_at timestamptz default now()
`

---

## App Pages Required

1. **Login** (/login) — Email, password, sign up / forgot password links
2. **Signup** (/signup) — Display name, username, email, password, confirm password
3. **Forgot Password** (/forgot-password) — Email, send reset link
4. **Reset Password** (/reset-password, later) — New password, confirm
5. **Account** (/account) — Edit profile (name, username, bio, home city, privacy), logout
6. **Auth Callback** (/auth/callback) — For magic links / OAuth redirect

---

## Implementation Phases

### Phase 0: Discovery & Audit
- Audit Supabase setup, existing auth files, routing structure
- Report but do NOT edit

### Phase 1: Database & Profile Foundation
- Create profiles table migration
- Add updated_at trigger
- Add profile creation trigger on new user signup

### Phase 2: Supabase Client & Auth Utilities
- Create browser Supabase client (lib/supabase/client.ts)
- Define auth types (lib/auth/authTypes.ts)
- No auth UI yet

### Phase 3: AuthProvider & Hook
- Create AuthProvider component
- Create useAuth hook
- Wrap app/layout.tsx with AuthClientShell

### Phase 4: Auth Pages
- Create login page
- Create signup page
- Create forgot password page
- Do NOT protect app routes yet

### Phase 5: Route Protection
- Create (auth) and (app) route groups
- Create ProtectedRoute wrapper
- Move app pages into (app) group

### Phase 6: Account Page
- Create account page with profile edit + logout
- Wire profile menu to /account

### Phase 7: App Data Ownership
- Replace hardcoded "Tyler" / "TP" with real profile data
- Prepare future user_id fields on tables

### Phase 8: RLS & Security (Deferred)
- Add profiles RLS policies
- Add tab/privacy RLS policies later

---

## Acceptance Checklist

Auth Phase 1 Complete:
- [ ] Login page works
- [ ] Signup page works
- [ ] Forgot password page works
- [ ] Account page works
- [ ] AuthProvider persists session
- [ ] Protected routes redirect logged-out users
- [ ] Login/signup pages do not show bottom nav
- [ ] App pages show bottom nav only when logged in
- [ ] Logout works
- [ ] Real user profile appears in UI
- [ ] (auth) and (app) route groups in place

---

## Next Action

**Run Prompt 1: Discovery Only** in Claude Code before making any changes.
