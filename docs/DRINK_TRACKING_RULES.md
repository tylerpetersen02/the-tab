# Drink Tracking Rules

## Overview

This document defines how drinks are categorized, measured, counted, and contribute to user stats and scoring.

---

## Drink Types & Ounces

### Standard Drinks (Count Toward Pint Score)

| Type | Default Oz | Countable | Notes |
|------|-----------|-----------|-------|
| Beer | 12 | ✓ Yes | Standard serving |
| Cider | 12 | ✓ Yes | Apple ciders, hard ciders |
| Wine | 5 | ✓ Yes | Glass of wine standard |
| Seltzer | 12 | ✓ Yes | Hard seltzers, drinks without alcohol |
| Other | Custom | ✓ Yes | User enters oz amount (1–24 oz typical) |

### Bonus Drinks (Tracked But Do NOT Count Toward Pint Score)

| Type | Default Oz | Countable | Notes |
|------|-----------|-----------|-------|
| Shot | 1.5 | ✗ No | Spirits/liqueur (0–2 oz) |
| Cocktail | 2 | ✗ No | Mixed drink (1.5–3 oz) |

---

## Ounce Tracking

### What Gets Counted Toward "Contribution Oz"

**Standard drinks** → Add their oz value:
- Beer: +12 oz
- Cider: +12 oz
- Wine: +5 oz
- Seltzer: +12 oz
- Other: +custom oz (user input)

**Bonus drinks** → Add their oz value BUT do NOT contribute to pint score:
- Shot: +1.5 oz (counted in total, not in pint calculation)
- Cocktail: +2 oz (counted in total, not in pint calculation)

### Example Contribution Breakdown

**Member A adds**:
- 2 beers (24 oz)
- 1 wine (5 oz)
- 1 shot (1.5 oz)
- 1 cocktail (2 oz)

**Totals**:
- **Total Oz**: 32.5 oz (all drinks)
- **Pint Score**: (24 + 5) / 16 = 1.8125 → **1.8 pints** (rounded)
- **Beers**: 2
- **Wine**: 1
- **Shots**: 1
- **Cocktails**: 1

---

## Pint Score Calculation

### Formula
```
Pint Score = (eligible oz) / 16 oz per pint
Rounded to 1 decimal place (banker's rounding)
```

### Eligible Ounces
**Include**:
- Beer (12 oz each)
- Cider (12 oz each)
- Wine (5 oz each)
- Seltzer (12 oz each)
- Other (custom oz)

**Exclude**:
- Shots (1.5 oz) — tracked separately
- Cocktails (2 oz) — tracked separately

### Rounding
- 16 oz = 1.0 pint
- 17 oz = 1.0 pint (16.0625, rounds down)
- 24 oz = 1.5 pints
- 31 oz = 1.9 pints
- 32 oz = 2.0 pints
- 40 oz = 2.5 pints

### Display
- Always show 1 decimal: "1.0", "1.5", "2.0", "2.5"
- Never round to whole number (always include .0)

**Implementation**:
```javascript
function calculatePintScore(eligibleOz) {
  return Math.floor((eligibleOz / 16) * 10) / 10;
}
```

---

## Drink Breakdown

### What Is Shown

On current tab's dashboard, show aggregated counts:
- Beers: N
- Wine: N
- Cider: N
- Seltzer: N
- Other: N (if any added)
- Shots: N
- Cocktails: N

**Visual**: Bar chart, grid of icons/counts, or list format. Should be at-a-glance, not detailed.

### What Is NOT Shown at Tab Level
- Individual oz amounts (aggregate only)
- Member-specific drink breakdowns (shown in members detail only)

---

## Member Drink Stats

### Per-Member Tracking

Each member has:
- `contributionOz`: Total oz from standard drinks only
- `beers`: Count of beers
- `wine`: Count of wines
- `cider`: Count of ciders
- `seltzer`: Count of seltzers
- `bonusDrinks`: Count of shots + cocktails combined (or separate: `shots`, `cocktails`)

### Leaderboard Ranking

**Primary Sort**: Pint Score (highest first)
**Tie-Breaker**: Total oz (if same pint score)
**Secondary Sort**: Beers (if same oz)

---

## Validation & Edge Cases

### Input Validation

**Drink Type Selection**:
- Required field (must select)
- Dropdown (no free text)

**Custom Oz Amount** (for "Other"):
- Only shown if "Other" selected
- Must be number between 1–30 oz
- Decimal allowed (8.5 oz)
- Error if blank, non-numeric, or outside range

### Edge Cases

**What if user adds drink then leaves?**
- Drink count still attributed to user
- Pint score still counted in leaderboard (historical)
- Visible in "Recent Activity" showing their name

**What if user joins mid-tab?**
- Start contribution with 0 oz
- Can immediately add drinks

**What if ounce goal is 0?**
- Show no progress bar
- Just show current oz accumulated

**What if multiple shots/cocktails added?**
- Each tracked individually in activity
- Bonus drink count increments for each

---

## Future Considerations

### Not Yet Implemented
- Custom drink types (e.g., "Sake", "Prosecco")
- Alcohol by volume (ABV) — currently ignored
- Calorie tracking
- Cost tracking
- Multiple cocktail sizes
- Shots beyond 1.5 oz

### When to Add Custom Types
- If users request specific drinks (scotch, specific beers)
- When we add "custom drink" feature with user-defined oz

### When to Exclude Drinks From Contribution
- Today: Never (all drinks counted)
- Future: Could exclude "water", "coffee" if added
- Future: Could weight drinks differently (e.g., light beer = 10 oz)

---

## UI Display Rules

### On Current Tab ("Your Contribution" Card)
```
Your Contribution
───────────────────
Beers: 2
Ounces: 24
Pint Score: 1.5
───────────────────
(Shots/Cocktails only shown if present: "Bonus: 1 shot")
```

### In Members List
```
┌─ Tyler (isCurrentUser) ─┐
│ Avatar: TP              │
│ Ounces: 24             │
│ Beers: 2               │
│ Pint Score: 1.5        │
└────────────────────────┘
```

### On Leaderboard
```
1. Mike        2.0 pints
2. Dan         1.9 pints  ↑
3. Tyler       1.5 pints  ↓
```

### In Drink Breakdown (Tab Level)
```
Beers:      ████ 12
Wine:       ██ 5
Ciders:     ███ 8
Shots:      █ 2
Cocktails:  █ 1
```

### In Recent Activity
```
[Tyler just now]
Tyler added a beer

[Mike 2 min ago]
Mike added a shot

[Dan 5 min ago]
Dan added wine
```

---

## Related Documentation

See:
- **TAB_SYSTEM.md** — Member properties, contribution tracking
- **PRODUCT_LANGUAGE.md** — "oz", "pint", drink type terminology
- **PAGE_PURPOSES.md** — UI display in current tab, leaderboard, feed
