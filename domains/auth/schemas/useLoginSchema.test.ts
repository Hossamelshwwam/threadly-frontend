import { describe, expect, it } from "vitest";
import useLoginSchema from "./useLoginSchema";

describe("useLoginSchema", () => {
  it("returns the correct error message for invalid data", () => {
    const result = useLoginSchema.safeParse({});

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email");
      expect(result.error.issues[1].message).toBe("Password is required");
    }
  });
  it("returns the correct error message for invalid password length", () => {
    const result = useLoginSchema.safeParse({
      email: "test@test.com",
      password: "12345",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Password must be at least 6 characters",
      );
    }
  });
  it("returns the correct result for valid data", () => {
    const result = useLoginSchema.safeParse({
      email: "test@test.com",
      password: "123456",
    });

    expect(result.success).toBe(true);
  });
});
