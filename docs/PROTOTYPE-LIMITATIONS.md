# Prototype Limitations

NEXHIBIT is a high-fidelity frontend prototype. It demonstrates product direction, user flows, interaction design, and presentation-ready interface quality, but it is not production-ready.

## What Is Mocked

- Student data
- Employer data
- Company names and profiles
- Event schedules and booth capacity
- Conversation threads
- Visitor streams
- Outcome stories
- Admin activity
- Dashboard metrics and charts

Company names are used as prototype mock data for demonstration only.

## Not Implemented

- Real authentication
- Role-based access control
- Protected routes
- Server-side session validation
- Database persistence
- Backend/API layer
- Real ZJUT data sync
- Real student verification
- Real employer verification
- Real QR scanning
- Signed event tokens
- Consent logging
- Audit logs
- Secure employer access controls
- Secure data export/delete
- PIPL compliance workflow
- Real payment processing
- Real subscriptions
- Real invoices, receipts, fapiao, refunds, or saved payment methods

## Smart Match

Smart Match is a deterministic, rule-based prototype score. It uses category fit, skill overlap, English level, HSK/Mandarin level, and a deterministic offset.

It is not validated AI recruiting intelligence, predictive hiring, automated decision-making, or a fairness-audited scoring model.

## QR Scanner

The scanner is simulated. In a production system, QR codes would need signed event tokens, expiry, replay protection, consent-aware access rules, and server-side audit records.

## Demo Persistence

Some interactions use React state or browser-local behavior to make the prototype feel complete:

- Demo login role in `localStorage`
- Shortlist movement
- Recruiter notes
- Message drafts
- Event slot booking
- Scanner history
- Settings toggles
- Demo exports
- Simulated billing and payment-method UI state
- Pitch drafts, portfolio pin/remove actions, connection requests, and readiness actions
- Company-fit, follow-up-likelihood, and post-event report signals

These actions do not persist to a database.

## Prototype Login

Login stores only the selected demo role in browser `localStorage` under `nexhibit-demo-session`.

Logout clears that browser-local key, shows a toast, and redirects to `/login`.

This is not real authentication, does not use secure cookies, and does not protect routes from direct navigation.

## Prototype Billing

Pricing, upgrades, checkout, invoices, receipts, fapiao, refunds, saved payment methods, subscriptions, and admin revenue dashboards are simulation-only.

No real payment is processed. No card, bank, Alipay, WeChat Pay, Apple Pay, UnionPay, invoice, fapiao, refund, or subscription data is sent to a provider or saved to a backend.

## Production Requirements

A real deployment would require:

- Authentication and session management
- Role-based access control
- Protected routes and server authorization checks
- Database schema for students, employers, events, messages, consent, and activity
- API layer with validation
- Real university verification workflow
- Employer verification workflow with evidence and approvals
- Consent records and visibility audit trail
- Signed QR token infrastructure
- Secure data export and deletion
- Logging, monitoring, and backup strategy
- PIPL compliance review
- Payment-provider integration and server-side billing records
- Security review and threat modeling
