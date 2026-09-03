/**
 * Client & Server Honeypot Form Protection Utility for NPO.
 * Defends public donation, volunteer, and inquiry forms from spam bots without annoying CAPTCHAs.
 */

export interface HoneypotPayload {
  [key: string]: unknown;
  _website_hp?: string;
  _hp_timestamp?: number | string;
}

export interface HoneypotValidationResult {
  isSpam: boolean;
  reason?: "HONEYPOT_FIELD_FILLED" | "SUBMITTED_TOO_FAST" | "INVALID_TIMESTAMP" | "TIMESTAMP_EXPIRED";
}

const MIN_HUMAN_INTERACTION_MS = 1500; // 1.5 seconds minimum
const MAX_FORM_LIFETIME_MS = 1000 * 60 * 60 * 24; // 24 hours

export function generateHoneypotFields(): { _website_hp: string; _hp_timestamp: number } {
  return {
    _website_hp: "",
    _hp_timestamp: Date.now(),
  };
}

export function validateHoneypot(
  payload: HoneypotPayload,
  now = Date.now()
): HoneypotValidationResult {
  // 1. Honeypot field must be completely empty
  if (payload._website_hp !== undefined && payload._website_hp !== null && String(payload._website_hp).trim() !== "") {
    return { isSpam: true, reason: "HONEYPOT_FIELD_FILLED" };
  }

  // 2. Validate timestamp
  const ts = Number(payload._hp_timestamp);
  if (!ts || isNaN(ts) || ts <= 0) {
    return { isSpam: true, reason: "INVALID_TIMESTAMP" };
  }

  const elapsed = now - ts;

  // 3. Submissions faster than 1.5s are bots
  if (elapsed < MIN_HUMAN_INTERACTION_MS) {
    return { isSpam: true, reason: "SUBMITTED_TOO_FAST" };
  }

  // 4. Stale forms (>24h) are rejected
  if (elapsed > MAX_FORM_LIFETIME_MS) {
    return { isSpam: true, reason: "TIMESTAMP_EXPIRED" };
  }

  return { isSpam: false };
}
