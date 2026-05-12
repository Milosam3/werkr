# Fiksr (Pty) Ltd — Project Context

## What It Is
WhatsApp + email automation SaaS for small service businesses in South Africa (plumbers, electricians, HVAC, etc.). Reduces missed leads, automates quotes, follows up automatically.

## Stack
- **Frontend:** Next.js 14, Tailwind CSS, Vercel
- **Database:** Airtable (mock → live migration planned)
- **WhatsApp:** 360dialog API
- **Email:** Resend
- **AI:** Anthropic API (claude-sonnet-4-20250514)
- **Automation:** Make.com
- **Payments:** TBD (PayFast or Peach preferred, ZAR)

## Pricing (ZAR)
| Tier | Price | Target |
|---|---|---|
| Starter | R349/mo | Solo operators |
| Pro | R699/mo | Small teams |
| Business | R1,199/mo | Multi-van operations |

Revenue target: R85,000+/mo (122 mixed clients or 71 Pro)

## Feature Status
| Feature | Status |
|---|---|
| Landing page | Live |
| Demo flow | Live |
| Quote generator | Live (mocked) |
| Dashboard | Live (mocked) |
| Leads page | Live (mocked) |
| Anthropic API | Not built |
| Email via Resend | Not built |
| Branded PDF quotes | Not built |
| Per-client onboarding | Not built |
| Make.com workflows | Not built |
| Real WhatsApp (360dialog) | Not built |
| Live DB (Airtable) | Not built |
| Auth | Not built |

## Build Priority (in order)
1. **Anthropic API** — Done when: AI generates quote from form input, response renders in UI
2. **Email via Resend** — Done when: quote emails to client + business owner on submission
3. **Branded PDF quotes** — Done when: PDF generated with Fiksr branding, attached to email
4. **Per-client onboarding** — Done when: new client can self-onboard, gets own config
5. **Make.com workflows** — Done when: lead → quote → follow-up triggers without manual action
6. **Real WhatsApp (360dialog)** — Done when: inbound WhatsApp message triggers quote flow
7. **Live DB (Airtable)** — Done when: all leads, quotes, clients persisted & queryable
8. **Auth** — Done when: client can log in, see only their own data

## First Client
Zeus Electrical — awaiting confirmation. Use as pilot for onboarding flow.

## SA-Specific Constraints
- Payments: PayFast or Peach Payments for ZAR billing (not Stripe)
- WhatsApp penetration is primary channel, SMS fallback low priority
- Load shedding: keep everything cloud-hosted, no local infra dependencies
- POPIA compliance required: don't store PII without explicit consent flow
- All pricing, comms, and UI copy in South African English (not US English)

## Dev Rules
- Branch → named branch always, never commit to master/main directly
- No batched bash scripts
- Mock first, then build real, never the reverse
- No filler code, no placeholder logic left in production paths
- Root cause before fix, always. Never patch a symptom.
- Show diffs, not full file rewrites, unless full rewrite explicitly requested
- Plan mode first on any non-trivial feature, confirm skeleton before building
- One thing at a time. Complete and confirm before moving to next.

## Response Style (Claude Code)
- Result first. No preamble.
- Compressed output. Fragments valid.
- Never restate the task.
- No "I'll now...", no "Great!", no summaries of what was just done.
- If blocked or ambiguous: one question, then stop.
