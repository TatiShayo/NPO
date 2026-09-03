import { describe, it, expect } from "vitest";
import {
  generateHoneypotFields,
  validateHoneypot,
} from "./honeypot";

describe("NPO Honeypot Bot Protection", () => {
  it("approves genuine user submission after appropriate time delay", () => {
    const fields = generateHoneypotFields();
    // Simulate submission after 5 seconds
    const simulatedNow = fields._hp_timestamp + 5000;

    const result = validateHoneypot(
      {
        name: "Generous Donor",
        amount: 100,
        ...fields,
      },
      simulatedNow
    );

    expect(result.isSpam).toBe(false);
    expect(result.reason).toBeUndefined();
  });

  it("flags bot when hidden honeypot field is filled", () => {
    const fields = generateHoneypotFields();
    const simulatedNow = fields._hp_timestamp + 4000;

    const result = validateHoneypot(
      {
        name: "Bot Sender",
        ...fields,
        _website_hp: "http://spam-payload.com",
      },
      simulatedNow
    );

    expect(result.isSpam).toBe(true);
    expect(result.reason).toBe("HONEYPOT_FIELD_FILLED");
  });

  it("flags bot when form is submitted faster than human threshold (< 1.5s)", () => {
    const fields = generateHoneypotFields();
    // Instant submission (200ms)
    const simulatedNow = fields._hp_timestamp + 200;

    const result = validateHoneypot(
      {
        name: "Automated Script",
        ...fields,
      },
      simulatedNow
    );

    expect(result.isSpam).toBe(true);
    expect(result.reason).toBe("SUBMITTED_TOO_FAST");
  });

  it("flags bot when timestamp is missing or malformed", () => {
    const result = validateHoneypot({
      name: "Spoofed Request",
      _website_hp: "",
      _hp_timestamp: "not-a-number",
    });

    expect(result.isSpam).toBe(true);
    expect(result.reason).toBe("INVALID_TIMESTAMP");
  });
});
