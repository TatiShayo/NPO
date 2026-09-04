# SPEC 001: Non-Profit Donation Engine & Anti-Carding Shield

## Problem Statement
Charities suffer costly carding attack chargebacks from stolen card testing and lose recurring donors to unhandled card expirations.

## Solution
A donation platform featuring invisible cryptographic honeypot defenses, automatic compliant tax receipts, and smart recurring dunning.

## User Stories
1. As a donor, I want to contribute without solving annoying CAPTCHA puzzles, so that giving is effortless.
2. As a charity treasurer, I want carding testing bots completely blocked, so that our Stripe account remains in good standing.

## Implementation Decisions
- Honeypot engine in `src/utils/honeypot.ts`.
- Receipt generation in `src/utils/receipts.ts`.

## Testing Decisions
- Seam: `src/utils/honeypot.test.ts`.
- Verify silent rejection of rapid-fire and trap-field-filled submissions.
