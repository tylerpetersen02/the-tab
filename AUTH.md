# Authentication & Account System

## Overview

The Tab uses **Supabase Auth** for user authentication with email/password signup and login. Protected routes redirect unauthenticated users to `/login`. User profiles are stored in the `profiles` table with support for avatars, display names, and usernames.

## Architecture

### Core Files

- `lib/supabase/client.ts` — Supabase client initialization
- `lib/auth/authTypes.ts` — TypeScript types for auth (AuthProfile, SignUpPayload, AuthResult)
- `lib/auth/authService.ts` — Auth service functions (signIn, signUp, signOut, getProfile, updateProfile)
- `components/auth/AuthProvider.tsx` — React Context providing auth state and methods
- `components/auth/useAuth.ts` — Hook for accessing auth context
- `components/auth/AuthClientShell.tsx` — Client wrapper for root layout (enables auth context)
- `components/auth/ProtectedRoute.tsx` — Wrapper redirecting unauthenticated users to `/login`
- `components/auth/AuthLayout.tsx` — Layout wrapper for auth pages, redirects authenticated users to `/feed`
- `components/auth/AuthHero.tsx` — Gradient hero card with product messaging
- `components/layout/AppShellContext.tsx` — Global state for profile drawer
- `components/layout/ProfileDrawer.tsx` — Side drawer with account menu
- `components/common/AvatarUpload.tsx` — Image upload component for avatars

### Auth Pages

- `app/(auth)/login/page.tsx` — Email/password login with forgot password link
- `app/(auth)/signup/page.tsx` — New account creation with first/last name
- `app/(auth)/forgot-password/page.tsx` — Password reset (TODO: implement Supabase flow)
- `app/(app)/account/page.tsx` — Account settings and profile management

## Sign Up Flow

1. User enters: **First Name**, **Last Name**, **Email**, **Password**, **Confirm Password**
2. Form validation:
   - Passwords must match
   - All fields required
3. Initials generated: `${firstName[0]}${lastName[0]}` (e.g., "Tyler Petersen" → "TP")
4. Username auto-generated: `${firstName}${lastName}${random-3-digit}` (e.g., "tylerpetersen482")
5. Display name set to: `${firstName} ${lastName}`
6. Supabase auth user created with email/password
7. Profile row created in `profiles` table with: `display_name`, `username`, `initials`, `avatar_url`, `bio`, `home_city`, `is_private`
8. User redirected to `/feed`

## Login Flow

1. User enters: **Email**, **Password**
2. Supabase auth validates credentials
3. User profile fetched from `profiles` table
4. User context updated with profile data
5. User redirected to `/feed`

## Password Reset

User can click "Forgot password?" on login page. Currently shows success state but does not send actual reset email. **TODO:** Wire up Supabase password reset flow.

## Avatar Upload

On the Account page, users can:
- Click "Upload Photo" to select an image
- Click "Take Photo" to capture using device camera
- Image uploaded to Supabase Storage (`avatars` bucket)
- Old avatar deleted from storage
- Profile `avatar_url` updated
- Avatar displays across the app (header, drawer, feed, etc.)

Falls back to initials if no photo uploaded.

## Navigation & Account Access

### Bottom Navigation
Only primary product loops (no Account):
- Feed
- Tabs
- Add / Current Tab
- Leaderboard
- Receipts

### Top-Right Avatar Menu
Avatar bubble in AppHeader opens side drawer with:
- Profile summary (avatar, name, username)
- Account (edit profile, display name, username)
- Buddies
- Find / Invite Buddies
- Settings
- Privacy & Safety
- Legal / Disclaimers
- Log Out

## Profile Data Model

```typescript
type AuthProfile = {
  id: string;                // User ID from Supabase auth
  email: string | null;      // Email address
  display_name: string;      // e.g., "Tyler Petersen" (first + last)
  username: string | null;   // e.g., "tylerpetersen482" (auto-generated)
  initials: string | null;   // e.g., "TP" (first letters)
  avatar_url: string | null; // Supabase Storage public URL
  bio: string | null;        // User bio
  home_city: string | null;  // Home city for display
  is_private: boolean;       // Privacy setting
  created_at: string;        // Account creation timestamp
  updated_at: string;        // Last profile update
};
```

## Key Implementation Details

### Username Collision Handling
Usernames are unique in the database. To avoid collisions when two users have the same first/last name:
```typescript
const generatedUsername = `${firstName}${lastName}`
  .toLowerCase()
  .replace(/[^a-z0-9]/g, "");
const username = `${generatedUsername}${Math.floor(100 + Math.random() * 900)}`;
```

### Initials Display
Initials are stored in the database at signup. They're used for avatar bubbles throughout the app. Currently based on first + last name. If user updates display name later, initials are not auto-updated (can be fixed in account editor).

### Form Validation
- **Signup:** First name, last name, email, password (min 8 chars), confirm password (must match)
- **Login:** Email, password
- **Forgot Password:** Email

### Design System
All auth pages use:
- `AppText` with variants: `brand`, `body`, `bodySmall`, `meta`
- `AppButton` with `type="submit"` on forms
- `inputStyles` for form inputs
- Design system colors (teal, orange) from Tailwind tokens
- No raw hex colors
- Password inputs with eye icon toggle for visibility

### Route Protection
- `ProtectedRoute` wrapper on `app/(app)/layout.tsx` redirects unauthenticated users to `/login`
- `AuthLayout` wrapper on auth pages redirects authenticated users to `/feed`
- Route groups `(auth)` and `(app)` organize routes without affecting URLs

## Future Work

### Database Schema
Consider adding to `profiles` table:
- `first_name` and `last_name` (currently form-only, not stored)
- `email_verified` timestamp
- `phone_number` and `phone_verified` (for SMS auth)
- `preferred_language`

### Password Reset
- Wire up Supabase password reset email
- Create reset token verification flow
- Create new password form at reset URL

### Profile Editing
- Allow editing display name, username, bio, home city
- Auto-generate or allow custom initials
- Privacy settings (public/private profile)

### Avatar Features
- Crop/resize image before upload
- Image optimization (WebP, multiple sizes)
- Avatar gallery/history

### Social Features
- Link buddies/friends
- Add mutual friend indicators
- Block users
- Report users

### Two-Factor Authentication
- TOTP (Google Authenticator)
- Backup codes
- SMS (requires Twilio integration)

## Testing Checklist

- [ ] Sign up with valid email/password/names
- [ ] Sign up form validation (passwords don't match, empty fields)
- [ ] Login with correct credentials
- [ ] Login fails with wrong password
- [ ] Forgot password flow (emails not implemented)
- [ ] Upload avatar from gallery
- [ ] Upload avatar from camera
- [ ] Avatar displays in header, drawer, account page
- [ ] Avatar displays in feed (mock users with avatarUrl)
- [ ] Logout redirects to `/login`
- [ ] Protected routes redirect to `/login` when not authenticated
- [ ] Already authenticated users can't access `/login`, `/signup`
- [ ] Edit profile (display name, username, bio, home city)
- [ ] Navigation structure (no Account in bottom nav, in avatar drawer)
