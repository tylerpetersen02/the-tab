# Page Purposes & User Flows

## Overview

Each page in The Tab has a distinct purpose and user flow. This document describes what each page does, who uses it, when they use it, and what actions are available.

---

## Main Pages (Bottom Navigation)

### 1. Feed (`/feed`)
**Purpose**: Social content feed showing live updates and activity from open tabs and friends.

**When to use**:
- Check what friends are doing
- See social activity (new tabs, drinks added, badges earned)
- Discover live sessions to join

**Primary Content**:
- **Live Session Carousel** — Tabs currently active, large cards with live badge, cover image
- **Feed Posts** — Activity stream below:
  - Drink added (user + drink type)
  - Bonus drink added (shots, cocktails)
  - Tab opened (new session started)
  - Badge earned (achievements)
  - Recap posted (tab closed, summary)
- **Time Indicators** — Relative timestamps ("2 minutes ago")

**Actions**:
- Tap live session → opens tab detail
- Tap post → might navigate to tab/user profile
- Toggle filters (future: "This Week" / "All Time", "My Drinks" / "Friend Activity")

**Visual Design**:
- `AppPage` wrapper
- `AppHeader` with "Feed" title + notification bell
- Large live session cards (carousel-style)
- Feed post cards (feed variant shadow)
- `PageSection` for rhythm

---

### 2. Tabs (`/tabs`)
**Purpose**: Browse all tabs—current, upcoming, and history. Manage tabs you're in.

**When to use**:
- Quick access to your open tab
- See recently closed tabs (recaps, history)
- Find a past tab to remind yourself what happened
- Manage multiple tabs (if applicable)

**Primary Content**:
- **Header** — "Tabs" title, search/filter
- **Sections**:
  - **Current** — Tab you're actively in (if any)
    - Shows as card with hero (title, elapsed time, member count, ounces)
    - "View" button to open tab detail
    - "Leave" action (short menu)
  - **Recent** — Closed tabs with dates
    - Each as card with tab name, dates, final stats
    - Tap to view recap/history
- **Empty State** — "No open tabs" if none

**Actions**:
- Tap tab → view detail/recap
- Swipe/menu → Leave, Close (for current)
- Search/filter tabs by name/date
- Navigation strip or segmented control: "Current", "Recent", "All"

**Visual Design**:
- `AppPage` wrapper
- `AppHeader`
- Segmented control for filtering
- Tab cards (tsCard variant shadow)
- `PageSection` for rhythm

---

### 3. Add Drink / Current Tab Hub (`/add-drink`)
**Purpose**: The live session command center. If no tab exists, shows gate (create/join). If tab exists, shows current tab dashboard as default, with "Add Drink" as a sub-flow.

**When to use**:
- Primary interaction during a tab (default screen once tab exists)
- Add drinks to the tab
- See live team progress
- Manage tab (invite, leave, close)

**Screens/States**:
1. **Gate** (no active tab)
   - "Start Tab" button → create_tab
   - "Join with Code" button → join_tab

2. **Create Tab Flow**
   - Form: Tab Name, Location (optional), Visibility (Private/Invite Only/Open), Ounce Goal (optional)
   - Submit → creates activeTab, moves to current_tab

3. **Join Tab Flow**
   - Form: Join Code input
   - Submit → fetches tab data, creates activeTab, moves to current_tab

4. **Current Tab** (default screen once tab exists)
   - **Hero Card** — Title, location, elapsed time, live badge, cover image (optional)
   - **Goal Progress** — If ounce goal set, show bar/stat
   - **Your Contribution** — Card showing: beers (count), oz (amount), pint score (2.0)
   - **Members List** — Cards showing each member: avatar, name, oz, beers, pint score
   - **Drink Breakdown** — Chart/grid of drink types and counts (beer, wine, cider, seltzer, shots, cocktails)
   - **Recent Activity** — Timeline of tab events (last 5–10)
   - **Add Drink Button** — Primary CTA → add_drink
   - **Action Tiles**:
     - Invite (copy code or share)
     - Join Code (show/copy code)
     - Leave Tab
     - Close Tab

5. **Add Drink Flow**
   - Form: Drink Type (dropdown: beer, cider, wine, seltzer, other, shot, cocktail)
   - If "other" selected: also input custom oz amount
   - Submit → updates local state, returns to current_tab
   - Shows confirmation/toast

**Visual Design**:
- Page wrapped in `AppPage`
- Header with "+" or context
- Multiple sections using `PageSection` + `CardShell`
- Hero with gradient background
- Stats displayed with `AppText` variants (statValue, statLabel)
- Buttons using `AppButton` (primary for "Add Drink", secondary/ghost for actions)
- Members in list or avatar stack
- Drink breakdown as small stats or bar chart

---

### 4. Leaderboard (`/leaderboard`)
**Purpose**: Competitive ranking—see who's consuming the most and earning the highest pint scores.

**When to use**:
- Check who's winning (most oz, most beers, highest pint score)
- See your rank among friends
- Friendly competition motivation

**Primary Content**:
- **Header** — "Leaderboard" title, toggle ("This Week" / "All Time")
- **Top 3 Podium** — Visual podium with top 3 users:
  - 1st place (gold, centered, larger)
  - 2nd place (silver, left, medium)
  - 3rd place (bronze, right, medium)
  - Each shows avatar, name, pint score, medal icon
- **Ranking List** — Users 4–N with:
  - Rank # (4, 5, 6...)
  - Avatar + name
  - Pint score (large stat)
  - Oz (secondary stat)
  - Trend indicator (↑ up, ↓ down, — no change from last week)
- **Highlights** — Small stats at bottom (optional):
  - "Most Beers: Mike (18)"
  - "Weekend King: Dan"

**Actions**:
- Tap user → view user profile (future)
- Toggle time period (This Week / All Time)
- Scroll list

**Visual Design**:
- `AppPage` wrapper
- `AppHeader`
- Segmented control for time toggles
- Podium: 3 cards arranged visually
- List: each rank row as subtle card or list item
- `PageSection` for rhythm
- Use stat colors (orange for top, teal for secondary)

---

## Secondary Pages (Not in Bottom Nav)

### Profile (`/profile`) — Future
User profile, stats, badges, history. Not yet designed.

### Buddies (`/buddies`) — Future
Friend list, quick access. Not yet designed.

### Receipts (`/receipts`) — Future
Recaps, stats, badges, memories. Not yet designed.

### Seed (`/seed`) — Internal
Development/testing page to reset mock data. Not user-facing.

---

## Navigation Flow

### Tab Navigation (Bottom Nav)
Visible on all main pages:
- Feed icon (home-like)
- Tabs icon (list)
- + icon (Add Drink / Current Tab Hub) — highlighted when active
- Leaderboard icon (chart)
- Profile icon (person) — greyed for now

### In-Page Navigation
- Back buttons on detail screens (if applicable)
- Header with title + actions (notification bell, profile icon)
- Internal buttons navigate between states (e.g., "Start Tab", "Join Code", "Add Drink")

### Deep Linking
- `/feed` — Show social feed
- `/tabs` — Browse tabs
- `/add-drink` — Current hub (gate, create, join, current tab, add drink flow)
- `/leaderboard` — Rankings
- `/profile` — User profile (future)

---

## Key UX Principles (All Pages)

1. **Single Task Focus** — Each page clear about primary action
2. **One Column, Mobile-First** — Max width 768px, mobile as default
3. **Bottom Nav Always Visible** — Easy page switching
4. **Consistent Header** — Each page has title + app chrome
5. **Consistent Spacing** — Use `PageSection` for rhythm
6. **Time Awareness** — Show relative timestamps ("2m ago", "5d ago")
7. **Contextual Actions** — Actions relevant to current state/tab
8. **Empty States** — Clear messaging when no content
9. **Loading States** — Skeleton or spinner during async operations (future)
10. **Conversational** — Copy is warm, fun, bar-themed

---

## Related Documentation

See:
- **PRODUCT_LANGUAGE.md** — Terminology consistency
- **TAB_SYSTEM.md** — Tab states and transitions
- **CURRENT_ARCHITECTURE.md** — Component file locations
