# Tab System

## What is a Tab?

A **Tab** is a discrete drinking session shared by a friend group. Tracks collective and individual drink consumption.

## Tab Lifecycle

1. **Gate** — No active tab. Options: Open new OR join existing.

2. **Create Tab** — User fills form:
   - Title (required, max 30 chars)
   - Cover Photo (optional)
   - Visibility (open | invite_only | private)
   - Location (optional)
   - Ounce Goal (optional)
   
   On submit: Generate join code (e.g., FRIDAY8), create activeTab, show Current Tab hub.

3. **Join Tab** — User enters join code. Transition to Current Tab hub.

4. **Current Tab (Active)** — Hub displays:
   - Hero Card (title, location, elapsed, cover photo, live badge)
   - Ounce Goal Progress (if set)
   - Your Contribution (beers, oz, pint score)
   - Members List
   - Drink Breakdown
   - Recent Activity
   - Action Tiles (Invite, Join Code, Change Photo, Leave Tab)
   - Close Tab (destructive)

5. **Add Drink** — Sub-flow:
   - Select drink type (beer, wine, seltzer, shot, cocktail)
   - For sized drinks: select ounces via wheel
   - For shots: select liquor type
   - For cocktails: select cocktail name
   - Optional: location, comment, photo/video
   - Submit → Updates state, return to hub

6. **Leave Tab** — Mark current user with leftAt timestamp. Preserve history. User still visible in members list.

7. **Close Tab** — Confirmation modal. Archive tab. Clear active. Return to gate.

## Drink Counting Rules

**Eligible** (count toward ounces & pint score):
- Beer (default 16 oz, variable 4–32 oz)
- Wine (default 5 oz, variable)
- Seltzer (default 12 oz, variable)

**Bonus** (tracked separately, no oz count):
- Shot (no size selection)
- Cocktail (no size selection)

**Pint Score**: Eligible ounces / 16

## Join Code Generation

- Take tab title, remove non-alphanumeric, take first 5 chars, uppercase
- Append random 3-digit suffix (100-999)
- Example: "Friday Night Alpha" → "FRIDAY" + "8" → "FRIDAY8"

## Visibility Rules

| Visibility | Behavior | Join Method |
|---|---|---|
| **Open** | Anyone can see & join | Direct join, no code |
| **Invite Only** | Public but restricted | Code required |
| **Private** | Hidden from public | Only invited |

## Current Implementation Status

**Done** (all in `app/add-drink/page.tsx`):
- ✅ Gate screen
- ✅ Create Tab form
- ✅ Join Tab form
- ✅ Current Tab hub
- ✅ Add Drink sub-flow
- ✅ Leave Tab action
- ✅ Close Tab with confirmation
- ✅ Local state management
- ✅ Mock member data

**Deferred** (after stable):
- Split 1200-line component into separate files
- Wire Supabase
- Implement real-time updates
- Add photo/video upload
- Implement invite system
