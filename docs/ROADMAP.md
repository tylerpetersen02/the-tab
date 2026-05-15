# Roadmap & Future Work

## Overview

This document outlines the planned work to move The Tab from a local prototype to a production-ready, real-time social drinking tracker.

---

## Phase 0: Foundation (Current)
**Status**: IN PROGRESS
**Goal**: Stabilize codebase and establish documentation

- ✅ Create comprehensive docs (DESIGN_SYSTEM, PRODUCT_LANGUAGE, etc.)
- ✅ Audit design system violations (see TECH_DEBT.md)
- ⏳ Extract monolithic add-drink page (planned refactor)
- ⏳ Fix design system violations (cleanup pass)

---

## Phase 1: Backend Integration (Next)
**Status**: PLANNED
**Goal**: Wire Supabase and enable real-time sync, persistence, and multi-user

### 1.1 Supabase Setup
- [ ] Create Supabase project
- [ ] Define schema:
  - `users` — profile, auth
  - `tabs` — tab metadata
  - `tab_members` — membership, joinedAt, leftAt
  - `drinks` — drink logs (user, type, oz, createdAt)
  - `activities` — activity feed (user, action, detail, createdAt)
- [ ] Set up Row-Level Security (RLS) policies
  - Users can only see/modify their own data and tabs they're in
  - Tab creators can manage tab settings
- [ ] Generate types from schema (Supabase TypeScript)

### 1.2 Authentication
- [ ] Add Supabase Auth (email/password, Google SSO later)
- [ ] Create login/signup pages
- [ ] Add auth context wrapper
- [ ] Protect routes (redirect to login if not authenticated)
- [ ] Show loading state during auth check

### 1.3 State → Query Migration
- [ ] Replace `useState(activeTab)` with `useQuery(currentTab)`
- [ ] Replace drink form submit with `useMutation(addDrink)`
- [ ] Replace createTab/joinTab with `useMutation`
- [ ] Replace leaveTab/closeTab with `useMutation`
- [ ] Add error handling (toast notifications)

### 1.4 Real-Time Subscriptions
- [ ] Subscribe to `drinks` table for current tab
  - Trigger: New drink added by any member
  - Effect: Update UI immediately
- [ ] Subscribe to `tab_members` table
  - Trigger: Member joins or leaves
  - Effect: Update members list, activity feed
- [ ] Subscribe to `activities` table
  - Trigger: Any activity recorded
  - Effect: Update activity feed in real-time
- [ ] Test with multiple browser tabs/windows

### 1.5 Persistent Storage (localStorage Bridge)
- [ ] Store activeTab ID in localStorage
- [ ] On app load:
  - Check if activeTab exists in localStorage
  - Fetch from Supabase to restore state
  - Clear localStorage if tab closed
- [ ] Auto-save when activeTab changes
- [ ] This bridges until full Supabase sync

### 1.6 Testing
- [ ] Test end-to-end flow: Open tab → add drinks → see live updates
- [ ] Test with 2 users simultaneously (in separate browser)
- [ ] Test permissions: Can't modify other user's drinks
- [ ] Test errors: Invalid codes, network failures, etc.

---

## Phase 2: Core Feature Completion
**Status**: PLANNED
**Goal**: Add missing core features identified in design

### 2.1 User Profiles
- [ ] Create `/profile` page (currently stub)
- [ ] Display user stats:
  - Total oz lifetime
  - Total beers lifetime
  - Pint score totals (this month, all-time)
  - Favorite drink type
  - Badges/achievements
- [ ] Edit profile:
  - Display name
  - Avatar customization (color, initial, image upload)
  - Privacy settings
- [ ] User follow list (future: see friends' public stats)

### 2.2 Buddies / Friend List
- [ ] Create `/buddies` page (currently stub)
- [ ] Search for friends by name/email
- [ ] Add to friend list (with mutual confirmation)
- [ ] View friend stats (if public)
- [ ] Quick "Invite to Tab" from buddies list
- [ ] Show online status (if in active tab)

### 2.3 Receipts / Recap System
- [ ] When tab is closed, generate recap:
  - **Stats**: Total oz, beers, winner, etc.
  - **Timeline**: Photos/activity from session (future)
  - **Shareable**: Generate shareable recap link
  - **Gallery**: Save recap to history with cover photo
- [ ] Create `/receipts` page showing past recaps
- [ ] Recap card design (similar to feed posts)
- [ ] Option to "Favorite" a recap (save memories)
- [ ] Search/filter recaps by date/attendees

### 2.4 Badges & Achievements
- [ ] Define badges:
  - "First Tab" — Open your first tab
  - "Speed Demon" — Add 5 drinks in 10 minutes
  - "Team Player" — Join 5 tabs
  - "Leaderboard King" — Win leaderboard 3 times
  - "Variety Pack" — Consume 6 different drink types
  - "Century Club" — 100+ oz in one tab
  - (etc. — design with product)
- [ ] Badge logic in Supabase functions or frontend
- [ ] Display badges on profile
- [ ] Notification when badge earned
- [ ] Badge feed posts (showing when friend earns badge)

---

## Phase 3: Social & Engagement
**Status**: PLANNED
**Goal**: Enhance social features, realism, and sharing

### 3.1 Invitations & Sharing
- [ ] Email invites (send join code via email)
- [ ] SMS invites (Twilio or Supabase SMS addon)
- [ ] Social media share (Twitter, Instagram stories)
- [ ] QR code for join code (scan to auto-join)

### 3.2 Reactions & Comments
- [ ] Add emoji reactions to activity (👍, 🍻, etc.)
- [ ] Comments on recaps (minimal, fun)
- [ ] Reaction bar on feed posts

### 3.3 Feed Algorithm
- [ ] Prioritize live tabs (boost to top)
- [ ] Show friend activity over stranger activity
- [ ] Time decay (newer posts ranked higher)
- [ ] Engagement ranking (liked/reacted posts higher)

### 3.4 Notifications
- [ ] Push notifications (web/native later):
  - Friend opened a tab (join?)
  - You're falling behind (catch-up?)
  - Friend earned badge
  - Tab about to close soon
- [ ] In-app notification center
- [ ] Settings: Enable/disable by type
- [ ] Desktop notification API

### 3.5 Leaderboard Enhancements
- [ ] "Challenge Mode": Head-to-head tab leaderboards
- [ ] Historical leaderboards (all-time, this month, this year)
- [ ] Leaderboard podium photo share (screenshot-friendly)
- [ ] Statistics dashboard (trends, averages)

---

## Phase 4: Data & Analytics (Future)
**Status**: PLANNED (Lower priority)
**Goal**: Help users understand their drinking patterns

### 4.1 Analytics Dashboard
- [ ] Personal stats:
  - Total oz (lifetime, this month, this week)
  - Favorite drinks (by count)
  - Most drinks in one tab
  - Longest tab (elapsed time)
  - Tab frequency (avg tabs per week)
- [ ] Group stats (aggregated from tabs you're in):
  - Most common drink
  - Peak hours (when most tabs happen)
  - Seasonal trends
- [ ] Visualizations: Charts, graphs (Chart.js or Recharts)

### 4.2 Recap Generation (AI — Future)
- [ ] AI summary of tab: "You and 3 friends had a brewery crawl session. Mike led with 3.2 pints!"
- [ ] AI recap with humor/personality
- [ ] Generate fun stats ("19 beers, zero regrets")
- [ ] Export recap as PDF or image

---

## Phase 5: Monetization (Long-term Future)
**Status**: CONCEPT
**Goal**: Sustainable business model

### 5.1 Premium Features
- [ ] Premium tiers:
  - **Free**: Basic tab tracking, 10 tabs/month history
  - **Pro**: Unlimited tabs, advanced analytics, recap exports, early features
  - **Team**: For bars/venues (group tabs, custom branding)

### 5.2 Ad-Free Experience
- [ ] Show ads on free tier (or minimal)
- [ ] Remove ads for Pro users

### 5.3 Partnerships
- [ ] Bar/venue integrations (tabs registered at specific location)
- [ ] Sponsorship opportunities
- [ ] Affiliate links (bar reviews, beer recommendations)

---

## Phase Timeline (Aspirational)

| Phase | Timeline | Key Deliverables |
|-------|----------|------------------|
| 0 (Now) | 1 week | Docs, cleanup, add-drink refactor |
| 1 | 3 weeks | Supabase backend, auth, real-time |
| 2 | 4 weeks | Profiles, buddies, receipts, badges |
| 3 | 3 weeks | Invites, reactions, notifications |
| 4 | Ongoing | Analytics, insights |
| 5 | TBD | Premium features |

**Notes**:
- Timelines are estimates only
- Priorities may shift based on feedback
- Each phase can be tested independently
- Not a hard deadline project

---

## Success Metrics (Future)

### User Engagement
- [ ] DAU (daily active users)
- [ ] Tab creation rate (tabs per user per week)
- [ ] Average session length (time in active tab)
- [ ] Member count per tab (avg, median)

### Retention
- [ ] 1-month retention rate
- [ ] 3-month retention rate
- [ ] Churn rate

### Social
- [ ] Share rate (users who share tabs/recaps)
- [ ] Invite acceptance rate
- [ ] Average friend count per user
- [ ] Comments/reactions per recap

### Business (When Applicable)
- [ ] Free-to-paid conversion
- [ ] Revenue per user (if monetized)
- [ ] Customer acquisition cost

---

## Known Blockers / Decisions Pending

1. **Auth Strategy**: Email/password, Google, Apple, SMS?
   - Recommendation: Start with email, add Google later

2. **Monetization Decision**: Free forever, freemium, or premium?
   - Recommendation: Free forever for now, plan for freemium later

3. **Venue Integration**: Should bars/venues have special role?
   - Recommendation: Out of scope for Phase 1, consider in Phase 5

4. **Mobile App**: Native iOS/Android needed?
   - Recommendation: Start web-only (responsive), evaluate native later

5. **Offline Support**: Work without internet?
   - Recommendation: No offline for now (requires complex sync)

---

## Deferred / Out of Scope (For Now)

- ❌ Dark mode (design system exists, not wired to UI toggle)
- ❌ Internationalization (i18n)
- ❌ Video/photos in tabs (design researched, not built)
- ❌ Live streaming integration
- ❌ Venue check-in (Foursquare, Google Maps API)
- ❌ Payment integration (if monetization happens, ticket later)
- ❌ Admin dashboard (CMS for badges, promos)

---

## Dependencies & Integrations (Future)

### Supabase
- [ ] PostgreSQL database
- [ ] Real-time subscriptions
- [ ] Row-level security
- [ ] Edge functions (for complex logic)

### Email
- [ ] Sendgrid or Resend (for invite emails, notifications)
- [ ] Email templates (design + code)

### SMS (Optional)
- [ ] Twilio (for SMS invites, alerts)
- [ ] Conditional logic (opt-in per user)

### Analytics
- [ ] Posthog or Mixpanel (event tracking)
- [ ] Privacy-first (no PII, GDPR compliant)

### Payment (If Monetization)
- [ ] Stripe (subscriptions, one-time)
- [ ] Subscription management UI

### AI (If Recap Generation)
- [ ] OpenAI API or similar
- [ ] Prompt engineering for fun recaps
- [ ] Cost per generation

---

## Development Process

### Per-Phase Approach
1. **Design** (if needed): Finalize UI/UX
2. **Spec**: Document requirements (like CLAUDE.md)
3. **Build**: Implement with tests
4. **Test**: QA, edge cases
5. **Launch**: Beta, gather feedback, iterate

### Code Review
- [ ] Design system compliance (DESIGN_SYSTEM.md)
- [ ] Implementation rules (AI_IMPLEMENTATION_RULES.md)
- [ ] Type safety (TypeScript strict)
- [ ] Performance (lighthouse)
- [ ] Accessibility (WCAG AA)

### Testing
- [ ] Unit tests (components, utilities)
- [ ] Integration tests (flows, state changes)
- [ ] E2E tests (user journeys)
- [ ] Manual QA (mobile, browsers)

---

## Related Documentation

See:
- **TECH_DEBT.md** — Cleanup tasks before Phase 1
- **CURRENT_ARCHITECTURE.md** — How to extend codebase
- **AI_IMPLEMENTATION_RULES.md** — Code quality standards
- **DESIGN_SYSTEM.md** — Implement UI consistently
