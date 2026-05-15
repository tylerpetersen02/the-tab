# Product Language & Terminology

## Overview

This document defines the terminology, concepts, and language used throughout The Tab app. Consistency in language is critical for user understanding and developer communication.

---

## Core Concepts

### Tab
A **Tab** is a social drinking session with a group of friends.
- **Alternative names (AVOID)**: "Session", "Round", "Event" — Use "Tab" consistently
- **States**:
  - **Open/Live** — Currently active, in progress
  - **Closed/Completed** — Archived, history record
  - **Joined** — You are a member
  - **Left** — You left but history is preserved
- **Actions**: "Open a Tab", "Close a Tab", "Join a Tab", "Leave a Tab"

### Opening a Tab
Creating or starting a new Tab.
- **Terminology**: "Open Tab", not "Start Session", "Create Session", "Begin Event"
- **User perspective**: "I'm opening a tab with my friends"
- **Related**: "Start Tab" as button label

### Closing a Tab
Ending a Tab and archiving it to history/recaps.
- **Terminology**: "Close Tab", not "End Session", "Finish", "Complete"
- **User perspective**: "We closed the tab after dinner"
- **Related**: "End Tab" as button label (less preferred but acceptable)
- **After close**: Tab moves to history, doesn't disappear, preserves all data

### Members
People in a Tab. Also called "participants" or "friends" in UI copy (less formally).
- **Roles**:
  - **Tab Creator** — Opened the tab (rarely distinct)
  - **Member** — Joined and contributing
  - **Left** — Was a member, left tab (but history preserved)
- **You** — Always refer to current user's perspective ("Your contribution", "You opened")

### Drinks
Any beverage consumed and tracked during a Tab.
- **Types**:
  - **Beer** — 12 oz standard
  - **Cider** — 12 oz standard
  - **Wine** — 5 oz standard
  - **Seltzer** — 12 oz standard
  - **Other** — Custom fluid oz (user enters amount)
  - **Shot** — 1.5 oz bonus (doesn't count toward pint score)
  - **Cocktail** — 2 oz bonus (doesn't count toward pint score)
- **Abbreviations**: "oz", "Oz" (fluid ounces), never "ml"
- **Language**: "Add Drink", "Track Drink", "Log Drink" (not "record", "post")

### Ounces Tracked
The total fluid ounces a user has consumed in a Tab.
- **Formula**: Drinks (beer/cider/wine/seltzer/other) + bonus drinks (shots/cocktails)
- **UI**: "Ounces" (not "oz total", "total oz")
- **Context**: "Mike: 32 oz"

### Pint Score
A user's contribution to the Tab's goal, measured in "pints".
- **Formula**: Eligible ounces / 16 oz per pint
- **Eligible drinks**: Beer, Cider, Wine, Seltzer, Other (NOT shots/cocktails yet)
- **UI**: "Pint Score" or "Score" (not "pints consumed", "pint count")
- **Display**: "2.0" (always 1 decimal)
- **Used in**: Leaderboard, Tab dashboard

### Ounce Goal
The Tab's target ounces for collective consumption (optional).
- **UI**: "Goal: 96 oz" or "Ounce Goal"
- **Progress**: Visual bar showing current vs. goal
- **Optional**: Not all tabs have goals

### Visibility/Privacy
How others can find and join a Tab.
- **Private** — Only invited members (default)
- **Invite Only** — Invite-only, same as Private
- **Open** — Anyone with code can join
- **UI**: Show as InfoPill badge ("Private", "Invite Only")

### Join Code
A unique 4–6 character code to join a Tab (if Visibility is "Open").
- **Format**: Alphanumeric, uppercase (e.g., "AB3X9Q")
- **UI**: "Join Code", "Tab Code" (consistent)
- **Display**: Always copyable, easy to share

### Hero Card / Tab Header
The primary card at top of current Tab showing:
- Tab title
- Location (optional)
- Elapsed time
- "Live" badge
- Cover image (optional)

### Drink Breakdown
Chart or list showing quantity of each drink type consumed in Tab.
- **Purpose**: Visualize what members are drinking (beer vs. wine vs. shots)
- **Display**: Bar chart or small icons with counts

### Recent Activity / Activity Feed
Timeline of actions in the Tab.
- **Events**: "Tyler added a beer", "Mike joined", "Dan left", "Bonus: shot added"
- **Timestamp**: Relative (e.g., "5 minutes ago"), not absolute

### Left a Tab / Leaving
When a user leaves the Tab.
- **Behavior**: User is marked as "left", but their history remains
- **UI**: "Leave Tab" button, "Left At" timestamp
- **Visibility**: Still shown in members list (faded or marked as "Left")

### Active Tab
The current Tab the user is in (on their phone/session).
- **Storage**: Local state (eventually localStorage/Supabase)
- **Persistence**: Remembered across app sessions (future)

---

## UI/Page Language

### Bottom Navigation Pages
- **Feed** — "Feed", social content feed (live updates, posts, activity)
- **Tabs** — "Tabs", list of tabs (current and history)
- **Add/+ Button** — "Add Drink" in label, but page title is "Current Tab Hub" or shown in hero
- **Leaderboard** — "Leaderboard", ranking/competition
- **Profile** — "Profile" (future, not yet designed)

### Buttons & CTAs
- "Open Tab" — Create new tab
- "Join with Code" — Enter code to join existing tab
- "Add Drink" — Log a drink
- "Invite Friends" — Share tab/send invites
- "Leave Tab" — Depart from tab
- "Close Tab" — End the tab
- "Finish" — Secondary close button label (less preferred)
- "View Tab" — Open tab detail

### Stats & Numbers
- "Your Contribution" — Card showing user's drinks, oz, pint score
- "Members" — Count of people in tab
- "Beers: 8" — Drink count display
- "2.0" — Pint score decimal format

### Empty States
- "No open tabs" — When no active tab
- "No activity yet" — When tab just started
- "No members" — When alone in tab

### Filters & Toggles
- "This Week" vs. "All Time" — Time period for Leaderboard
- "My Drinks" vs. "Friend Activity" — Feed toggle (future)

---

## Voice & Tone

### Brand Voice
- **Fun** — Playful, not corporate
- **Premium** — Polished, considered design
- **Social** — Celebration of friends and moments
- **Scrapbook-like** — Memorable, nostalgic feel
- **Bar-themed** — Nods to bar culture without excess

### Tone Rules
- ✅ "Open a tab with the crew"
- ✅ "Cheers! Tab closed"
- ✅ "Tyler's leading with 3 pints"
- ❌ "Session started" (use "Tab opened")
- ❌ "Final tallies" (too corporate)
- ❌ "User 1 added drink" (too technical)

---

## Terminology Consistency Checklist

- [ ] Always "Tab", not "Session", "Round", "Event"
- [ ] Always "Open Tab" / "Close Tab", not "Start", "End", "Begin"
- [ ] Always "oz" for ounces, never "ml"
- [ ] Always "Pint Score", not "Pints Consumed"
- [ ] Always "Members", not "Participants", "Users", "Attendees"
- [ ] Always "Leave Tab", not "Depart", "Exit", "Quit"
- [ ] Always "Add Drink", not "Track", "Log", "Report"
- [ ] Always "Private" / "Invite Only" / "Open", not "Closed", "Restricted"
- [ ] Always "Join Code", not "Access Code", "Tab ID"
- [ ] Bottom nav pages consistent across all pages
- [ ] Active user always "You" or "Your" in UI

---

## Related Documentation

See:
- **DESIGN_SYSTEM.md** — Color, typography, component usage
- **TAB_SYSTEM.md** — Tab states, permissions, flow
- **DRINK_TRACKING_RULES.md** — Drink types, ounce calculations
