# Tech Debt & Inconsistencies Audit

## Critical Design System Violations

### 🔴 HIGH PRIORITY

#### 1. Receipts Page — Raw Hex Values & Custom Styles
**File**: `app/receipts/page.tsx` (lines 85–150+)

**Violations**:
- Uses raw hex colors: `bg-[#FAFAF8]`, `text-[#001524]`, `bg-[#ff7d00]`, `border-[#D4D0CC]`, `text-[#8B8680]`
- Custom filter buttons instead of `<SegmentedControl>`
- Custom card divs instead of `<CardShell>`
- Hardcoded text classes instead of `<AppText>`

**Fix**: 
- Replace hex values with Tailwind tokens (orange, teal, ink, dark-gray, light-gray, medium-gray)
- Use `<SegmentedControl>` for filter tabs
- Use `<CardShell>` for stat cards
- Use `<AppText>` for all text
- Use `<AppPage>` and `<PageSection>` for layout

**Effort**: 30–45 min

---

#### 2. Design Token File Duplication
**Files**: `lib/design-tokens.ts` vs `lib/design.ts`

**Violation**: Two design token files with overlapping definitions

**Issue**: Unclear which is source of truth. Components import from both.

**Fix**: 
- Consolidate into single file OR establish clear ownership
- Update all imports
- Delete unused file

**Effort**: 30–45 min

---

### 🟡 MEDIUM PRIORITY

#### 3. Add-Drink Page — Size (Component Needs Splitting)
**File**: `app/add-drink/page.tsx` (1200+ lines)

**Note**: CLAUDE.md explicitly says "Do not split first. Get the flow working first." ✅ Deferred.

**When**: After flow is tested and stable

**Effort**: 2–3 hours (planned)

---

#### 4. Input Styles Duplication
**Files**: Multiple pages

**Violation**: Some components may define custom input styles instead of using `inputStyles`

**Check**:
- `app/add-drink/page.tsx` — Uses `className={inputStyles}` ✅ (correct)
- All other forms — verify using shared styles

**Fix**: Replace all custom input classes with `className={inputStyles}`

**Effort**: 15–30 min

---

#### 5. Tailwind Color Tokens Not Fully Defined
**File**: `tailwind.config.ts`

**Issue**: Unclear if all color tokens work as Tailwind classes

**Verify**: These should work as Tailwind:
- `text-ink`, `bg-off-white`, `text-dark-gray`
- `border-medium-gray`, `bg-light-gray`
- `text-teal`, `bg-orange`

**Fix**: Ensure all colors from `design-tokens.ts` are in Tailwind config

**Effort**: 15–30 min

---

### 🟢 LOW PRIORITY

#### 6. Unused UI Components
**Files**: `components/ui/*`

**Issue**: Contains raw Radix UI components (Button.tsx, Card.tsx, input.tsx) — may be replaced by AppButton, CardShell, etc.

**Fix**: Audit and delete if unused

**Effort**: 15 min (audit) + 10 min (cleanup)

---

#### 7. Terminology Inconsistency
**Search for**:
- "start session" / "begin session" → should be "Open Tab"
- "end session" / "finish session" → should be "Close Tab"
- "log drink" → should be "Add Drink"

**Effort**: 20–30 min

---

## Missing Implementations

- **Database Integration** — No Supabase yet. All state is local/mock.
- **Photo Upload** — UI exists, no implementation.
- **Video Upload** — Button exists, no implementation.
- **User Authentication** — No login/signup. Assumes single user.

## Audit Checklist

- [ ] Receipts page — Fix hex colors, buttons, cards
- [ ] All pages — Check for hardcoded text vs AppText
- [ ] All buttons — Check for custom styles vs AppButton
- [ ] All cards — Check for custom divs vs CardShell
- [ ] All forms — Verify using inputStyles
- [ ] lib/ — Consolidate duplicate token files
- [ ] tailwind.config.ts — Verify all color tokens
- [ ] components/ui/ — Audit and remove if unused
- [ ] Copy/labels — Search for terminology violations

## Priority Order

### Pass 1 (Critical) — 2–3 hours
1. Fix Receipts page
2. Consolidate design token files
3. Verify Tailwind color tokens

### Pass 2 (Medium) — 1–2 hours
4. Check input styles
5. Audit component organization
6. Fix terminology

### Pass 3 (Low) — 1 hour
7. Unused component cleanup
8. Spacing token review
