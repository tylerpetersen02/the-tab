# Visual Audit & Refinement Checklist

**Phase Goal:** Consistency, density, rhythm, and polish — NOT new features.

**Scope:** Feed, Tabs, and Leaderboard, audited side-by-side.

---

## 1. Section Headers

Check across all three pages:

- [ ] Font size identical (should be AppText variant="sectionLabel")
- [ ] Tracking identical
- [ ] Icon sizing consistent (h-4 w-4, fill-orange text-orange)
- [ ] Icon placement consistent
- [ ] Spacing below header consistent (mb-3)

**Examples to compare:**
- Feed: "Live Now" 
- Tabs: "Live Now" / "Recent Tabs"
- Leaderboard: "Quick Records"

---

## 2. Filter Pills

Check across all pages:

- [ ] Height identical (h-9)
- [ ] Border radius identical (rounded-full)
- [ ] Font size identical (text-sm font-black)
- [ ] Padding identical (px-4)
- [ ] Active color identical (bg-teal text-white)
- [ ] Inactive color identical (bg-white border-medium-gray text-ink)
- [ ] Spacing between pills identical (gap-2)
- [ ] Scrollbar-hide applied

**Examples to compare:**
- Tabs: "All / Live / Recent / Mine / Archived"
- Leaderboard: "This Week / Month / All Time / This Tab"

---

## 3. Card Headers (User/Title Section)

Check across cards:

- [ ] Avatar sizing consistent (h-10 w-10 for md, h-8 w-8 for sm)
- [ ] Avatar ring/border color consistent
- [ ] Title font size consistent (AppText variant="cardTitle")
- [ ] Metadata font size consistent (AppText variant="meta")
- [ ] Spacing between avatar and title consistent (gap-3)
- [ ] Icon buttons (more menu) consistent (h-5 w-5)

**Examples to compare:**
- DrinkFeedPost header
- SessionStartedFeedPost header
- TabListCard header

---

## 4. Card Shadows & Depth

Check visual feel:

- [ ] Feed cards feel elevated + immersive (shadow-feed)
- [ ] Tabs cards feel flat + utility-oriented (shadow-compact)
- [ ] Leaderboard cards feel structured + scorecard-like (shadow-card)
- [ ] No card has manual shadow outside CardShell

---

## 5. Buttons

Check all action buttons:

- [ ] Orange buttons: identical size, color, radius, font, hover state
- [ ] Teal buttons: identical size, color, radius, font, hover state
- [ ] Ghost/muted buttons: identical styling
- [ ] Rounded-full consistency
- [ ] All use color tokens (bg-orange, bg-teal), not raw hex

**Examples to compare:**
- "Join" buttons (Tabs, SessionStartedFeedPost)
- "View Receipts" button (RecapFeedPost)
- Primary action buttons

---

## 6. Icon Sizing

Standardize across the app:

- [ ] Inline icons: h-3.5 w-3.5 (or h-4 w-4 for standard)
- [ ] Card feature icons: h-5 w-5
- [ ] Hero/stat icons: h-6 w-6
- [ ] Section header icons: h-4 w-4
- [ ] User avatar badge icons: h-3 w-3
- [ ] No inconsistent stroke widths (all Lucide icons)

---

## 7. Pills & Badges

Check info/metadata pills:

- [ ] InfoPill height consistent
- [ ] InfoPill border radius consistent (rounded-full)
- [ ] StatusBadge sizing consistent
- [ ] All use color tokens for tones (default/teal/orange)
- [ ] No raw hex colors in pill styling

**Examples to compare:**
- DrinkFeedPost drink info pills (16oz, Lager, Verified)
- BonusDrinkFeedPost drink badge
- Leaderboard trend indicators

---

## 8. Spacing Rhythm

### Feed

- [ ] Feed card spacing: space-y-6 (breathing room)
- [ ] Section spacing: mt-6 px-4
- [ ] Internal card padding: p-4

### Tabs

- [ ] Card spacing: appropriate gap
- [ ] Section spacing: mt-6 px-4
- [ ] Internal card padding: p-3 (more compact)

### Leaderboard

- [ ] Section spacing: PageSection (mt-6 px-4)
- [ ] Internal card padding: varies by card type
- [ ] Vertical rhythm consistent with page structure

---

## 9. Card Density

Visual review:

- [ ] Feed cards: NOT too cramped, media-first feel
- [ ] Tabs cards: compact but readable, utility-focused
- [ ] Leaderboard cards: clear hierarchy, scannable
- [ ] No card feels "broken" after typography adjustments

---

## 10. Typography Hierarchy

Verify across pages:

- [ ] Page titles: text-[28px] (AppText pageTitle)
- [ ] Card titles: text-[18px] (AppText cardTitle)
- [ ] Section labels: text-[13px] uppercase (AppText sectionLabel)
- [ ] Metadata: text-[12px] (AppText meta)
- [ ] Tiny labels: text-[10px] uppercase (AppText tinyLabel)
- [ ] No manual text sizing outside AppText

---

## 11. Metadata Consistency

Check all secondary/tertiary text:

- [ ] All metadata uses AppText variant="meta" (text-[12px] text-dark-gray)
- [ ] All tiny labels use AppText variant="tinyLabel" (text-[10px] uppercase)
- [ ] Spacing above/below metadata consistent (mt-1)
- [ ] No raw text-xs/text-[11px] scattered

---

## 12. Visual Hierarchy Check

Step back and ask:

- [ ] Is the most important content largest and most prominent?
- [ ] Is secondary content clearly subordinate?
- [ ] Are cards visually distinct from page background?
- [ ] Do shadows provide proper depth cues?
- [ ] Is the overall "weight" of each page appropriate?

---

## 13. Component Consistency

Check specific components across pages:

### UserAvatar
- [ ] Sizing consistent (md: h-10 w-10, sm: h-8 w-8)
- [ ] Background color consistent (bg-teal)
- [ ] Font sizing consistent (text-sm)
- [ ] Border/ring consistent

### StatusBadge
- [ ] Live badge sizing consistent
- [ ] Icon sizing consistent (h-3 w-3)
- [ ] Active color consistent (bg-orange text-white)

### ReactionBar
- [ ] Icon sizing consistent (h-4 w-4)
- [ ] Text sizing consistent
- [ ] Spacing consistent (gap-2)

---

## 14. Color Token Usage

Audit all colors:

- [ ] No raw hex in any component (except lib/gradients.ts)
- [ ] All borders use border-medium-gray
- [ ] All text uses color tokens (ink, dark-gray, etc.)
- [ ] All buttons use bg-orange or bg-teal
- [ ] All backgrounds use bg-white or bg-off-white

---

## 15. Borders & Radius

Standardization check:

- [ ] Large cards: rounded-[28px]
- [ ] Compact cards: rounded-[24px]
- [ ] Media: rounded-[26px]
- [ ] Buttons/pills: rounded-full or rounded-2xl
- [ ] All borders: border-medium-gray
- [ ] No rounded-lg, rounded-xl, or rounded-[30px] used

---

## Visual Testing Steps

1. **Start dev server** and navigate to Feed, Tabs, Leaderboard
2. **Side-by-side comparison** — open in split view if possible
3. **Zoom in** — check icon sizing, text rendering
4. **Zoom out** — check overall rhythm and density
5. **Scroll** — verify spacing rhythm holds up
6. **Check mobile** — ensure brand font size (34px) is appropriate
7. **Verify bottom nav** — no overlap on any page

---

## Refinements Likely Needed

Possible adjustments after audit:

- [ ] Icon sizing adjustments (some h-4 → h-5 or vice versa)
- [ ] Spacing tweaks (section spacing, card padding)
- [ ] Avatar sizing consistency (some cards might need different sizes)
- [ ] Typography line-height adjustments
- [ ] Shadow adjustments (may need subtle tweaks)
- [ ] Pill height/styling (may need standardization)
- [ ] Button styling (may need size standardization)

---

## Success Criteria

When done, the app should feel:

✅ **Consistent** — same patterns look identical across pages  
✅ **Rhythmic** — spacing follows predictable patterns  
✅ **Hierarchical** — important content is visually prominent  
✅ **Premium** — polished, intentional, not default  
✅ **Usable** — no content cramped, no wasted space  

---

## Do NOT Do During This Phase

❌ Build new pages  
❌ Add new features  
❌ Change layouts  
❌ Redesign existing components  
❌ Add new colors/gradients  

---

## Do During This Phase

✅ Verify consistency  
✅ Adjust spacing rhythm  
✅ Standardize icon sizing  
✅ Verify card density  
✅ Confirm button consistency  
✅ Check typography hierarchy  
✅ Ensure no raw hex values  
✅ Verify CardShell/AppText usage  
✅ Polish "feel" of the app  
