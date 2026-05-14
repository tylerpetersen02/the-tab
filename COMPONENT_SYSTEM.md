# The Tab — Unified Component System

## Core Principle

**Same interaction pattern = same component.**  
**Different data = different props.**

Every page uses the same UI primitives. Pages differ in content and purpose, not in how controls/cards/sections look.

---

## Shared Components Library

### Page Structure

#### AppPage
Wraps every page. Provides page shell with max-w-md, bg-off-white, text-ink, pb-44.

```tsx
<AppPage>
  {/* all page content */}
</AppPage>
```

#### AppHeader
All page titles use this. Title (30px italic black), subtitle (13px semibold dark-gray).

```tsx
<AppHeader 
  title="Page Title" 
  subtitle="Optional subtitle"
/>
```

#### PageSection
Wraps every logical section. Provides mt-6 px-4 spacing.

```tsx
<PageSection>
  <SectionHeader title="Section Name" />
  {/* section content */}
</PageSection>
```

---

### Interaction Controls

#### SegmentedControl
Used for mode/view toggles. Example: Pint Score | Beers | Verified | Bonus

```tsx
<SegmentedControl
  options={[
    { label: "Score", value: "pint_score" },
    { label: "Beers", value: "beers" },
    { label: "Verified", value: "verified" },
    { label: "Bonus", value: "bonus" },
  ]}
  value={activeMode}
  onChange={(value) => setActiveMode(value as Mode)}
  variant="primary"  // orange when active
/>
```

Variants:
- `primary`: orange active state (ranking modes, content toggles)
- `secondary`: teal active state (filters, scope toggles)

#### FilterPills
Used for all filter/scope selections. Horizontal scrollable pills.

```tsx
<FilterPills
  options={[
    { label: "All", value: "all" },
    { label: "Live", value: "live" },
    { label: "Recent", value: "recent" },
    { label: "Mine", value: "mine" },
    { label: "Archived", value: "archived" },
  ]}
  value={activeFilter}
  onChange={(value) => setActiveFilter(value as FilterType)}
  variant="secondary"
/>
```

Both variants use teal when active, white when inactive.

---

### Content Cards

#### CardShell
Wrapper for all card content. Variants define shadow/radius for different card types.

```tsx
<CardShell variant="feed">
  {/* Feed post card content */}
</CardShell>
```

Variants:
- `default`: `rounded-[28px] shadow-[0_8px_26px_...]` — standard cards
- `feed`: `rounded-[28px] shadow-[0_10px_30px_...]` — media-heavy feed posts (larger shadow)
- `compact`: `rounded-[24px] shadow-[0_5px_18px_...]` — session management cards (smaller)
- `score`: `rounded-[28px] shadow-[0_8px_26px_...]` — ranking/stat cards

All use `border border-medium-gray bg-white`.

#### StatCard
Pre-built stat display (label, value, detail).

```tsx
<StatCard
  label="This Week"
  value="117.3 Pint Score"
  detail="6 buddies ranked · 124 beers logged"
/>
```

---

### Information Display

#### SectionHeader
Headings for logical sections. Small caps, dark-gray, optional icon.

```tsx
<SectionHeader 
  title="Live Now"
  icon={<Flame className="h-4 w-4 fill-orange text-orange" />}
/>
```

#### UserAvatar
Circular avatar with initials. Sizes: sm (h-8 w-8), md (h-10 w-10).

```tsx
<UserAvatar name="Tyler" initials="TP" size="md" />
```

#### StatusBadge
Small badge for status indicators (LIVE, etc).

```tsx
<StatusBadge 
  label="LIVE"
  variant="live"
  icon={<Zap className="h-3 w-3" />}
/>
```

Variants:
- `live`: orange background
- `default`: light gray background

#### InfoPill
Metadata pill. Tones: default (gray), teal, orange.

```tsx
<InfoPill label="Verified" tone="teal" />
```

---

## Page Structure Examples

### Leaderboard
```tsx
<AppPage>
  <AppHeader title="Leaderboard" subtitle="Who's on top?" />
  
  <PageSection>
    <SegmentedControl options={modes} value={mode} onChange={setMode} />
  </PageSection>
  
  <PageSection>
    <FilterPills options={times} value={time} onChange={setTime} />
  </PageSection>
  
  <PageSection>
    <StatCard label="This Week" value="117.3" detail="..." />
  </PageSection>
  
  <PageSection>
    <TopThreePodium users={top3} />
  </PageSection>
  
  <PageSection>
    <LeaderboardRankList users={all} mode={mode} />
  </PageSection>
</AppPage>
```

### Tabs
```tsx
<AppPage>
  <AppHeader title="The Tab" subtitle="Manage your sessions." />
  
  <PageSection>
    <TabsQuickActions />
  </PageSection>
  
  <PageSection>
    <TabsSearch />
  </PageSection>
  
  <PageSection>
    <FilterPills options={filters} value={filter} onChange={setFilter} />
  </PageSection>
  
  {liveTabs.length > 0 && (
    <PageSection>
      <SectionHeader title="Live Now" icon={...} />
      <div className="mt-3 space-y-2">
        {liveTabs.map(tab => <TabListCard ... />)}
      </div>
    </PageSection>
  )}
</AppPage>
```

---

## Consistency Checklist

- [ ] All pages use `<AppPage>`
- [ ] All page titles use `<AppHeader>`
- [ ] All sections use `<PageSection>`
- [ ] All section titles use `<SectionHeader>`
- [ ] All filter rows use `<FilterPills>`
- [ ] All mode/view toggles use `<SegmentedControl>`
- [ ] All cards use `<CardShell variant="..." />`
- [ ] All color classes use design tokens (not raw hex)
- [ ] All icons are Lucide, not emoji
- [ ] No page-specific styled versions of shared components

---

## Do Not Create

❌ `TabsFilterPills` — use `FilterPills`  
❌ `TimeFilterPills` — use `FilterPills`  
❌ `LeaderboardModeTabs` — use `SegmentedControl`  
❌ `CustomCardShell` — use `CardShell` with variant  
❌ Page-local duplicates of any shared component  

Same pattern = same component, forever.
