# CONTEXT.md — Ubiquitous Domain Language (NPO)

## Core Entities
- **DonorContribution**: Financial gift designated for specific non-profit campaigns or general funds.
- **HoneypotShield**: Multi-layered invisible bot detector evaluating submission speed and trap input fills.
- **TaxReceipt**: Legal acknowledgement document with immutable sequential numbering and organization EIN.
- **DunningSchedule**: Automated schedule of payment retries and friendly notifications for failed cards.

## Domain Invariants
- Submissions completing in under 2.5 seconds are flagged as automated bot attacks and dropped silently.
- Tax receipt sequence numbers must be strictly contiguous without gaps.

## Forbidden Terminology
- Do not call donations "charges"; use "Contribution".
- Do not call donors "customers"; use "Donor".
