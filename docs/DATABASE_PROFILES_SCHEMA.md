# Database Schema: Profiles Table

## Overview

The profiles table is the app-managed user data that extends Supabase's uth.users. Every authenticated user gets a profile row automatically.

**Related tables**:
- uth.users (Supabase-managed) — email, password, auth metadata
- public.profiles (app-managed) — display name, username, avatar, bio, settings

---

## Table Structure

\\\sql
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  display_name text NOT NULL,
  username text UNIQUE,
  initials text,
  avatar_url text,
  bio text,
  home_city text,
  is_private boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
\\\

### Column Definitions

| Column | Type | Constraints | Purpose |
|---|---|---|---|
| **id** | uuid | PK, FK→auth.users(id) ON DELETE CASCADE | User identifier, linked to auth user |
| **email** | text | Nullable | Copy of auth.users.email for quick access |
| **display_name** | text | NOT NULL | User's display name (required) |
| **username** | text | UNIQUE, Nullable | For @mentions, leaderboards, buddies lookup |
| **initials** | text | Nullable | Auto-generated from display_name (2 chars, uppercase) |
| **avatar_url** | text | Nullable | URL to user's avatar image |
| **bio** | text | Nullable | Short bio/about text |
| **home_city** | text | Nullable | User's city |
| **is_private** | boolean | DEFAULT false | Profile visibility setting |
| **created_at** | timestamptz | DEFAULT now() | Account creation timestamp |
| **updated_at** | timestamptz | DEFAULT now() | Last profile edit timestamp |

---

## Indexes

### profiles_username_idx

\\\sql
CREATE INDEX profiles_username_idx ON public.profiles(username);
\\\

**Purpose**: Fast username lookups for @mentions, buddies, leaderboards

**Why**: username is unique but frequently searched (friend discovery, validation)

---

## Triggers

### 1. set_updated_at() — Auto-update timestamp

**Function**:
\\\sql
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS \$\$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
\$\$;
\\\

**Trigger**:
\\\sql
CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
\\\

**Behavior**: Every time a profile row is updated, \updated_at\ is automatically set to the current timestamp.

**Why**: Maintains audit trail without requiring app code to set it.

---

### 2. handle_new_user() — Auto-create profile on signup

**Function**:
\\\sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS \$\$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    display_name,
    username,
    initials
  )
  VALUES (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', 'New User'),
    nullif(new.raw_user_meta_data->>'username', ''),
    upper(left(coalesce(new.raw_user_meta_data->>'display_name', 'NU'), 2))
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
\$\$;
\\\

**Trigger**:
\\\sql
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();
\\\

**Behavior**: When a new row is inserted into \uth.users\ (during signup), automatically create a matching \profiles\ row.

**Data extraction**:
- **id**: From \uth.users.id\
- **email**: From \uth.users.email\
- **display_name**: From signup metadata or defaults to "New User"
- **username**: From signup metadata (optional, can be null)
- **initials**: Auto-generated from display_name (first 2 chars, uppercase)

**ON CONFLICT DO NOTHING**: If a profile row already exists for that user ID, silently skip (idempotent).

**SECURITY DEFINER**: Allows this function to run as the definer (Supabase role) even when called from user context.

**SET search_path = public**: Ensures the function looks for tables in the public schema (best practice for Supabase).

---

## Row-Level Security (RLS)

### Current Policy (Development)

\\\sql
CREATE POLICY "profiles_all_access" ON public.profiles
FOR ALL
USING (true)
WITH CHECK (true);
\\\

**Behavior**: Everyone can read and update every profile.

**Why**: Simplifies development. Proper RLS will be added in Phase 8.

### Future Policies (Phase 8)

Replace the permissive policy with:

\\\sql
-- Users can read all public profiles
CREATE POLICY "profiles_public_read" ON public.profiles
FOR SELECT
USING (is_private = false OR auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "profiles_self_update" ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Users can only insert their own profile (handled by trigger, but just in case)
CREATE POLICY "profiles_self_insert" ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);
\\\

---

## Key PostgreSQL Syntax Notes

### Dollar-Quote Syntax (\$\$)

Function bodies must be wrapped in dollar quotes to avoid SQL parser conflicts:

\\\sql
-- ❌ WRONG (syntax error)
CREATE OR REPLACE FUNCTION my_func()
RETURNS trigger
LANGUAGE plpgsql
AS
BEGIN
  -- code
END;

-- ✅ CORRECT
CREATE OR REPLACE FUNCTION my_func()
RETURNS trigger
LANGUAGE plpgsql
AS \$\$
BEGIN
  -- code
END;
\$\$;
\\\

The opening and closing \\$\$\ delimit the function body. Anything inside is treated as literal PL/pgSQL code.

### SECURITY DEFINER

\\\sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER  -- ← This means the function runs as the definer's role
SET search_path = public
AS \$\$
\\\

**What it does**: The function executes with the privileges of whoever created it (Supabase admin role), not the user who triggered it.

**Why**: Ensures the trigger can insert into profiles even if the user (via auth) normally couldn't.

**Security note**: Always pair with \SET search_path\ to control which schema the function can access.

### BEFORE UPDATE vs AFTER INSERT

**BEFORE UPDATE** (for set_updated_at):
- Runs before the row is updated
- Can modify the \
ew\ row before it's saved
- Used to set \updated_at = now()\

**AFTER INSERT** (for handle_new_user):
- Runs after the auth.users row is inserted
- Cannot modify the \
ew\ row (already saved)
- Used to create the corresponding profile row

---

## Migration Execution

### Via Supabase Dashboard

1. Go to **SQL Editor**
2. Click **New Query**
3. Paste entire migration SQL
4. Click **Run**
5. ✅ Should see: "Query succeeded with no results"

### Verification

\\\sql
-- Check table exists
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'profiles';

-- Check triggers
SELECT * FROM pg_trigger 
WHERE tgname IN ('profiles_set_updated_at', 'on_auth_user_created');

-- Check RLS
SELECT * FROM pg_policy 
WHERE polname = 'profiles_all_access';
\\\

---

## Testing the Triggers

### Test 1: Auto-create profile on signup

\\\sql
-- In Supabase dashboard, create a test auth user (or use CLI)
-- Then check if profile was created:

SELECT * FROM profiles WHERE email = 'test@example.com';
-- Should return 1 row
\\\

### Test 2: Auto-update timestamp

\\\sql
-- Get initial updated_at
SELECT id, updated_at FROM profiles LIMIT 1;
-- Record the timestamp

-- Wait a few seconds, then update the profile
UPDATE profiles 
SET bio = 'Updated bio' 
WHERE id = '<user_id>';

-- Check updated_at
SELECT id, updated_at FROM profiles WHERE id = '<user_id>';
-- Should show a newer timestamp
\\\

---

## Related Tables (Future)

After profiles is stable, these tables will reference it:

\\\sql
-- Tabs table
CREATE TABLE tabs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid NOT NULL REFERENCES profiles(id),
  title text NOT NULL,
  visibility text,
  ...
);

-- Tab members
CREATE TABLE tab_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tab_id uuid NOT NULL REFERENCES tabs(id),
  user_id uuid NOT NULL REFERENCES profiles(id),
  joined_at timestamptz DEFAULT now(),
  left_at timestamptz,
  ...
);

-- Drink logs
CREATE TABLE pint_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tab_id uuid REFERENCES tabs(id),
  user_id uuid NOT NULL REFERENCES profiles(id),
  drink_type text,
  ounces int,
  created_at timestamptz DEFAULT now(),
  ...
);

-- Comments, reactions, etc.
CREATE TABLE comments (
  id uuid PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES profiles(id),
  post_id uuid,
  content text,
  created_at timestamptz,
  ...
);
\\\

---

## Notes & Future Work

- **Phase 2**: Create Supabase client (\lib/supabase/client.ts\)
- **Phase 3**: Create AuthProvider to read/update profiles
- **Phase 7**: Wire profile data into UI (replace hardcoded user)
- **Phase 8**: Replace "profiles_all_access" with proper RLS policies
- **Future**: Add user_settings table with more granular preferences

---

## References

- [PostgreSQL Trigger Documentation](https://www.postgresql.org/docs/current/sql-createtrigger.html)
- [Supabase RLS Documentation](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth & User Metadata](https://supabase.com/docs/reference/javascript/auth-signup)
