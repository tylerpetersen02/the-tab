# Drink Tracking Rules

## Drink Types & Categorization

### Standard Drinks (Eligible for Ounces)

**Beer**
- Default size: 16 oz
- Variable sizes: 4, 5, 6, 8, 10, 12, 16, 19, 20, 22, 24, 32 oz
- Pint score impact: 1 beer = 1.0 pint (16 oz / 16)

**Wine**
- Default size: 5 oz
- Variable sizes available
- 16 oz wine = 1.0 pint score

**Seltzer** (Non-Alcoholic)
- Default size: 12 oz
- Variable sizes available
- 16 oz seltzer = 1.0 pint score

### Bonus Drinks (Do NOT Count toward Ounces)

These are tracked but do not affect ounce goals or pint score.

**Shot**
- Fixed (no size selection)
- Types: Vodka, Tequila, Whiskey, Rum, Gin, Other
- Tracked separately from beer count

**Cocktail**
- Fixed (no size selection)
- Types: Margarita, Mojito, Daiquiri, Old Fashioned, Piña Colada, Other
- Tracked separately from beer count

## Pint Score Calculation

```
Pint Score = (Beer_oz + Wine_oz + Seltzer_oz) / 16
```

**Examples**:
- 3 beers (16 oz each) = 48 oz → 3.0 pint score
- 3 beers + 5 shots = 48 oz → 3.0 pint score (shots don't count)

## Contribution Preservation

When a user **leaves a tab**:
- All previous drinks remain on their record
- Contribution history is preserved
- They appear in members list with "left at" indicator
- Their stats still count toward group totals

When a tab is **closed**:
- All contributions are archived
- Stats roll into user's historical record
- Tab appears in "Tab History"

## Drink Display

### In Activity Feed
```
Tyler added Beer · 16 oz
Mike added a Shot (Vodka)
Dan added a Cocktail (Margarita)
```

### In Recent Activity (Current Tab)
```
Tyler added Beer · 16 oz → 2m ago
Mike added a Shot → 5m ago
```

### In Drink Breakdown Card
```
Beers: 8
Wine: 0
Shots: 3
Cocktails: 2
```

## Size Wheel Options

When user selects beer, wine, or seltzer:
```
[4] [5] [6] [8] [10] [12] [16] [19] [20] [22] [24] [32] oz
```

Horizontal scroll, centered on current selection.
