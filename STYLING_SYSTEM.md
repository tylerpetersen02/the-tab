# The Tab — Styling System

## Single Source of Truth

All styling is defined in `tailwind.config.ts`. Use Tailwind color token class names instead of raw hex values.

**Colors (use these class names everywhere):**
- `bg-off-white` / `text-off-white` (#FAFAF8) — page background
- `bg-white` / `text-white` — cards, overlays
- `text-ink` / `border-ink` (#001524) — primary text, borders
- `text-dark-gray` / `border-dark-gray` (#6B7280) — secondary text, muted labels
- `border-medium-gray` (#D1D5DB) — card borders, dividers
- `bg-orange` / `text-orange` (#ff7d00) — primary action, highlights
- `bg-teal` / `text-teal` (#15616d) — secondary action
- `bg-papaya` / `text-papaya` (#ffecd1) — accent backgrounds
- `text-brandy` (#78290f) — special emphasis

## Shared Components (Always Use)

### AppPage
Every page must use `<AppPage>`. Never create `<main>` manually.

```tsx
<AppPage>
  {/* Page content */}
</AppPage>
```

The component provides:
- `min-h-screen bg-off-white text-ink` — page shell
- `max-w-md` — mobile width constraint
- `pb-44` — bottom padding to avoid nav overlap

### AppHeader
Use for all page titles and subtitles.

```tsx
<AppHeader 
  title="Page Title"
  subtitle="Optional subtitle"
/>
```

Styling:
- Title: `text-[30px] font-black italic text-ink`
- Subtitle: `text-[13px] font-semibold text-dark-gray`

### SectionHeader
Use for all section titles (Feed, Tabs, Leaderboard, etc.).

```tsx
<SectionHeader 
  title="Section Title"
  icon={<FlameIcon className="h-4 w-4 fill-orange text-orange" />}
/>
```

Styling:
- Title: `text-[13px] font-black uppercase tracking-[0.08em] text-ink`
- Icon: Lucide only, **no emoji**, use `fill-orange text-orange` for accents

## Card Styles

### Feed Post Card
Large media-first cards.

```tsx
rounded-[28px] border border-medium-gray bg-white shadow-[0_10px_30px_rgba(0,21,36,0.08)]
```

### Tabs Session Card
Compact session management cards.

```tsx
rounded-[24px] border border-medium-gray bg-white shadow-[0_5px_18px_rgba(0,21,36,0.04)]
```

### Leaderboard Card
Ranking/scoreboard cards.

```tsx
rounded-[28px] border border-medium-gray bg-white shadow-[0_8px_26px_rgba(0,21,36,0.06)]
```

## Action Buttons

### Primary Action
Main call-to-action.

```tsx
bg-orange text-white rounded-2xl font-black
```

### Secondary Action
Alternative action.

```tsx
bg-teal text-white rounded-2xl font-black
```

### Ghost/Muted Action
Low-emphasis action.

```tsx
bg-teal/10 text-teal border border-teal/15 rounded-full font-black
```

## Pills & Toggles

**Active state:** Use `bg-orange` for ranking mode, `bg-teal` for filters/scope  
**Inactive state:** `bg-white border border-medium-gray text-ink`

## Typography

- **Page title:** `text-[30px] font-black italic text-ink`
- **Card title:** `text-lg` or `text-xl font-black text-ink`
- **Body text:** `text-sm font-semibold text-dark-gray`
- **Meta/secondary:** `text-xs font-semibold text-dark-gray`
- **Tiny label:** `text-[10px] font-black uppercase tracking-wide text-dark-gray`

## Do Not Use

❌ Raw hex values: `#FAFAF8`, `#001524`, `#D4D0CC`, `#ff7d00`, `#15616d`  
❌ Emoji in section titles or core UI  
❌ Custom color names not in `tailwind.config.ts`  
❌ Page-level `<main>` tags (use `<AppPage>`)  
❌ Manual header styling (use `<AppHeader>`)  

Exception: Gradients and special effects may use raw hex if necessary, but try token names first.

## Page-Specific Rules

### Feed
- Media-first layout, large rounded images
- Cards support multiple post types (beer, bonus, badge, recap, session started)
- Use full width of max-w-md container

### Tabs
- Compact cards, less whitespace than Feed
- Session management focus (join, create, filter)
- Shorter cards than Feed

### Leaderboard
- Ranking cards with metadata, no media
- Segmented mode control (Score/Beers/Verified/Bonus)
- Time filter pills
- Top 3 podium with special styling

### Receipts
- Stats cards in grid layout
- Badge progress cards
- Summary/recap focused

## Consistency Rules

✓ All pages: max-w-md width, pb-44 bottom padding  
✓ All headers: use AppHeader  
✓ All sections: use SectionHeader  
✓ All cards: use token-based shadow + border-medium-gray  
✓ All text: use color tokens not raw hex  
✓ All icons: Lucide only, no emoji in UI  
✓ All actions: use primary/secondary/ghost patterns  

Design tokens + shared components = no drift.
