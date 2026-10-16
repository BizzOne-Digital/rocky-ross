import { describe, expect, it } from "vitest";
import { RESERVED_SLUGS, BUSINESS_SLUGS } from "./constants";

describe("reserved slugs", () => {
  it("blocks admin and api", () => {
    expect(RESERVED_SLUGS.has("admin")).toBe(true);
    expect(RESERVED_SLUGS.has("api")).toBe(true);
  });
  it("business slugs do not conflict", () => {
    for (const slug of BUSINESS_SLUGS) {
      expect(RESERVED_SLUGS.has(slug)).toBe(false);
    }
  });
});
