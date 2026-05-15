# Current Architecture

## Overview

This document describes the current codebase organization, patterns, and architectural decisions.

---

## Directory Structure

```
the-tab/
├── app/
│   ├── layout.tsx              Root layout with BottomNav (always visible)
│   ├── page.tsx                Redirects to /feed
│   ├── globals.css             Tailwind v4 config + CSS variables
│   ├── add-drink/
│   │   └── page.tsx            Current Tab Hub (gate, create, join, current, add)
│   ├── feed/
│   │   └── page.tsx            Social feed page
│   ├── tabs/
│   │   └── page.tsx            Tab list page
│   ├── leaderboard/
│   │   └── page.tsx            Leaderboard/ranking page
│   ├── profile/
│   │   └── page.tsx            User profile (stub)
│   ├── buddies/
│   │   └── page.tsx            Friend list (stub)
│   ├── receipts/
│   │   └── page.tsx            Recaps/stats (stub)
│   └── seed/
│       └── page.tsx            Internal testing page
│
├── components/
│   ├── common/                 Design system components (always use these)
│   │   ├── AppPage.tsx         Page wrapper with max-width + padding
│   │   ├── AppHeader.tsx       Header with title + icons
│   │   ├── AppText.tsx         Typography component (14 variants)
│   │   ├── AppButton.tsx       Button component (6 variants, 4 sizes)
│   │   ├── CardShell.tsx       Card container (4 variants)
│   │   ├── PageSection.tsx     Section wrapper for rhythm
│   │   ├── UserAvatar.tsx      User avatar (initials)
│   │   ├── AvatarStack.tsx     Multiple avatars stacked
│   │   ├── BackButton.tsx      Back navigation button
│   │   ├── StatusBadge.tsx     Status indicator ("Live", "Closed")
│   │   ├── InfoPill.tsx        Badge/chip component
│   │   ├── IconCircle.tsx      Icon in circular background
│   │   ├── SectionHeader.tsx   Section title helper
│   │   ├── SegmentedControl.tsx Segmented control/tabs
│   │   ├── FilterPills.tsx     Filter button group
│   │   ├── ReactionBar.tsx     Reaction buttons (emoji/sentiment)
│   │   ├── SessionChip.tsx     Compact session indicator
│   │   ├── StatCard.tsx        Stat display card
│   │   └── index.ts            Re-exports all common components
│   │
│   ├── layout/
│   │   ├── BottomNav.tsx       Navigation tabs (Feed, Tabs, +, Leaderboard, Profile)
│   │   ├── Page.tsx            Layout wrapper
│   │   └── SafeAreaWrapper.tsx  Safe area padding for notches
│   │
│   ├── feed/                   Feed-specific components
│   │   ├── LiveSessionCarousel.tsx
│   │   ├── FeedPostList.tsx
│   │   ├── DrinkFeedPost.tsx
│   │   ├── BonusDrinkFeedPost.tsx
│   │   ├── RecapFeedPost.tsx
│   │   ├── BadgeFeedPost.tsx
│   │   ├── SessionStartedFeedPost.tsx
│   │   ├── LiveSessionBubble.tsx
│   │   ├── FeedToggle.tsx
│   │   ├── FeedHeader.tsx
│   │   └── types.ts
│   │
│   ├── tabs/                   Tabs page-specific components
│   │   ├── TabListCard.tsx
│   │   ├── TabsEmptyState.tsx
│   │   ├── TabsHeader.tsx
│   │   ├── TabsSearch.tsx
│   │   ├── TabsSection.tsx
│   │   ├── TabsLoadingSkeleton.tsx
│   │   ├── TabsQuickActions.tsx
│   │   ├── CreateTabSheet.tsx
│   │   └── JoinCodeSheet.tsx
│   │
│   ├── leaderboard/            Leaderboard page-specific components
│   │   ├── TopThreePodium.tsx
│   │   ├── PodiumUser.tsx
│   │   ├── LeaderboardRankList.tsx
│   │   ├── LeaderboardRankRow.tsx
│   │   ├── LeaderboardHighlights.tsx
│   │   ├── TrendIndicator.tsx
│   │   └── types.ts
│   │
│   └── ui/                     shadcn/ui primitives (rarely used directly)
│       ├── Badge.tsx
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Dropdown-menu.tsx
│       └── Input.tsx
│
├── lib/
│   ├── design-tokens.ts        Colors, shadows, radius, sizing, spacing, typography
│   ├── gradients.ts            Preset gradient classes
│   ├── inputStyles.ts          Input/select/textarea base styles
│   ├── shadows.ts              Shadow definitions
│   ├── spacing.ts              Spacing scale
│   ├── design.ts               Additional design utilities
│   └── utils.ts                `cn()` utility (clsx + tailwind-merge)
│
├── supabase/                   Supabase configuration (not yet wired)
├── types/                      Global type definitions (if any)
│
├── public/                     Static assets (logos, icons)
├── node_modules/               Dependencies
├── package.json                Dependencies, scripts, Next.js version
├── tsconfig.json               TypeScript configuration
├── tailwind.config.ts          Tailwind v4 custom theme
├── postcss.config.mjs          PostCSS plugins (Tailwind)
├── next.config.ts              Next.js configuration
├── components.json             shadcn CLI configuration
├── CLAUDE.md                   Current Tab Hub feature specification
├── AGENTS.md                   Next.js agent rules
└── docs/                       Project documentation (NEW)
    ├── DESIGN_SYSTEM.md
    ├── PRODUCT_LANGUAGE.md
    ├── PAGE_PURPOSES.md
    ├── TAB_SYSTEM.md
    ├── DRINK_TRACKING_RULES.md
    ├── AI_IMPLEMENTATION_RULES.md
    ├── CURRENT_ARCHITECTURE.md (this file)
    ├── TECH_DEBT.md
    └── ROADMAP.md
```

---

## Component Hierarchy

### Page Level (Next.js Page Components)

```
app/{page}/page.tsx
  └── AppPage (wrapper)
      ├── AppHeader (title, icons)
      └── PageSection (rhythm wrapper)
          └── CardShell (card containers)
              └── Common components (Button, Text, Avatar, etc.)
```

### Layout

```
app/layout.tsx
  ├── Providers (Suspense boundaries, future: auth context)
  ├── SafeAreaWrapper (notch awareness)
  ├── #__next (Next.js app mount)
  │   └── AppPage
  │       └── Page content
  └── BottomNav (sticky at bottom)
```

### BottomNav Pages

- Feed (`/feed`)
- Tabs (`/tabs`)
- Add/+ Hub (`/add-drink`) ← current active
- Leaderboard (`/leaderboard`)
- Profile (`/profile`) [disabled/stub]

---

## Design Tokens System

### Color Tokens (Tailwind Classes)

Used via Tailwind utility classes:
```tsx
className="text-ink bg-orange border border-teal"
// Defined in app/globals.css @theme block
```

### Token Exports (JS)

Exported from `lib/design-tokens.ts`:
```typescript
export const colors = {
  background: "#FAFAF8",
  card: "#FFFFFF",
  ink: "#001524",
  // ... etc
};
```

### Usage Pattern

**In Components**:
```tsx
// ✅ Use Tailwind classes directly
<AppButton className="bg-orange text-white">
```

**In Styles**:
```tsx
// For shadow presets, gradients, complex values
import { shadows, gradients } from "@/lib/design-tokens";
className={shadows.feedCard}
```

---

## State Management Pattern (Current)

### Local Component State (Add-Drink Page)

```typescript
const [screen, setScreen] = useState<Screen>("gate");
const [activeTab, setActiveTab] = useState<ActiveTab | null>(null);
const [formData, setFormData] = useState({ /* form fields */ });
```

### Flow

```
Gate
  ├─ "Start Tab" → create_tab
  │   ├─ Form: name, location, visibility, goal
  │   └─ Submit → setActiveTab({ ... }) + setScreen("current_tab")
  │
  └─ "Join Code" → join_tab
      ├─ Form: join code input
      └─ Submit → setActiveTab({ ... }) + setScreen("current_tab")

Current Tab
  ├─ "Add Drink" → add_drink
  │   ├─ Form: drink type, or oz (if other)
  │   └─ Submit → updateActiveTab() + setScreen("current_tab")
  │
  ├─ "Leave Tab" → setActiveTab(null) + setScreen("gate")
  └─ "Close Tab" → setActiveTab(null) + setScreen("gate")
```

### Important Notes

- **No global state manager** (Redux, Zupabase) yet
- **No persistent storage** (localStorage, Supabase) yet
- **Local only**: Resets on page refresh
- **Mock data**: `defaultMembers` array used for seeding
- **State updates**: Mostly in event handlers, not effects

---

## Typing System

### Global Types

**Add-Drink Page** (`app/add-drink/page.tsx`):
```typescript
type Screen = "gate" | "create_tab" | "join_tab" | "current_tab" | "add_drink";
type Visibility = "private" | "invite_only" | "open";
type DrinkType = "beer" | "shot" | "cocktail" | "wine" | "seltzer";
type Member = { id, name, initials, contributionOz, beers, bonusDrinks, ... };
type ActiveTab = { id, title, visibility, location?, joinCode, ... };
type ActivityItem = { id, type, user, detail, time };
```

**Component Props**: Each component has interface (component name + "Props")
```typescript
interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AppButtonVariant;
  size?: AppButtonSize;
  fullWidth?: boolean;
}
```

### Variant Types

**Text Variants** (AppText):
```typescript
type AppTextVariant =
  | "brand" | "pageTitle" | "pageSubtitle" | "sectionLabel" | "cardTitle"
  | "body" | "bodySmall" | "meta" | "tinyLabel" | "statValue" | "statLabel";
```

**Button Variants** (AppButton):
```typescript
type AppButtonVariant = "primary" | "secondary" | "outline" | "muted" | "ghost" | "danger";
type AppButtonSize = "sm" | "md" | "lg" | "icon";
```

**Card Variants** (CardShell):
```typescript
type CardVariant = "default" | "feed" | "compact" | "score";
```

---

## Styling Approach

### CSS Method

- **Tailwind v4** with CSS variables
- **@theme block** in globals.css for custom colors
- **Preset gradients** in lib/gradients.ts
- **No CSS modules** (all classes)
- **No styled-components** or CSS-in-JS

### Spacing & Rhythm

- **Mobile-first**: Single column, max-w-md
- **Padding**: 16px sides (safe area aware)
- **Gaps**: 24px between sections (PageSection component)
- **No arbitrary values** in component code (use design tokens)

### Responsive Design

```
Mobile: max-w-md (default)
Tablet: md breakpoint (768px) – not currently used in app
Desktop: md breakpoint – used for max-width only
```

### Shadow Elevation

- **Feed cards**: Strongest shadow (0 10px 30px rgba(0,21,36,0.08))
- **Tab cards**: Strong shadow (0 6px 18px rgba(0,21,36,0.05))
- **Button**: Subtle shadow (shadow-sm)
- **Icon**: Very subtle (0 4px 14px rgba(0,21,36,0.04))

---

## Build & Runtime

### Next.js Version

- **Next.js 16.2.6** (latest as of knowledge cutoff)
- **React 19** (latest)
- **Tailwind v4** (latest)

### Build Command

```bash
npm run build
npm start
npm run dev
```

### Development Features

- **Fast Refresh** (hot reload on save)
- **Webpack** (dev server flag: --webpack)
- **TypeScript**: Strict mode enabled
- **ESLint**: Configured (if applicable)

### Environment

- **Default origin**: `0.0.0.0` (dev server)
- **Safe area**: CSS env() for notches/safe areas
- **Font**: Nunito Sans (Google Fonts, variable)

---

## Future: Supabase Integration Points

### Where Supabase Fits In

**Not yet implemented**, but planned:
- `supabase/` directory exists (config)
- Will replace local state with Supabase tables
- Real-time subscriptions for live updates
- Row-level security (RLS) for permissions

### Tables (Planned)

```
Schema: public
├── tabs (id, title, location, visibility, joinCode, ...)
├── tab_members (id, tabId, userId, joinedAt, leftAt)
├── drinks (id, tabId, userId, drinkType, oz, createdAt)
├── activities (id, tabId, userId, type, detail, createdAt)
└── users (id, name, email, ...)
```

### Migration Path

1. Keep local state working
2. Add Supabase client (next-auth? Supabase auth?)
3. Replace useState with useQuery/useMutation
4. Add real-time subscriptions
5. Remove mock data, use server data

---

## Testing Strategy (Not Yet Implemented)

### Planned

- Unit tests: Component rendering, prop validation
- Integration tests: Form submission, state changes, navigation
- E2E tests: Full user flows (open tab → add drink → close tab)

### Tools (When Implemented)

- [vitest] or Jest (unit)
- [React Testing Library] (component)
- [Playwright] or Cypress (e2E)

---

## Known Limitations (Current)

1. **No real-time sync** — Everything is local
2. **No auth** — No user login (future)
3. **No Supabase** — Config exists, integration pending
4. **No localStorage** — Data lost on refresh
5. **No mobile-specific optimization** — Responsive but not optimized for gestures
6. **Add-Drink page monolithic** — 1195 lines, needs splitting (planned in refactor)
7. **Mock data hardcoded** — defaultMembers array baked in
8. **No image uploads** — Cover images UI exists but not functional

---

## Deployment

### Current

- Vercel (assumed, standard Next.js host)
- Environment: Preview (PR), Production (main branch)

### Env Variables (Needed for Supabase Integration)

```
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

---

## Related Documentation

See:
- **DESIGN_SYSTEM.md** — Components and styling rules
- **AI_IMPLEMENTATION_RULES.md** — Code quality rules
- **TECH_DEBT.md** — Known violations and improvements needed
- **ROADMAP.md** — Future work and migration plans
