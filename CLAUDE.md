# FIKSR — Claude Code Context File

> Read this file at the start of every session. This is the full project memory for Fiksr (Pty) Ltd.

---

## Company

- **Name:** Fiksr (Pty) Ltd (formerly Werkr)
- **Type:** Registered South African SaaS startup
- **Product:** WhatsApp + email automation platform for small service businesses (plumbers, electricians, contractors)
- **Core features:** Lead capture, AI quote generation, branded PDF quotes, auto follow-ups, job tracking, CRM, owner dashboard
- **Model inspiration:** Jem HR (jemhr.com) — raised $3.3M delivering HR tools via WhatsApp. Fiksr applies same delivery layer to business operations.
- **Contact:** hello@fiksr.co.za
- **Demo URL:** https://werkr-milosam3s-projects.vercel.app

---

## Owner

- **Name:** Richard
- **GitHub:** Milosam3
- **Machine:** Mac
- **Tools installed:** Claude Code, Vercel CLI

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | Next.js 14, Tailwind CSS, shadcn/ui |
| Deployment | Vercel (auto-deploy from GitHub) |
| Version control | GitHub (Milosam3) |
| Automation | Make.com (3 core workflows planned) |
| Database | Airtable (primary), Supabase (future) |
| WhatsApp API | 360dialog |
| Email delivery | Resend.com (free tier) |
| AI quotes | Anthropic API |
| PDF generation | pdf-lib or Documint (under evaluation) |
| Onboarding stack | Tally (forms) + Airtable + Softr (client dashboards) |

---

## Pricing Tiers

| Tier | Price/mo | Includes |
|---|---|---|
| Starter | R349 | 1 user, 30 quotes, basic bot, plain text quotes |
| Growth | R699 | 3 users, unlimited quotes, follow-ups, dashboard, branded PDF quotes |
| Pro | R1,199 | Full CRM, team, branded bot, priority support, branded PDF quotes |

- Once-off onboarding fee: R500 per client

---

## Feature Status

| Feature | Status | Notes |
|---|---|---|
| Landing page | Live | Deployed on Vercel |
| WhatsApp demo simulation | Live | Animated bot flow, Flow A & B |
| Quote generator | Live (mocked) | No API credits yet — mock output |
| Owner dashboard | Live | Mock data, Kanban + CRM |
| Auto follow-ups page | Live | Sequence builder + mock table |
| Inbound leads page | Live | Lead form + mock data + notifications |
| Real WhatsApp API | Not built | Requires 360dialog setup |
| Real database | Not built | Requires Supabase or Airtable |
| Auth / multi-tenant | Not built | Each client needs own login |
| Make.com automation | Not built | Manual workflows pending |
| Live AI quote generation | Not built | Needs Anthropic API credits (R75) |

---

## Build Priority (Ordered)

1. **Activate Anthropic API credits** → enable live AI quote generation
2. **Email channel via Resend.com:**
   - Add "Preferred contact method" field (WhatsApp/Email) to lead capture form
   - Add Channel field to Airtable
   - Build email quote delivery path
3. **Branded PDF quotes:**
   - Client uploads logo + business details during onboarding → stored in Airtable
   - Quote generator pulls client details → generates branded PDF
   - Tier logic: Starter = plain text, Growth/Pro = branded PDF
   - Tools: pdf-lib or Documint
4. **Per-client onboarding flow:** Tally form + Airtable base + Softr dashboard (Zeus Electrical = first client)
5. **Activate Make.com Workflow 1** (inbound leads automation)
6. **Real WhatsApp API integration** via 360dialog
7. **Live database** (Airtable or Supabase)
8. **Auth + multi-tenant architecture**
9. **Target: 3 beta clients**

---

## Make.com Workflows (Planned)

1. Inbound lead capture → Airtable → WhatsApp notification to owner
2. Quote form → PDF → WhatsApp delivery to client
3. Auto follow-up sequence (48hr no-reply trigger)

---

## First Client

- **Zeus Electrical** — awaiting confirmation as first paying client
- Full onboarding flow to be run once confirmed: Tally form + Airtable base + Softr dashboard

---

## Revenue Scenarios

| Scenario | Clients | MRR |
|---|---|---|
| Break even | ~5 | R3,495 |
| Part-time income | 20 | R13,980 |
| Full-time replacement | 50 | R34,950 |
| Target | 122 (mixed) or 71 (Pro only) | R85,000+ |

---

## Operating Costs

| Tool | Cost/mo |
|---|---|
| Make.com Pro | R300 |
| 360dialog WhatsApp API | R200 + usage |
| Documint PDF | R150 |
| Airtable Team | R400 (at 10+ clients) |
| Vercel Pro | R350 (at scale) |
| Anthropic API | ~R75 |
| **Early stage total** | **~R650/mo** |

---

## Key Dev Rules (Follow Every Session)

- Claude Code branches push to named branches, NOT master. Always do manual `git merge` step after.
- Give bash commands one at a time with clear purpose. Never batch into scripts.
- When something fails, Richard pastes terminal output. Respond with single precise fix.
- No filler. No narration. Result first.
- Mocking complex integrations is valid — ship prototype first, build real later.

---

## Phase Roadmap

| Phase | Timeline | Goal |
|---|---|---|
| 1 | Now — 30 days | 3 paying beta clients at R349/mo via Make.com + Airtable (manual delivery) |
| 2 | 30 — 60 days | 10 clients, real WhatsApp API, invoice generator |
| 3 | 60 — 90 days | Supabase backend, auth, multi-tenant dashboard, raise price to R699+ |
| 4 | 90 — 180 days | 50 clients, part-time support hire, outbound to trade associations |
| 5 | 6 — 12 months | 100+ clients, consider white-label or external funding |

---

## White-Label Path (Future)

- Sell Fiksr as white-label to trade associations or franchises
- 1 deal = 50,200 tradespeople under one contract
- R15,000,R50,000/mo per partner
- 2,3 deals = R85k target met

---

*Last updated: May 2026. Update this file when stack, status, or priorities change.*
