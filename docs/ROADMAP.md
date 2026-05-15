# Roadmap

## Current Status (v0.1.0)

**Done**:
- ✅ Design system foundation
- ✅ Page structure (Feed, Tabs, Add-Drink, Leaderboard, Receipts)
- ✅ Current Tab Hub flow
- ✅ Mock data & local state
- ✅ Drink tracking model
- ✅ Pint score calculations

**Not Done**:
- ❌ Database integration (Supabase)
- ❌ User authentication
- ❌ Photo/video upload & storage
- ❌ Real-time updates
- ❌ Invite system
- ❌ Mobile app (native)

---

## Phase 1: Stabilization (Next)

**Goal**: Clean up codebase, prepare for database integration.

### Tasks
1. **Design System Audit & Cleanup** (4–6 hours)
   - Fix Receipts page
   - Consolidate design token files
   - Verify Tailwind color tokens
   - Audit all pages for violations

2. **Component Splitting** (2–3 hours, if stable)
   - Split `app/add-drink/page.tsx`
   - Move sub-components to `components/add-drink/`

3. **Testing** (1–2 hours)
   - Manual test all flows
   - Check responsive design
   - Verify no console errors

---

## Phase 2: Backend Integration (1–2 sprints)

**Goal**: Connect to Supabase, enable real data persistence.

### Tasks
- Supabase setup & schema design
- Authentication (sign up/login)
- API integration (replace local state)
- Real-time listeners
- Error handling

**Effort**: 8–12 hours

---

## Phase 3: Media Upload (1 sprint)

**Goal**: Enable photo & video upload.

**Effort**: 4–6 hours

---

## Phase 4: Social Features (1–2 sprints)

**Goal**: Invites, join requests, comments, reactions.

**Effort**: 6–8 hours

---

## Phase 5: Advanced Features (Future)

Stretch goals:
- Drink ratings & reviews
- Custom drink types
- Groups (recurring friend groups)
- Analytics dashboard
- Mobile app (React Native)
- Email digests

---

## Timeline

| Milestone | Target | Status |
|---|---|---|
| MVP (v0.1.0) | ✅ Done | Complete |
| Stabilized codebase | 1 week | In progress |
| Database integration | 2–3 weeks | Not started |
| Photo upload | 4 weeks | Not started |
| Social features | 6–8 weeks | Not started |
| Beta launch | 10 weeks | Planned |

---

## Open Questions

- Deployment platform? (Vercel, AWS, other)
- Payment processing? (Stripe for receipts?)
- Geo-location tagging?
- Integration with bar/brewery APIs?
- Offline mode?
