import { describe, expect, it } from "vitest";
import { escapeCsvCell, formatMoney } from "./format";

describe("formatMoney", () => {
  it("formats minor units", () => {
    expect(formatMoney(2500)).toBe("$25.00");
  });
  it("returns null when missing", () => {
    expect(formatMoney(null)).toBeNull();
  });
});

describe("escapeCsvCell", () => {
  it("prefixes formula injection", () => {
    expect(escapeCsvCell("=SUM(A1)")).toMatch(/^"'/);
  });
});
