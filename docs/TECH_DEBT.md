# Technical Debt & Violations

## Overview

This document tracks known technical debt, design system violations, and code quality issues that need cleanup. Organized by severity and category.

---

## Critical Issues (High Priority)

### 1. Monolithic Add-Drink Page
**File**: `app/add-drink/page.tsx`
**Severity**: HIGH
**Issue**: 1195 lines in single file containing all flow screens (gate, create_tab, join_tab, current_tab, add_drink) plus internal helper components
**Impact**:
- Hard to maintain and test
- Difficult to debug specific flow
- Component reusability blocked
- Violates single responsibility

**Plan**:
- Extract internal components to `components/add-drink/` directory:
  - `SubFlowHeader.tsx`
  - `Field.tsx`
  - `ChoiceButton.tsx`
  - `CurrentTabHero.tsx`
  - `GoalProgress.tsx`
  - `YourContribution.tsx`
  - `MembersCard.tsx`
  - `DrinkBreakdown.tsx`
  - `RecentActivity.tsx`
  - `MiniStat.tsx`
  - `ActionTile.tsx`
- Keep flows in `page.tsx` temporarily (refactor structure later)
- See **CLAUDE.md** for detailed requirements

---

### 2. No Real-Time Sync / Supabase Integration
**Severity**: HIGH (Roadmap blocker)
**Issue**: Feature fully works in local state but doesn't sync to backend or persist
**Impact**:
- Tab data lost on page refresh
- No multi-device support
- Friends don't see live updates
- Can't build production features

**Plan**:
- Create Supabase client wrapper
- Add auth (Supabase Auth)
- Migrate useState → useQuery/useMutation
- Wire up real-time subscriptions
- See **ROADMAP.md**

---

### 3. No Persistent Storage
**Severity**: MEDIUM
**Issue**: App state resets on page refresh—no localStorage or Supabase
**Impact**: User loses their tab session if page reloads
**Quick Fix**: Add localStorage save/restore for activeTab (temporary bridge)
**Permanent Fix**: Move to Supabase (see above)

---

## Design System Violations

### 4. Potential Raw Hex Values in Custom Components
**Severity**: MEDIUM
**Issue**: Need audit of custom component files to ensure all colors use Tailwind tokens
**Status**: TBD (need to scan components/tabs, components/leaderboard, components/feed)
**Action**:
- Grep for `#[0-9a-fA-F]{6}` in component files (excluding node_modules, lib)
- Replace any hardcoded hex with Tailwind color classes
- Import from design-tokens if needed

**Files to Check**:
- `components/tabs/*.tsx`
- `components/feed/*.tsx`
- `components/leaderboard/*.tsx`

---

### 5. Duplicate Input Styling
**Severity**: MEDIUM
**Issue**: Multiple components might re-declare input styles
**Status**: TBD (need to check feed/leaderboard/tabs components)
**Action**:
- Ensure all inputs use `inputStyles`, `selectStyles`, `textareaStyles` from lib/inputStyles.ts
- Remove any local className declarations for inputs

---

### 6. Card Style Bypass
**Severity**: LOW-MEDIUM
**Issue**: Components might use custom card styling instead of CardShell
**Status**: TBD (need audit)
**Action**:
- Verify all card-like containers use `<CardShell>`
- Replace custom `className="rounded-lg border shadow"` with `<CardShell>`

---

### 7. Button Style Bypass
**Severity**: LOW-MEDIUM
**Issue**: Components might use custom button styling instead of AppButton
**Status**: TBD (need audit)
**Action**:
- Audit all button elements
- Replace non-AppButton buttons with `<AppButton>`
- Check for shadcn Button component usage (should use AppButton wrapper)

---

### 8. Raw Text/Font Classes
**Severity**: LOW-MEDIUM
**Issue**: Components might use raw Tailwind text classes (text-lg, font-bold) instead of AppText
**Status**: TBD (need audit)
**Action**:
- Search for `text-\[` patterns (arbitrary sizes)
- Search for `font-` classes (should use AppText variant)
- Replace with appropriate `<AppText variant="...">` calls

---

## Import & Organization Issues

### 9. Unused Imports
**Severity**: LOW
**Issue**: Components may have unused imports
**Action**:
- Run through codebase before each commit
- Remove unreferenced imports

---

### 10. Mixed Import Order
**Severity**: LOW
**Issue**: Inconsistent import ordering (React, third-party, local, types)
**Standard**:
```tsx
"use client";
import { useState } from "react";                    // React
import { ArrowLeft } from "lucide-react";           // Third-party
import { AppButton } from "@/components/common";    // Local absolute
import type { Tab } from "@/types";                 // Types
```
**Action**: Enforce in all new/modified files

---

## Typing Issues

### 11. Missing Type Definitions
**Severity**: LOW-MEDIUM
**Issue**: Types defined inline in page.tsx should be in separate files
**Current**: `app/add-drink/page.tsx` defines Screen, Member, ActivityItem, etc.
**Action**:
- Move to `types/tab.ts` (or similar)
- Export from central location
- Import in page components

---

### 12. Any Types Usage
**Severity**: LOW
**Issue**: Any usage of `any` type in component code
**Action**:
- Replace `any` with proper types
- Use generics if needed

---

## State Management Issues

### 13. Prop Drilling
**Severity**: MEDIUM (if deep)
**Issue**: Passing props through multiple component levels
**Current Pattern**: Add-drink page passes screen state through multiple components
**Action**:
- Okay for 1-2 levels
- If 3+ levels, consider context (e.g., TabContext for current tab)

---

### 14. Hardcoded Mock Data
**Severity**: LOW
**Issue**: `defaultMembers` array hardcoded in add-drink/page.tsx
**Impact**: Testability, reusability
**Action**:
- Extract to `constants/mockData.ts`
- Import where needed
- Plan: Replace with Supabase data

---

## Performance Issues

### 15. Unoptimized Re-renders (TBD)
**Severity**: LOW (for current scope)
**Issue**: Large components might re-render unnecessarily
**Action**:
- Profile with React DevTools
- Only optimize if detected as bottleneck
- Use `useCallback`, `useMemo` judiciously

---

## Accessibility Issues

### 16. Missing ARIA Labels (TBD)
**Severity**: MEDIUM
**Issue**: Icon buttons, interactive elements might lack aria-label
**Action**:
- Audit all icon-only buttons
- Add `aria-label` prop
- Test with screen reader

---

### 17. Color Contrast (TBD)
**Severity**: LOW
**Issue**: Some text/background combinations might not meet WCAG AA/AAA
**Action**:
- Run design system through accessibility checker
- Verify contrast ratios in design-tokens definitions

---

## Missing Features (Not Bugs, But Incomplete)

### 18. Image Uploads
**Issue**: UI for cover image exists but upload not functional
**Impact**: Cover image always null/dummy
**Status**: Deferred (not PCP requirement)

---

### 19. Custom Ounce Input Validation
**Issue**: "Other" drink type allows custom oz but might not validate range
**Status**: Check inputStyles; may need custom validator

---

### 20. Real-Time Activity Timestamps
**Issue**: Activity feed shows relative time ("2 minutes ago") but doesn't auto-update
**Workaround**: Page reload or re-fetch shows updated time
**Solution**: Add useEffect to update timestamps every minute

---

## Documentation Gaps

### 21. Component API Documentation
**Issue**: Components lack JSDoc comments explaining props
**Status**: Components should document complex prop interfaces
**Action**: Add JSDoc to:
- AppButton (variants, sizes, special props)
- AppText (variants, semantic usage)
- CardShell (variants, when to use)
- Custom components

---

### 22. Error Boundary Missing
**Issue**: App has no error boundary for graceful error handling
**Status**: Not critical for MVP but recommended
**Action**: Add React error boundary wrapper at layout level

---

## Known Browser/Environment Issues

### 23. Safe Area Insets
**Issue**: App correctly uses env(safe-area-inset-*) but needs testing on notched devices
**Status**: Logic in place, testing pending

---

## Clean-Up Checklist

- [ ] Merge all 9 docs to `docs/` directory ← **DONE**
- [ ] Audit raw hex colors in all components
- [ ] Audit for duplicate input styles
- [ ] Audit for card style bypasses
- [ ] Audit for button style bypasses
- [ ] Audit for raw text/font classes
- [ ] Move type definitions from add-drink/page.tsx to types/tab.ts
- [ ] Extract internal components from add-drink/page.tsx to add-drink/ subdirectory
- [ ] Add localStorage bridge for activeTab (temporary)
- [ ] Extract mock data to constants/mockData.ts
- [ ] Add JSDoc to key components
- [ ] Run accessibility checker on design system
- [ ] Plan Supabase integration (see ROADMAP.md)

---

## Prioritized Fix Order

### Pass 1 (Design System Violations)
1. Grep for raw hex colors, replace with Tailwind tokens
2. Ensure all inputs use inputStyles
3. Replace custom cards with CardShell
4. Replace custom buttons with AppButton
5. Replace raw text classes with AppText

### Pass 2 (Code Structure)
1. Extract add-drink internal components
2. Move types to separate files
3. Extract mock data
4. Fix import ordering

### Pass 3 (Storage & Persistence)
1. Add localStorage for activeTab (bridge)
2. Plan Supabase integration
3. Add auth scaffolding

### Pass 4 (Polish & Accessibility)
1. Add ARIA labels to icon buttons
2. Verify color contrast
3. Add error boundary
4. Add JSDoc comments

---

## Related Documentation

See:
- **AI_IMPLEMENTATION_RULES.md** — Rules to follow going forward
- **ROADMAP.md** — Future work and feature roadmap
- **DESIGN_SYSTEM.md** — Standards to audit against
