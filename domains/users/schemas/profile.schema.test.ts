import { describe, expect, it } from "vitest";
import { updateProfileSchema } from "./profile.schema";

describe("updateProfileSchema", () => {
  it("returns the correct error message for missing data", () => {
    const result = updateProfileSchema.safeParse({});

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Invalid input: expected string, received undefined",
      );
    }
  });

  it("returns the correct error message for short name", () => {
    const result = updateProfileSchema.safeParse({
      name: "a",
      phone: "0123456789",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Name must be at least 2 characters",
      );
    }
  });

  it("succeeds when phone is omitted", () => {
    const result = updateProfileSchema.safeParse({
      name: "John Doe",
    });

    expect(result.success).toBe(true);
  });

  it("succeeds when phone is null", () => {
    const result = updateProfileSchema.safeParse({
      name: "John Doe",
      phone: null,
    });

    expect(result.success).toBe(true);
  });

  it("returns the correct result for valid data", () => {
    const result = updateProfileSchema.safeParse({
      name: "John Doe",
      phone: "0123456789",
    });

    expect(result.success).toBe(true);
  });
});
