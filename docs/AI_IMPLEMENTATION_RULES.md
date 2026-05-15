# AI & Developer Implementation Rules

## Overview

These rules ensure consistent, maintainable code and prevent common pitfalls when working with this codebase. Follow these rules religiously.

---

## General Code Quality

### 1. Read Before Modifying
- **Always read** the entire file before proposing changes
- **Never propose changes** to code you haven't examined
- Understand existing patterns, naming, and structure first

### 2. Single Responsibility
- Components should do one thing well
- Don't mix concerns (data fetching, rendering, styling)
- Split complex components into smaller, composable pieces (but not prematurely)

### 3. Avoid Over-Engineering
- Don't add features beyond what's requested
- Don't refactor surrounding code just to "clean it up"
- Don't create abstractions for one-off operations
- Don't add error handling for impossible scenarios
- **Only change what's necessary** to fulfill the request

### 4. No Backward-Compatibility Hacks
- If something is unused, delete it (don't rename with `_`, don't re-export)
- Don't add fallbacks for old APIs that no longer exist
- Don't leave `// removed` comments for deleted code
- Clean slate is better than technical debt

### 5. Trust the Framework
- Trust Next.js conventions and guarantees
- Trust Tailwind to apply styles correctly
- Trust TypeScript to catch type errors
- Don't add manual null checks for values guaranteed by contracts

---

## Design System Compliance

### 6. Always Use Component System
✅ **DO**:
```tsx
<AppText variant="pageTitle">Title</AppText>
<AppButton variant="primary" size="lg">Click me</AppButton>
<CardShell variant="default"><content /></CardShell>
```

❌ **DON'T**:
```tsx
<h1 className="text-3xl font-bold">Title</h1>
<button className="rounded-lg px-4 py-2 bg-orange">Click me</button>
<div className="border rounded-3xl p-4 shadow-lg"><content /></div>
```

### 7. No Raw Hex Colors
✅ **DO**:
```tsx
<div className="bg-orange text-ink border border-medium-gray">
  ...
</div>
```

❌ **DON'T**:
```tsx
<div className="bg-[#ff7d00] text-[#001524] border border-[#D4D0CC]">
  ...
</div>
```

### 8. No Custom Text Classes
✅ **DO**:
```tsx
<AppText variant="body">Some text</AppText>
<AppText variant="meta">Metadata</AppText>
```

❌ **DON'T**:
```tsx
<p className="text-lg font-bold">Some text</p>
<span className="text-xs text-gray-500">Metadata</span>
```

### 9. Import Design Tokens, Not Magic Values
✅ **DO**:
```tsx
import { colors, shadows, spacing } from "@/lib/design-tokens";
className={shadows.feedCard}
```

❌ **DON'T**:
```tsx
className="shadow-[0_10px_30px_rgba(0,21,36,0.08)]"
```

### 10. Use Input Styles for Forms
✅ **DO**:
```tsx
import { inputStyles, selectStyles, textareaStyles } from "@/lib/inputStyles";
<input className={inputStyles} />
<select className={selectStyles}></select>
<textarea className={textareaStyles}></textarea>
```

❌ **DON'T**:
```tsx
<input className="border rounded-lg p-2 focus:ring-2 focus:ring-teal" />
```

---

## Component Structure Rules

### 11. Use Provided Components for Layout
✅ **DO**:
```tsx
<AppPage>
  <AppHeader title="Page Title" />
  <PageSection>
    <CardShell>Content</CardShell>
  </PageSection>
</AppPage>
```

❌ **DON'T**:
```tsx
<div className="flex flex-col min-h-screen max-w-md mx-auto">
  <div className="bg-white p-4 shadow">Page</div>
  <div className="p-4">Content</div>
</div>
```

### 12. Proper Component Arities
- Keep components focused and composable
- Pass data as props, not derived in component
- Keep event handlers lean

### 13. TypeScript Type Definitions
✅ **DO**:
```tsx
interface ComponentProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick: (value: string) => void;
}
```

❌ **DON'T**:
```tsx
function Component(props: any) {
  ...
}
```

---

## State Management Rules

### 14. Local State First
- Use `useState` for component-local state
- Use `useCallback`, `useMemo` for performance when justified
- Don't reach for Redux/Zustand for single-page state

### 15. Mock Data Pattern
✅ **DO**:
```tsx
const MOCK_MEMBERS = [...]; // Define outside component
export default function Page() {
  const [members, setMembers] = useState(MOCK_MEMBERS);
  ...
}
```

❌ **DON'T**:
```tsx
function Page() {
  const [members, setMembers] = useState([
    { id: "1", name: "Tyler" },
    { id: "2", name: "Mike" }
  ]);
}
```

### 16. State Transitions (Current Add-Drink Pattern)
- Use `screen` state to manage flow: `"gate" | "create_tab" | "join_tab" | "current_tab" | "add_drink"`
- Store `activeTab` or `null` to track if tab exists
- Don't conditionally render based on multiple booleans
- Keep state updates in event handlers

---

## File Organization Rules

### 17. Don't Split Prematurely
- Keep monolithic components until they're 500+ lines AND clearly benefit from splitting
- Don't create 20-line extracted components (cost of navigation > benefit)
- **Only split when**: Sub-component is reused OR logical boundary is clear

### 18. File Naming
- Components: PascalCase (Button.tsx, PageHeader.tsx)
- Pages: lowercase/kebab-case (add-drink/page.tsx, checkout/page.tsx)
- Types: PascalCase in separate files or inline
- Utils: camelCase (formatDate.ts, calculateScore.ts)

### 19. Imports Organization
```tsx
// 1. React / Next.js
"use client";
import { useState } from "react";

// 2. Third-party
import { ArrowLeft } from "lucide-react";

// 3. Local absolute imports
import { AppButton } from "@/components/common/AppButton";
import { colors } from "@/lib/design-tokens";

// 4. Types
import type { Item } from "@/types";
```

---

## Typography & Content Rules

### 20. Use Terminology Consistently
✅ **DO**:
- "Open Tab", "Close Tab" (not "Start", "End", "Session")
- "Add Drink" (not "Track", "Log")
- "Members" (not "Participants", "Users")
- "Leave Tab" (not "Quit", "Exit")
- "Ounces" (not "oz", "ml")
- "Pint Score" (not "Pints Consumed")

❌ **DON'T**:
- Mix terminology in one file/page
- Use synonyms for core concepts

See **PRODUCT_LANGUAGE.md** for full terminology guide.

### 21. Copy Tone
- Warm, fun, bar-themed language
- "Cheers!" not "Success"
- "You're leading with 2 pints" not "You have logged 32 ounces"
- Avoid corporate language

---

## Testing & Preview Rules

### 22. Test Before Commit
- ✅ Component renders without errors
- ✅ Responsive on mobile (max-w-md)
- ✅ No console errors
- ✅ Button clicks work
- ✅ Form inputs work
- ✅ Navigation works (if applicable)

### 23. Visual Regression Check
- ✅ Matches design system (colors, spacing, shadows)
- ✅ Typography is correct (AppText variants)
- ✅ Buttons are correct (AppButton variants)
- ✅ Cards are correct (CardShell variants)
- ✅ Mobile layout is single-column, centered

---

## Git & Commit Rules

### 24. Commit Messages
- **Format**: `verb + brief description`
- **Examples**:
  - "Add Create Tab form flow"
  - "Fix pint score calculation"
  - "Refactor drink breakdown component"
  - "Update member avatars in current tab"
- **Avoid**: "Update files", "Fix bugs", "WIP"
- **1 logical change per commit** if possible

### 25. Small, Focused PRs
- Each PR should address ONE feature or bug
- Keep changes under 400 lines if possible
- Link to issue in PR description
- One commit per logical change

---

## Common Anti-Patterns (AVOID)

### ❌ Anti-Pattern 1: Magic Numbers
```tsx
❌ DON'T:
const h = 80; // What is this?
const s = 24; // Is this padding?

✅ DO:
const LIVE_BUBBLE_SIZE = "h-20 w-20";
const SECTION_GAP = "gap-6";
```

### ❌ Anti-Pattern 2: Prop Drilling (Light Usage OK)
```tsx
❌ AVOID (if drilling 3+ levels):
<Parent members={members}>
  <Child members={members}>
    <GrandChild members={members} />
  </Child>
</Parent>

✅ DO: Pass down if it's 1-2 levels, or use context for global (activeTab)
```

### ❌ Anti-Pattern 3: Conditional Rendering Hell
```tsx
❌ DON'T:
{screen === "gate" && <Gate />}
{screen === "create" && <Create />}
{screen === "join" && <Join />}

✅ DO:
const screenMap = {
  gate: <Gate />,
  create: <Create />,
  join: <Join />
};
return screenMap[screen];
```

### ❌ Anti-Pattern 4: God Component
```tsx
❌ DON'T: 1000-line component with everything
✅ DO: Break into logical sections at 500+ lines
```

### ❌ Anti-Pattern 5: Unused Imports
```tsx
✅ Clean up all unused imports before committing
```

---

## Performance Rules

### 26. Don't Optimize Prematurely
- Use `useCallback` only if function is passed as dependency
- Use `useMemo` only if calculation is expensive (heavy array ops, deep recursion)
- Don't memoize entire components "just in case"

### 27. Bundle Size
- Import only what you use (tree-shaking should work)
- Don't install extra dependencies for small utilities
- Verify no duplicates in node_modules (npm audit)

---

## Security Rules

### 28. No Sensitive Data in Code
- ❌ Don't hardcode API keys (use .env.local)
- ❌ Don't log user passwords
- ❌ Don't expose Supabase service key in components

### 29. Input Validation
- Validate at system boundaries (user input, API responses)
- Trust internal code contracts
- Don't add paranoid checks inside verified functions

---

## When to Ask for Clarification

### Ask When:
- Requirements are ambiguous
- Multiple valid approaches exist
- Feature scope is unclear
- Terminology decision points arise
- UI/UX trade-offs need user input

### DON'T Ask When:
- Implementation detail is clear from context
- Pattern is established in codebase
- Design system covers it
- It's a straightforward bug fix

---

## Checklist Before Submitting Code

- [ ] Read entire file before modifying
- [ ] Used `AppText` for all typography
- [ ] Used `AppButton` for all buttons
- [ ] Used `CardShell` for all cards
- [ ] No raw hex colors
- [ ] No custom text/button/card classes
- [ ] No unused imports
- [ ] Imported from design-tokens, not magic values
- [ ] TypeScript types are correct
- [ ] Component follows file naming conventions
- [ ] Terminology is consistent (PRODUCT_LANGUAGE.md)
- [ ] Responsive on mobile (max-w-md)
- [ ] No console errors
- [ ] Commit message is clear and descriptive
- [ ] Changed only what was requested
- [ ] No over-engineering, no extras

---

## Related Documentation

See:
- **DESIGN_SYSTEM.md** — Component and token usage
- **PRODUCT_LANGUAGE.md** — Terminology consistency
- **CURRENT_ARCHITECTURE.md** — File organization
- **TECH_DEBT.md** — Known violations to fix
