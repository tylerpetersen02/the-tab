# Design System

## Overview

The Tab uses a cohesive, premium design system built on Tailwind v4 with a custom color palette, typography system, and reusable components. All UI should use design system components and tokens—no raw hex values or custom styles in component code.

---

## Color Palette

### Primary Colors
- **Orange** `#ff7d00` — Primary action, CTAs, highlights
- **Teal** `#15616d` — Secondary action, focus states, navigation

### Neutral Colors
- **Off-white** `#FAFAF8` — Page background, muted surfaces
- **White** `#FFFFFF` — Card backgrounds, input fields
- **Light Gray** `#F3F4F6` — Subtle dividers, inactive states
- **Medium Gray** `#D4D0CC` — Borders, input borders
- **Dark Gray** `#8B8680` — Secondary text, metadata
- **Ink** `#001524` — Primary text, headings
- **Black** `#0A0A0A` — Strong contrast (rare)

### Special Colors
- **Papaya** `#ffecd1` — Accent, badges, highlights
- **Brandy** `#78290f` — Dark/moody accents
- **Chart Colors** — Teal, papaya, light teal, sky blue (for data viz)

### Usage Rules
- **Never use raw hex values in component code** — Use Tailwind color tokens (e.g., `text-ink`, `bg-orange`)
- **Text colors**: Use `text-ink` (primary), `text-dark-gray` (secondary), `text-medium-gray` (tertiary)
- **Background colors**: Use `bg-off-white` (page), `bg-white` (cards), `bg-orange` (primary action)
- **Border colors**: Use `border-medium-gray` (default), `border-teal` (focus)

---

## Typography System

### Font
- **Family**: Nunito Sans (with system fallback)
- **Variable font**: Supports weights 200–1000 and optical sizing
- **Letter spacing**: `-0.01em` baseline (optimized for readability)

### Text Variants (AppText component)

| Variant | Size | Weight | Usage |
|---------|------|--------|-------|
| `brand` | 34px | Black (900) | Logo mark, hero statement |
| `pageTitle` | 28px | Black (900) | Page headings (Feed, Tabs, Leaderboard) |
| `pageSubtitle` | 13px | Semibold | Subtitle below page title |
| `sectionLabel` | 13px | Black (900) | Section headers, uppercase |
| `cardTitle` | 18px | Black (900) | Card/section headings |
| `body` | 14px | Semibold | Prose, description text, form labels |
| `bodySmall` | 12px | Semibold | Button text, compact descriptions |
| `meta` | 12px | Semibold | Timestamp, metadata, secondary info |
| `tinyLabel` | 10px | Black (900) | Badge labels, tiny text, uppercase |
| `statValue` | 24px | Black (900) | Large stat numbers |
| `statLabel` | 10px | Black (900) | Stat label below number, uppercase |

### Usage Rules
- **Always use `AppText` component** — Never use raw Tailwind text classes (e.g., `text-lg font-bold`)
- **Choose variant semantically** — Don't combine variants; use appropriate variant for context
- **Respect text color defaults** — Most variants include `text-ink`; override only when needed

---

## Component System

### Core Components (Always Use)

#### **AppText**
Typography component for all text content.
```tsx
<AppText variant="pageTitle">Page Title</AppText>
<AppText variant="body">Body copy</AppText>
<AppText variant="meta">Timestamp</AppText>
```

#### **AppButton**
Button component with 6 variants and 4 sizes.

**Variants:**
- `primary` — Orange button (main CTAs)
- `secondary` — Teal button (secondary action)
- `outline` — White with border (tertiary)
- `muted` — Off-white (low priority)
- `ghost` — Transparent (icon buttons, minimal)
- `danger` — Red (destructive actions, rarely used)

**Sizes:**
- `sm` — 36px height, small text
- `md` — 44px height, small text (default)
- `lg` — 56px height, card title text
- `icon` — 40px square (icon-only buttons)

**Properties:**
- `fullWidth` — Stretches to container width
- `disabled` — Reduces opacity, prevents interaction

```tsx
<AppButton primary >Main Action</AppButton>
<AppButton variant="secondary" size="lg" fullWidth>Secondary Large</AppButton>
<AppButton variant="ghost" size="icon"><Icon /></AppButton>
```

#### **CardShell**
Card/container component with consistent styling and shadow.

**Variants:**
- `default` — Standard card (28px radius)
- `feed` — Stronger shadow (for feed posts)
- `compact` — Smaller radius (24px)
- `score` — Score display cards

```tsx
<CardShell>Card content</CardShell>
<CardShell variant="feed">Feed post</CardShell>
```

#### **AppPage**
Page wrapper with consistent max-width, padding, and bottom nav spacing.
```tsx
<AppPage>Page content</AppPage>
```

#### **AppHeader**
Header component with title, notification bell, profile icon.
```tsx
<AppHeader title="Page Title" />
```

#### **PageSection**
Spacing and rhythm wrapper for page sections.
```tsx
<PageSection>Content</PageSection>
```

#### **UserAvatar**
User avatar with initials in circle.
```tsx
<UserAvatar name="Tyler" initials="TP" />
```

#### **AvatarStack**
Multiple avatars in a compressed/overlapping stack.
```tsx
<AvatarStack avatars={members} />
```

#### **StatusBadge**
Status indicator badge ("Live", "Closed", "Verified").
```tsx
<StatusBadge status="live" />
```

#### **InfoPill**
Small badge/chip for metadata ("Private", "Invite Only", etc.).
```tsx
<InfoPill label="Private" icon={Lock} />
```

#### **BackButton**
Navigation back button.
```tsx
<BackButton onClick={() => goBack()} />
```

---

## Layout & Spacing

### Max Width
- **Mobile-first**: Default width 100%, max at `md` breakpoint (768px)
- **Container max**: `max-w-md` (448px) for main content
- **Padding**: 16px on mobile (safe area aware)

### Spacing Scale
```
xs:  2px
sm:  4px
md:  8px
lg:  12px
xl:  16px
2xl: 24px
3xl: 32px
```

### Rhythm
- **Page sections**: 24px gap (use `PageSection`)
- **Card internal padding**: 16px (default), 12px (compact)
- **List items**: 12px gap
- **Form fields**: 12px gap

---

## Shadows

| Name | Usage |
|------|-------|
| `feedCard` | Feed posts and prominent cards |
| `tabsCard` | Tab list items |
| `button` | Button elevation (shadow-sm) |
| `icon` | Icon circle backgrounds |

---

## Border Radius

| Name | Value | Usage |
|------|-------|-------|
| `button` | 16px (small), full (md/lg) | Buttons |
| `card` | 28px | Cards, modals |
| `pill` | 100% | Pills, badges, avatars |
| `media` | 26px | Images, video |

---

## Input Styles

All form inputs use consistent styling (`inputStyles` from lib):
- 16px border radius
- Medium gray border
- White background
- Teal focus state with ring
- Placeholder text is dark gray

```tsx
<input className={inputStyles} placeholder="Input" />
<select className={selectStyles}><option>Select</option></select>
<textarea className={textareaStyles} placeholder="Type..."></textarea>
```

---

## Gradients (Preset Classes)

Use predefined gradient classes from `lib/gradients.ts`:
- `gradient-alpha` — Main dashboard hero
- `gradient-golfBoys` — Teal-to-teal
- `gradient-breweryCrawl` — Complex multi-stop
- And others—check file for all available

```tsx
<div className="bg-gradient-alpha"></div>
```

---

## Design Tokens Export

All design tokens are exported as constants:
- `lib/design-tokens.ts` — Colors, shadows, radius, sizing, spacing, typography
- `lib/inputStyles.ts` — Form input classes
- `lib/gradients.ts` — Gradient presets
- `lib/shadows.ts` — Shadow definitions
- `lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

**Import pattern:**
```tsx
import { colors, shadows, radius } from "@/lib/design-tokens";
import { inputStyles } from "@/lib/inputStyles";
```

---

## Implementation Check

Before submitting code, verify:
- [ ] All text uses `<AppText>` with appropriate variant
- [ ] All buttons use `<AppButton>` with appropriate variant/size
- [ ] All cards use `<CardShell>` with correct variant
- [ ] No raw `class="text-*" or `class="font-*"` in components
- [ ] No raw hex colors (always use Tailwind tokens)
- [ ] All colors reference design tokens (not variables)
- [ ] Form inputs use `inputStyles`, `selectStyles`, or `textareaStyles`
- [ ] Page wrapped in `<AppPage>` with `<AppHeader>`
- [ ] Sections use `<PageSection>` for rhythm
- [ ] Max-width applied at container level
