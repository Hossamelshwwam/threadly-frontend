import { describe, expect, it } from "vitest";
import useResetPasswordSchema from "./useResetPasswordSchema";

describe("useResetPasswordSchema", () => {
  it("returns the correct error message for invalid data", () => {
    const result = useResetPasswordSchema.safeParse({});

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password is required");
      expect(result.error.issues[1].message).toBe(
        "Confirm password is required",
      );
    }
  });
  it("returns the correct error message for invalid password length", () => {
    const result = useResetPasswordSchema.safeParse({
      password: "12345",
      confirmPassword: "123456",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("At least 8 characters");
    }
  });
  it("returns the correct error message for invalid confirm password", () => {
    const result = useResetPasswordSchema.safeParse({
      password: "12345678",
      confirmPassword: "1234567",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Passwords don't match");
    }
  });
  it("returns the correct result for valid data", () => {
    const result = useResetPasswordSchema.safeParse({
      password: "12345678",
      confirmPassword: "12345678",
    });

    expect(result.success).toBe(true);
  });
});
