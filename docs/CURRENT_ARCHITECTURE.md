# Current Architecture

## Project Overview

**The Tab** — Mobile-first web app for tracking group drinking sessions.

- **Framework**: Next.js 16.2.6 (React 19.2.4)
- **Styling**: Tailwind CSS 4
- **UI Library**: Lucide React (icons)
- **State Management**: Local React state (future: Supabase)
- **Database**: None yet (mock data currently)

## Directory Structure

```
app/
├── layout.tsx              # Root layout
├── page.tsx               # Home page
├── feed/page.tsx          # Feed page
├── tabs/page.tsx          # Tabs browser page
├── add-drink/page.tsx     # Current Tab Hub + Add Drink (1200+ lines)
├── leaderboard/page.tsx   # Leaderboard page
├── receipts/page.tsx      # Personal stats page
├── profile/page.tsx       # Profile page (stub)
├── buddies/page.tsx       # Buddies page (stub)
└── seed/page.tsx          # Dev utility

components/
├── common/                # Shared design system
│   ├── AppPage.tsx
│   ├── AppHeader.tsx
│   ├── AppButton.tsx
│   ├── AppText.tsx
│   ├── CardShell.tsx
│   ├── PageSection.tsx
│   ├── InfoPill.tsx
│   ├── StatusBadge.tsx
│   ├── UserAvatar.tsx
│   ├── AvatarStack.tsx
│   ├── BackButton.tsx
│   ├── FilterPills.tsx
│   ├── SegmentedControl.tsx
│   ├── SectionHeader.tsx
│   ├── StatCard.tsx
│   ├── SessionChip.tsx
│   ├── ReactionBar.tsx
│   └── IconCircle.tsx
├── feed/                  # Feed-specific
├── tabs/                  # Tabs-specific
├── leaderboard/          # Leaderboard-specific
├── layout/               # Layout wrappers
└── ui/                   # Radix UI / headless

lib/
├── design-tokens.ts      # Color palette
├── design.ts             # Design tokens (shadows, spacing, etc.)
├── gradients.ts          # Gradient definitions
├── shadows.ts            # Shadow definitions
├── spacing.ts            # Spacing tokens
├── inputStyles.ts        # Form input CSS classes
└── utils.ts              # Utility functions

docs/
├── DESIGN_SYSTEM.md
├── PRODUCT_LANGUAGE.md
├── PAGE_PURPOSES.md
├── TAB_SYSTEM.md
├── DRINK_TRACKING_RULES.md
├── AI_IMPLEMENTATION_RULES.md
├── CURRENT_ARCHITECTURE.md
├── TECH_DEBT.md
└── ROADMAP.md
```

## Design System

**Components** (all in `components/common/`):
- AppPage, AppHeader, PageSection (layout)
- AppText, AppButton, CardShell (core UI)
- InfoPill, StatusBadge, FilterPills, SegmentedControl (info/navigation)
- UserAvatar, AvatarStack (user)
- BackButton, SectionHeader (utility)

**Design Tokens**:
- Colors: via Tailwind (ink, background, orange, teal, etc.)
- Shadows: from `lib/shadows.ts`
- Gradients: from `lib/gradients.ts`
- Spacing: mt-6, mt-4, mt-2, px-4
- Typography: via AppText variants

## State Management

**Current**: Local React state per page (`useState`, `useContext` if needed)
**Future**: Supabase + real-time listeners

Example from `app/add-drink/page.tsx`:
```tsx
const [screen, setScreen] = useState<Screen>("gate");
const [activeTab, setActiveTab] = useState<ActiveTab | null>(null);
```

## Type System

Key types defined in page/component files:
- `Screen` — UI states
- `Tab` / `ActiveTab` — Tab data model
- `Member` — User in a tab
- `ActivityItem` — Feed activity
- `DrinkType` — Drink categories
- `Visibility` — Tab visibility level

**Future**: Move to `lib/types.ts` when DB schema finalized.

## CSS Architecture

- **Tailwind v4** — Custom color palette, custom utilities
- **Global Styles** (`app/globals.css`) — Base resets, custom fonts
- **Component Styles** — All via Tailwind, no CSS modules or styled-components

## Icons

**Library**: Lucide React

```tsx
import { Beer, Plus, X, Check } from "lucide-react";
<Beer className="h-6 w-6 text-orange" />
```

## Performance

- **"use client"** — Client components where needed
- **Server Components** — Default for data fetching (future)
- **Code Splitting** — Automatic via Next.js
- **Image Optimization** — Future (using next/image)

## Development Setup

```bash
npm install
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Start production server
```

## Browser Support

- Modern browsers (Chrome, Safari, Firefox, Edge)
- iOS Safari (primary target)
- Android Chrome
