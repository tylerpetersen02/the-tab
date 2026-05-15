# AI Implementation Rules

For Claude Code & Future Agents

## Core Principles

1. **Use the Design System** — Every UI element must use established components
2. **No One-Offs** — Never create custom styles that duplicate existing ones
3. **Terminology is Sacred** — Always use correct product language
4. **Type Safety** — Use TypeScript; no `any`
5. **DRY** — Extract shared patterns into components

## Component Rules

| Need | Use | NOT |
|---|---|---|
| Text of any kind | `<AppText variant="...">` | `<p className="text-sm ...">` |
| Any button | `<AppButton variant="..." size="...">` | `<button className="...">` |
| Card container | `<CardShell variant="...">` | `<div className="rounded-lg border ...">` |
| Page layout | `<AppPage>` + `<PageSection>` | `<main className="...">` |
| Badge/chip | `<InfoPill>` / `<StatusBadge>` | `<span className="px-3 py-1 ...">` |
| Form input | `className={inputStyles}` | `className="px-4 py-3 rounded-lg ..."` |

## Styling Rules

### ✅ CORRECT

```tsx
import { AppText } from "@/components/common/AppText";
import { AppButton } from "@/components/common/AppButton";
import { CardShell } from "@/components/common/CardShell";
import { inputStyles } from "@/lib/inputStyles";

export function MyComponent() {
  return (
    <CardShell variant="default">
      <AppText variant="cardTitle">Title</AppText>
      <input className={inputStyles} />
      <AppButton variant="primary" size="lg">Click Me</AppButton>
    </CardShell>
  );
}
```

### ❌ INCORRECT

```tsx
export function MyComponent() {
  return (
    <div className="rounded-[28px] border border-medium-gray bg-white">
      <h2 className="text-sm font-extrabold">Title</h2>
      <input className="w-full rounded-[16px] border border-medium-gray px-4 py-3" />
      <button className="rounded-full bg-orange text-white px-5 py-3">Click Me</button>
    </div>
  );
}
```

## Color Usage

### ✅ CORRECT
```tsx
<div className="bg-teal text-white">Teal button</div>
<AppText variant="body" className="text-dark-gray">Gray text</AppText>
```

### ❌ INCORRECT
```tsx
<div className="bg-[#15616d] text-white">Teal button</div>
<p className="text-[#6B7280] text-sm font-semibold">Gray text</p>
```

**Rule**: Always use Tailwind color tokens. Never use raw hex values.

## Spacing Rules

- `mt-6` — Between `PageSection` elements
- `mt-4` — Between components within a section
- `mt-2` — Between related elements
- `px-4` — Horizontal padding (built into `PageSection`)

## Import Organization

```tsx
import { useState, useMemo } from "react";
import { Beer } from "lucide-react";
import { AppPage } from "@/components/common/AppPage";
import { FeedPostList } from "@/components/feed/FeedPostList";
import { gradients } from "@/lib/gradients";
```

## Code Review Checklist

- [ ] Uses only `<AppText>` for text
- [ ] Uses only `<AppButton>` for buttons
- [ ] Uses only `<CardShell>` for cards
- [ ] Uses only predefined colors (no hex)
- [ ] Uses shared `inputStyles` for forms
- [ ] Uses correct product terminology
- [ ] TypeScript is typed (no `any`)
- [ ] Imports organized
- [ ] Component is shared or page-specific

## Future: Splitting Add-Drink

When stable, split `app/add-drink/page.tsx` into:
```
components/add-drink/
├── GateScreen.tsx
├── CreateTabForm.tsx
├── JoinTabForm.tsx
├── CurrentTabHub.tsx
├── AddDrinkForm.tsx
├── CurrentTabHero.tsx
├── GoalProgress.tsx
└── ...
```

Do not split first. Get flow working and stable first.
