# Design System

## Overview

The Tab uses a cohesive, mobile-first design system built with Tailwind CSS and shared React components. All UI must use the established system; one-off styles are not permitted.

## Color Palette

**Core Colors** (defined in `lib/design-tokens.ts`):
- `ink` — #001524 (primary text/dark elements)
- `background` / `off-white` — #FAFAF8 (page background)
- `card` / `white` — #FFFFFF (card backgrounds)
- `muted` — #8B8680 (secondary/disabled text)
- `border` / `medium-gray` — #D4D0CC (dividers, borders)
- `dark-gray` — #6B7280 (tertiary text)
- `light-gray` — #F3F4F6 (hover states, subtle backgrounds)

**Accent Colors**:
- `orange` — #ff7d00 (primary CTA, live indicators)
- `teal` — #15616d (secondary CTA, navigation, links)
- `papaya` — #ffecd1 (subtle backgrounds)

**Rule**: Use Tailwind color classes, never raw hex values in components.

## Typography System

**Component**: `AppText` (required for all text)

**Variants**: brand, pageTitle, cardTitle, body, bodySmall, meta, tinyLabel, statValue, statLabel

**Rule**: Every text element must use `<AppText variant="...">`. Do not use hardcoded text classes.

## Button System

**Component**: `AppButton` (required for all buttons)

**Variants**: primary, secondary, outline, muted, ghost, danger
**Sizes**: sm, md, lg, icon

**Rule**: Always use `<AppButton variant="..." size="...">`. Do not create custom button styles.

## Card System

**Component**: `CardShell` (required for all cards)

**Variants**: default, feed, compact, score

**Rule**: All card-like containers must use `<CardShell variant="...">`. Do not use custom div-based cards.

## Spacing System

- Vertical gap between sections: `mt-6` (on `<PageSection>`)
- Horizontal padding: `px-4` (on `<PageSection>`)
- Component gaps: `mt-4` within sections
- Tight gaps: `mt-2` for related elements
- Max width: `max-w-md` (mobile-first)
- Bottom padding: `pb-44` (account for bottom nav)

## Form Inputs

**Shared exports** from `lib/inputStyles.ts`:
- `inputStyles` — text input base styles
- `selectStyles` — select dropdown base styles
- `textareaStyles` — textarea base styles

**Rule**: Always reference shared input classes. Do not define form styles in-component.

## Shared Components

**Container**: AppPage, PageSection, AppHeader, CardShell
**Navigation**: BackButton, SectionHeader
**Info**: InfoPill, StatusBadge, FilterPills, SegmentedControl
**User**: UserAvatar, AvatarStack

## Layout Principles

1. **Mobile-First**: All designs target mobile (max-w-md)
2. **Consistent Padding**: Always `px-4` for horizontal padding
3. **Rhythm**: `mt-6` between sections, `mt-4` between components
4. **Shadows Over Borders**: Use shadows for depth
5. **White Cards**: Cards are always white on off-white background
6. **No Raw Styles**: Every component must use the design system
