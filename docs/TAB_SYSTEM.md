# Tab System & State Management

## Overview

The Tab is the core data model in the app. This document describes tab states, lifecycle, permissions, and how data flows through the system.

---

## Tab States

```
┌─────────────────────────────────────────────────┐
│                   TAB STATES                    │
└─────────────────────────────────────────────────┘

OPEN (Live, In Progress)
├── Members can join
├── Members can add drinks
├── Activity is recorded in real-time
└── Can be closed at any time

CLOSED (Archived, Complete)
├── No new drinks can be added
├── No new members can join
├── Visible in history/recaps
├── Data preserved for stats
└── Cannot be reopened (create new tab instead)

JOINED (Member Status: Active)
├── User is actively in the tab
├── Can add drinks
├── Visible in members list
└── Can leave voluntarily

LEFT (Member Status: Inactive)
├── User voluntarily left
├── History and contribution preserved
├── Marked as "Left" in members list
├── Visible in recent activity
└── Cannot re-add drinks to same tab
```

---

## Tab Properties

```typescript
type Tab = {
  id: string;                    // Unique identifier
  title: string;                 // Tab name ("Golf Outing", "Wine Night")
  visibility: Visibility;        // "private" | "invite_only" | "open"
  location?: string;             // Optional location ("The Pub", "Smith's House")
  joinCode: string;              // 4-6 alphanumeric code (if open)
  startedAtLabel: string;        // Human-readable start time ("Today at 3:30 PM")
  startedAt?: timestamp;         // ISO timestamp (future: Supabase)
  elapsed: string;               // Human-readable duration ("2h 15m")
  closedAt?: timestamp;          // When tab was closed (if closed)

  // Goals & Tracking
  ounceGoal?: number;            // Optional target oz (96, 128, etc.)
  currentOz: number;             // Total oz consumed (all members)

  // Drink Counts (aggregated)
  beers: number;
  wine: number;
  cider: number;
  seltzer: number;
  other: number;
  shots: number;                 // Bonus drinks
  cocktails: number;             // Bonus drinks

  // Members & Activity
  members: Member[];             // Array of members
  activities: ActivityItem[];    // Timeline of events

  // UI
  coverImageUrl?: string | null; // Optional cover photo
};
```

---

## Member Properties

```typescript
type Member = {
  id: string;                    // User ID
  name: string;                  // Display name ("Tyler", "Mike")
  initials: string;              // Avatar initials ("TP", "MK")

  // Contribution Tracking
  contributionOz: number;        // Ounces this member consumed
  beers: number;                 // Count of beers
  cider?: number;                // Count of ciders
  wine?: number;                 // Count of wines
  seltzer?: number;              // Count of seltzers
  other?: number;                // Count of other drinks
  bonusDrinks: number;           // Total shots + cocktails

  // Status
  isCurrentUser?: boolean;       // Is this the logged-in user?
  joinedAt?: timestamp;          // When member joined
  leftAt?: string | null;        // Timestamp when left (null if still in)
};
```

---

## Activity Item Properties

```typescript
type ActivityItem = {
  id: string;                    // Unique event ID
  type: ActivityType;            // "drink" | "bonus" | "join" | "leave"
  user: string;                  // User who performed action
  detail: string;                // Drink type or bonus type or action
  time: string;                  // Relative timestamp ("2 minutes ago")
  relativeTime?: timestamp;      // ISO timestamp (for sorting/future)
};
```

---

## Tab Lifecycle

### 1. Creation (Open New Tab)

**User Action**: "Start Tab" button on gate screen

**Flow**:
1. User enters tab name, location (optional), visibility, ounce goal (optional)
2. System creates new Tab object with:
   - Unique ID
   - Current user as first member
   - Empty activities array
   - Join code (generated if visibility is "open")
   - Start time recorded
3. Tab stored in local state (later: Supabase)
4. App navigation → current_tab screen
5. Tab now "live" and visible to friends in Feed

**Initial State**:
```javascript
{
  id: "tab_abc123",
  title: "Brewery Crawl",
  location: "Downtown",
  visibility: "open",
  joinCode: "AB3X9Q",
  startedAtLabel: "Today at 4:30 PM",
  elapsed: "0m",
  ounceGoal: 96,
  currentOz: 0,
  beers: 0, wine: 0, cider: 0, seltzer: 0, other: 0, shots: 0, cocktails: 0,
  members: [{id: "u1", name: "Tyler", initials: "TP", contributionOz: 0, beers: 0, bonusDrinks: 0, isCurrentUser: true}],
  activities: []
}
```

---

### 2. Joining (Add Members)

**User Action**: "Join with Code" on gate screen, or invite link (future)

**Flow**:
1. User enters join code (e.g., "AB3X9Q")
2. System looks up tab by code
3. If found:
   - Add user to tab's members array
   - Set contributionOz, beers, bonusDrinks to 0
   - Create "join" activity
   - Update elapsed time
   - App navigation → current_tab screen
4. If not found: Show error "Code not found"

**Activity Created**:
```javascript
{
  id: "act_456",
  type: "join",
  user: "Mike",
  detail: "",
  time: "1 minute ago"
}
```

---

### 3. Adding Drinks (Tracking Consumption)

**User Action**: "Add Drink" button/flow on current_tab screen

**Flow**:
1. User selects drink type (dropdown: beer, cider, wine, seltzer, other, shot, cocktail)
2. If "other", user enters custom oz amount
3. System:
   - Increments drink count for that type (globally)
   - Increments member's drink count and contributionOz
   - Creates "drink" or "bonus" activity
   - Updates elapsed time
   - Returns to current_tab screen
4. UI updates to show new counts immediately

**Drink Mapping**:
```
Beer    →  12 oz, counts toward pint score
Cider   →  12 oz, counts toward pint score
Wine    →  5 oz, counts toward pint score
Seltzer →  12 oz, counts toward pint score
Other   →  user enters oz, counts toward pint score
Shot    →  1.5 oz, BONUS, does NOT count toward pint
Cocktail→  2 oz, BONUS, does NOT count toward pint
```

**Activity Created**:
```javascript
{
  id: "act_789",
  type: "drink",
  user: "Tyler",
  detail: "beer",
  time: "Just now"
}
// or for bonus:
{
  id: "act_790",
  type: "bonus",
  user: "Dan",
  detail: "shot",
  time: "Just now"
}
```

---

### 4. Leaving (Member Exits)

**User Action**: "Leave Tab" button on current_tab screen

**Flow**:
1. User confirms ("Are you sure?")
2. System:
   - Sets member.leftAt = current timestamp
   - Creates "leave" activity
   - Removes user from activeTab (locally)
   - That user sees gate screen ("No active tab")
   - Other members see user marked as "Left" in members list

**Preservation**:
- Member's drinks and contributions remain in tab history
- Member appears in leaderboard (if querying historical data)
- Tab remains visible in user's history

**Activity Created**:
```javascript
{
  id: "act_991",
  type: "leave",
  user: "Tyler",
  detail: "",
  time: "5 minutes ago"
}
```

---

### 5. Closing (End Tab)

**User Action**: "Close Tab" or "End Tab" button on current_tab screen

**Flow**:
1. User confirms ("Close this tab? It may not be reopened.")
2. System:
   - Sets tab.closedAt = current timestamp
   - Tab status = "closed"
   - Creates "close" or "recap" activity
   - Tab moves from "live" to "history"
   - All members see tab in history/recaps
   - Tab no longer visible in Feed as live session
   - Tab visible in Tabs page under "Recent"

**Final Tab State**:
```javascript
{
  ...tab,
  closedAt: "2024-05-14T22:30:00Z",
  status: "closed"
}
```

---

## Permissions & Access

### Who Can...

| Action | Creator | Member | Non-Member |
|--------|---------|--------|------------|
| Create Tab | ✓ | — | — |
| Join Tab (with code) | ✓ | ✓ | ✓ (if open) |
| Add Drink | ✓ | ✓ | ✗ |
| Leave Tab | ✓ | ✓ | — |
| Close Tab | ✓ | — | — |
| Invite | ✓ | — (future?) | ✗ |
| View Members | ✓ | ✓ | ✗ |

**Current Implementation**:
- Non-functional permissions (all viewed locally)
- Future: Supabase Row-Level Security (RLS) policies

---

## Pint Score Calculation

**Formula**: `Math.floor((contributionOz / 16) * 10) / 10`

**Examples**:
- 16 oz → 1.0 pint
- 24 oz → 1.5 pints
- 32 oz → 2.0 pints
- 40 oz → 2.5 pints
- 15 oz → 0.9 pints (rounded down)

**Bonus drinks excluded**:
- Shots (1.5 oz each) → NOT counted
- Cocktails (2 oz each) → NOT counted

**Display**: Always show 1 decimal (1.0, 2.5, etc.)

---

## Current Implementation (Local State)

### Storage
- In-memory React state (`useState`)
- Key: `activeTab` (null if no active tab)
- Key: `screen` (gate, create_tab, join_tab, current_tab, add_drink)

### Default Mock Members
```javascript
const defaultMembers = [
  { id: "u1", name: "Tyler", initials: "TP", isCurrentUser: true },
  { id: "u2", name: "Mike", initials: "MK" },
  { id: "u3", name: "Dan", initials: "DN" },
  { id: "u4", name: "Ryan", initials: "RY" }
];
```

### Mock State Transitions
```
Gate → Create/Join → Current Tab (with mock members, drinks)
     → Add Drink → Current Tab (updated state)
     → Leave/Close → Gate (local activeTab = null)
```

---

## Future: Supabase Integration

### Tables (Planned)
- `tabs` — Tab data (title, location, visibility, joinCode, createdAt, closedAt)
- `tab_members` — Members in each tab (tabId, userId, joinedAt, leftAt)
- `drinks` — Drinks logged (tabId, userId, drinkType, oz, createdAt)
- `activities` — Activity timeline (tabId, userId, actionType, detail, createdAt)

### Sync Strategy
1. Create tab → Insert into `tabs` + auto-subscribe to changes
2. Join tab → Insert into `tab_members`
3. Add drink → Insert into `drinks`, auto-update `tab.currentOz`
4. Leave tab → Update `tab_members.leftAt`
5. Close tab → Update `tabs.closedAt`

### Real-Time Updates
- Use Supabase subscriptions to listen for changes
- Update UI when other members add drinks, join, leave
- Show live elapsed time, activity feed updates

---

## Related Documentation

See:
- **DRINK_TRACKING_RULES.md** — Drink types and calculations
- **PAGE_PURPOSES.md** — Tab screens and flows
- **PRODUCT_LANGUAGE.md** — "Tab", "Open", "Close" terminology
