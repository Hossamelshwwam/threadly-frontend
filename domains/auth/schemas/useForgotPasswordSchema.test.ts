import { describe, it, expect } from "vitest";
import useForgotPasswordSchema from "./useForgotPasswordSchema";
describe("useForgotPasswordSchema", () => {
  it("returns the correct error message for invalid email", () => {
    const result = useForgotPasswordSchema.safeParse({
      email: "invalid email",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Please enter a valid email");
    }
  });

  it("returns the correct result for valid email", () => {
    const result = useForgotPasswordSchema.safeParse({
      email: "test@test.com",
    });

    expect(result.success).toBe(true);
  });
});
