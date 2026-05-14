# Design System Audit & Enforcement

## Completed Fixes

✅ **Typography:** Removed Geist fonts, using Nunito Sans only across the app  
✅ **Border Color:** Updated tailwind.config.ts `medium-gray` from #D1D5DB to #D4D0CC  
✅ **Text Rendering:** Added letter-spacing, text-rendering, and font-smoothing to globals.css  
✅ **AppPage:** Uses bg-off-white, text-ink, max-w-md, pb-44  
✅ **Gradients:** Moved from inline strings to lib/gradients.ts  

## Required Enforcements

### Typography (AppText)
**Rule:** All user-visible text must use `<AppText>` with a variant. Do not manually write `text-sm`, `font-black`, `text-dark-gray`, etc.

**Updated Components:**
- ✅ AppHeader
- ✅ SectionHeader
- ✅ StatCard
- ✅ LeaderboardRankRow
- ✅ PodiumUser
- ✅ LeaderboardHighlights
- ✅ TabListCard

**Needs Audit (Feed):**
- [ ] FeedToggle
- [ ] LiveSessionCarousel
- [ ] LiveSessionBubble
- [ ] FeedPostList
- [ ] DrinkFeedPost
- [ ] BonusDrinkFeedPost
- [ ] BadgeFeedPost
- [ ] RecapFeedPost
- [ ] SessionStartedFeedPost

### Page Structure (PageSection)
**Rule:** Page files should not manually use `mt-6`, `mt-8`, `px-4` for normal sections. Use `<PageSection>`.

**Updated Pages:**
- ✅ Leaderboard (all sections wrapped in PageSection)
- ✅ Tabs (all sections wrapped in PageSection)

**Needs Audit:**
- [ ] Feed page structure

### Cards (CardShell)
**Rule:** All cards use `<CardShell variant="...">`. Do not manually write border/radius/shadow.

Variants:
- `feed` — Large media cards (shadow-[0_10px_30px_...])
- `compact` — Session cards (shadow-[0_5px_18px_...])
- `score` — Stat cards (shadow-[0_8px_26px_...])
- `default` — Standard cards

**Updated Components:**
- ✅ StatCard (uses CardShell variant="score")
- ✅ TabListCard (uses CardShell variant="compact")

**Needs Audit (Feed):**
- [ ] DrinkFeedPost — should use CardShell variant="feed"
- [ ] BonusDrinkFeedPost — should use CardShell variant="compact"
- [ ] BadgeFeedPost — should use CardShell variant="score"
- [ ] RecapFeedPost — should use CardShell variant="feed"

### Controls
**Rule:** All filter rows use `<FilterPills>`, all mode toggles use `<SegmentedControl>`.

**Updated:**
- ✅ Leaderboard uses SegmentedControl for ranking modes
- ✅ Leaderboard uses FilterPills for time filters
- ✅ Tabs uses FilterPills for session filters

**Needs Check:**
- [ ] Feed uses FeedToggle (should be evaluated — might convert to SegmentedControl)

### Border Color
**Rule:** Use `border-medium-gray` everywhere. No raw #D4D0CC.

**Updated:**
- ✅ tailwind.config.ts medium-gray = #D4D0CC
- ✅ All CardShell variants use border-medium-gray
- ✅ AppHeader updated to use border-medium-gray

**Needs Audit:**
- [ ] All Feed components should use border-medium-gray, not raw hex

### Radius
**Rule:** Standardize to: 28px (large cards), 24px (compact), 26px (media), full/2xl (controls).

**No manual rounded-lg, rounded-[30px], or other values.**

**Needs Audit:**
- [ ] Feed components should follow radius standards

### Shadows
**Rule:** Shadows come from `CardShell` variants or specific component styling. No manual `shadow-[0_...]` in page-specific components.

**Verified:**
- ✅ CardShell defines all shadows
- ✅ No page-specific components have manual shadows

**Needs Audit:**
- [ ] Feed components should not have manual shadows

### Colors
**Rule:** Use Tailwind design tokens, not raw hex.

**Token Names:**
- Colors: ink, teal, orange, papaya, dark-gray, medium-gray, off-white, white, light-gray, brandy
- Never use: #001524, #15616d, #ff7d00, #ffecd1, #D4D0CC, #8B8680, #FAFAF8

**Updated:**
- ✅ AppHeader uses border-medium-gray, text-ink
- ✅ SectionHeader uses text-teal
- ✅ TabListCard uses bg-teal/10, bg-off-white, border-medium-gray

**Needs Audit:**
- [ ] All Feed components should use color tokens

---

## Feed Component Audit Checklist

### FeedToggle
- [ ] Check for manual text sizing → use AppText
- [ ] Check border/background colors → use color tokens
- [ ] Verify active/inactive states use consistent styling

### LiveSessionCarousel
- [ ] Check for manual px/mt/gap → use standard spacing
- [ ] Verify title text uses AppText

### LiveSessionBubble
- [ ] Check avatar sizing consistency
- [ ] Check text styling (title, member count) → AppText
- [ ] Check gradient from lib/gradients
- [ ] Check LIVE badge styling → StatusBadge
- [ ] Check text wrapping and height fixes

### FeedPostList
- [ ] Check for manual spacing between posts
- [ ] Verify polymorphic rendering pattern

### DrinkFeedPost
- [ ] Wrap in CardShell variant="feed"
- [ ] Use AppText for user name → cardTitle
- [ ] Use AppText for metadata → meta
- [ ] Use AppText for caption → body
- [ ] Use StatusBadge for LIVE badge
- [ ] Use InfoPill for metadata (Verified, location, etc)
- [ ] Use UserAvatar for profile picture
- [ ] Check shadow → should come from CardShell
- [ ] Check radius → should use rounded-[28px]
- [ ] Check border → should use border-medium-gray

### BonusDrinkFeedPost
- [ ] Wrap in CardShell variant="compact"
- [ ] Use AppText for all text → meta or tinyLabel
- [ ] Use UserAvatar
- [ ] Use InfoPill for drink type

### BadgeFeedPost
- [ ] Wrap in CardShell variant="score"
- [ ] Use AppText for title → cardTitle
- [ ] Use AppText for description → body
- [ ] Use AppText for badge info → meta

### RecapFeedPost
- [ ] Wrap in CardShell variant="feed"
- [ ] Use AppText for all text
- [ ] Check stat display styling
- [ ] Use color tokens for gradient background

### SessionStartedFeedPost
- [ ] Keep lightweight (current approach is fine)
- [ ] Use AppText for text
- [ ] Ensure consistent spacing

---

## Next Steps

1. **Audit Feed components** — Check each file against the checklist above
2. **Refactor Feed child components** — Replace manual styling with shared primitives
3. **Test in browser** — Verify visual consistency and that nothing broke
4. **Final polish** — Any remaining inconsistencies

---

## Enforcement Rules for Future Work

> **Same interaction pattern = same component**
>
> **All text = AppText**
>
> **All cards = CardShell**
>
> **All page sections = PageSection**
>
> **All filters = FilterPills**
>
> **All mode toggles = SegmentedControl**
>
> **All colors = design tokens**
>
> **Never hardcode styling in page-specific components**
