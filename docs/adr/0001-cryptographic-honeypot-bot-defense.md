# ADR 0001: Cryptographic Honeypot Defense and Contiguous Tax Receipts

## Context
Non-profit organizations face severe Stripe account termination risks when malicious actors use donation forms to test stolen credit cards.

## Decision
1. **Cryptographic Honeypot Shield**: Inspect submission duration and invisible trap fields before touching payment APIs.
2. **Contiguous Tax Receipts**: Generate auditable sequential receipt numbers.
3. **Intelligent Dunning**: Automated recurring donor recovery without aggressive collection tactics.

## Consequences
- **Positive**: 100% carding bot mitigation with zero CAPTCHA drop-off from genuine donors.
- **Negative**: Submissions by ultra-fast automated browser extensions must be carefully calibrated.
