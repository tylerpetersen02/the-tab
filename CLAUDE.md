# Add Drink Flow: Current Tab Hub

## Overview

The `+ / Add Drink` tab should NOT always be the Add Drink form.

It is the **Current Tab Hub** — the live session command center. The flow behavior:

**Screen states:**
1. `gate` — No active tab
2. `create_tab` — Create new tab form
3. `join_tab` — Join existing tab with code
4. `current_tab` — Live tab dashboard (default once tab exists)
5. `add_drink` — Add drink form (sub-flow)

## Flow Logic

- If no active tab exists, show **gate screen**.
- Gate screen has:
  - "Start Tab" button → `create_tab`
  - "Join with Code" button → `join_tab`
- Creating or joining a tab creates a local `activeTab` object and moves to `current_tab`.
- `current_tab` is the default screen once a tab exists.
- `current_tab` shows live tab dashboard with:
  - Hero card (title, location, elapsed time, live badge)
  - Ounce goal progress (if set)
  - Your contribution (beers, oz, pint score)
  - Members list
  - Drink breakdown
  - Recent activity
  - "Add Drink" button → `add_drink`
  - Action tiles (Invite, Join Code, Leave Tab, End Tab)
- Posting a drink updates local mock state and returns to `current_tab`.
- Leaving a tab marks the current user as left but does not erase their progress.

## Implementation Requirements

- **State:** Local state only. Do not wire Supabase yet.
- **Mock Data:** Use `defaultMembers` array (Tyler, Mike, Dan, Ryan).
- **Design System:** Use existing components:
  - `AppPage`
  - `AppHeader`
  - `PageSection`
  - `CardShell`
  - `AppText`
  - `AppButton`
  - `InfoPill`
  - `StatusBadge`
  - `UserAvatar`
  - `AvatarStack` (if available)
  - `BackButton` (if available)
- **Styling:** Match Feed/Tabs/Leaderboard aesthetic. Use Tailwind tokens, shadows, gradients.

## Key Types

```typescript
type Screen = "gate" | "create_tab" | "join_tab" | "current_tab" | "add_drink";
type Visibility = "private" | "invite_only" | "open";
type DrinkType = "beer" | "cider" | "seltzer" | "wine" | "other";
type BonusType = "shot" | "cocktail";

type Member = {
  id: string;
  name: string;
  initials: string;
  contributionOz: number;
  beers: number;
  bonusDrinks: number;
  isCurrentUser?: boolean;
  leftAt?: string | null;
};

type ActivityItem = {
  id: string;
  type: "drink" | "bonus" | "join" | "leave";
  user: string;
  detail: string;
  time: string;
};

type ActiveTab = {
  id: string;
  title: string;
  visibility: Visibility;
  location?: string;
  joinCode: string;
  startedAtLabel: string;
  elapsed: string;
  ounceGoal?: number;
  currentOz: number;
  beers: number;
  wine: number;
  cider: number;
  seltzer: number;
  other: number;
  shots: number;
  cocktails: number;
  members: Member[];
  activities: ActivityItem[];
};
```

## Deferred Work

After this works locally, split these internal components into separate files:
- `SubFlowHeader`
- `Field`
- `ChoiceButton`
- `CurrentTabHero`
- `GoalProgress`
- `YourContribution`
- `MembersCard`
- `DrinkBreakdown`
- `RecentActivity`
- `MiniStat`
- `ActionTile`

**Do not split first. Get the flow working first.**

---

See `app/add-drink/page.tsx` for the current implementation.

@AGENTS.md
