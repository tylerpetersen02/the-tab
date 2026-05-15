# Supabase Schema: Current State

## ⚠️ CRITICAL DISCOVERY

Your database is **ALREADY BUILT OUT** with 16 tables, full relationships, audit trails, and social features. This is NOT a "Phase 1 setup" — this is production-grade schema.

**Profiles table EXISTS** — Our planned migration would CONFLICT. Skip it.

---

## Table Summary (15 tables)

### Core User Management
- **profiles** — User profile data (email, display_name, username, avatar_url, bio, home_city, is_private)
- **users** — Duplicate user table? (first_name, last_name, nickname, avatar_url, email) ⚠️ INVESTIGATE

### Tab System (Core Feature)
- **tabs** — Drinking sessions (title, group_id, created_by_user_id, status, visibility, invite_code, allow_member_invites, allow_guests, location, started_at, ended_at)
- **tab_members** — Tab membership (user_id, guest_name, invited_by_user_id, role, join_type, joined_at, left_at)
- **tab_invites** — Tab invitations (tab_id, invited_user_id, invited_by_user_id, status, expires_at)

### Groups/Friends
- **groups** — Friend groups/circles (name, description, created_by_user_id, invite_code)
- **group_members** — Group membership (group_id, user_id, role, joined_at)
- **buddy_connections** — Friend requests (requester_user_id, recipient_user_id, status, accepted_at)

### Drink Tracking (Core Feature)
- **pint_logs** — Main drink log (tab_id, user_id, beer_name, beer_type, abv, drink_size_oz, caption, venue_name, location, validation_tier, entry_type, consumed_at)
- **bonus_drinks** — Shots/cocktails (tab_id, user_id, bonus_type, drink_name, quantity, venue_name, city, entry_type, consumed_at)
- **pint_media** — Photos/videos of drinks (pint_log_id, user_id, media_type, storage_url, thumbnail_url)

### Social Features
- **comments** — Comments on drinks/posts (target_type, target_id, user_id, body, deleted_at)
- **reactions** — Likes/emoji reactions (target_type, target_id, user_id, reaction_type)

### Audit/Verification
- **pint_log_edits** — Drink log change history (pint_log_id, edited_by_user_id, field_name, old_value, new_value)
- **bonus_drink_edits** — Bonus drink change history (bonus_drink_id, edited_by_user_id, field_name, old_value, new_value)
- **pint_attestations** — Drink verification (pint_log_id, attested_by_user_id, status, comment)

---

## Key Schema Facts

### Relationships
- **tabs** ← created_by_user_id → **users**
- **tabs** → group_id → **groups** (optional, tabs can exist without group)
- **pint_logs** → tab_id → **tabs**
- **pint_logs** → user_id → **users**
- **tab_members** → tab_id → **tabs**
- **tab_members** → user_id → **users**
- **comments**, **reactions**, **pint_media** all reference user_id → **users**

### Current RLS
- **profiles** — "profiles_all_access" (permissive, everyone can read/write)
- Everything else — No RLS policies found!

### Triggers
- **profiles** — "profiles_set_updated_at" (auto-update updated_at)
- Everything else — No triggers found!

---

## 🚨 Issues & Questions

### 1. **Two User Tables?**
- **auth.users** (Supabase managed, has email/password/auth metadata)
- **public.users** (app managed, has first_name, last_name, nickname)
- **public.profiles** (app managed, has display_name, username)

**Why 3 sources of user data?** This is confusing. Recommended consolidation:
- Keep auth.users (Supabase)
- Keep profiles (app identity: display_name, username, avatar)
- Remove or repurpose users table

### 2. **No RLS Policies (Except profiles)**
Everything else has no row-level security. Anyone can read/edit all data.

### 3. **No Audit Triggers**
Audit tables exist (pint_log_edits, bonus_drink_edits) but no triggers to populate them. Manual?

### 4. **pint_media storage_url**
Points to where in Supabase Storage? (avatars/ | drinks/ | tabs/)?

---

## What This Means for Auth

**GOOD NEWS**: Database is ready. NO migration needed.

**NEXT STEPS** (Real Phase 2):
1. ✅ profiles table exists — skip migration
2. Investigate users vs profiles duplication
3. Build Supabase client (lib/supabase/client.ts)
4. Build AuthProvider (read from profiles, handle login/signup)
5. Build login/signup pages (wire to existing schema)
6. Build account page (edit profiles)
7. Implement RLS policies (Phase 8)
8. Decide: keep users table or consolidate?

---

## Recommendation

This project is MUCH further along than a "Phase 1" auth setup. You need:

**Immediate**:
- [ ] Clarify users vs profiles duplication
- [ ] Document why audit tables exist (automatic or manual?)
- [ ] Confirm storage bucket structure for media

**Phase 2** (Next):
- [ ] Build Supabase client + AuthProvider (leverage existing profiles)
- [ ] Build login/signup pages
- [ ] Build account page
- [ ] Test auth flow against existing schema

**Phase 8** (Later):
- [ ] Implement RLS policies properly
- [ ] Add audit triggers if needed
- [ ] Secure media access

---

## Files to Delete/Update

Delete or don't run:
- ❌ supabase/migrations/001_create_profiles.sql — profiles table already exists
- ❌ Don't run the migration we created

Keep:
- ✅ supabase/README.md — good reference
- ✅ docs/DATABASE_PROFILES_SCHEMA.md — good reference
- ✅ docs/AUTH_IMPLEMENTATION_PLAN.md — still useful, just update Phase 1

---

## Next Prompt for Claude Code

Skip the migration. Go straight to **Phase 2: Supabase Client & Auth Utilities**:

\\\
You're building auth for The Tab, which already has a full Supabase schema with profiles, tabs, users, etc.

Status:
- profiles table EXISTS (no migration needed)
- No Supabase client yet
- No AuthProvider yet
- No login/signup pages yet

Task: Phase 2 — Supabase Client & Auth Utilities

Build (do NOT edit database):
1. lib/supabase/client.ts — Browser Supabase client
2. lib/auth/authTypes.ts — TypeScript types (User, Profile, SignUp payload)
3. lib/auth/authService.ts — Auth functions (signIn, signUp, signOut, getProfile, updateProfile)

Reference /docs/DATABASE_PROFILES_SCHEMA.md for schema.

Note: profiles table already exists with columns:
- id, email, display_name, username, initials, avatar_url, bio, home_city, is_private, created_at, updated_at

No migrations. No auth page UI yet. Just foundation.
\\\

This is the real Phase 2. Ready?
