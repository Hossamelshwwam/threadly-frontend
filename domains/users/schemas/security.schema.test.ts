import { describe, expect, it } from "vitest";
import { changePasswordSchema } from "./security.schema";

describe("changePasswordSchema", () => {
  it("returns the correct error message for empty data", () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Current password is required",
      );
      expect(result.error.issues[1].message).toBe(
        "New password must be at least 8 characters long",
      );
      expect(result.error.issues[2].message).toBe(
        "Please confirm your new password",
      );
    }
  });

  it("returns the correct error message for short new password", () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: "12345678",
      newPassword: "12345",
      confirmNewPassword: "12345",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "New password must be at least 8 characters long",
      );
    }
  });

  it("returns the correct error message when passwords do not match", () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: "12345678",
      newPassword: "12345678",
      confirmNewPassword: "12345679",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Passwords do not match. Please try again.",
      );
      expect(result.error.issues[0].path[0]).toBe("confirmNewPassword");
    }
  });

  it("returns the correct result for valid data", () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: "12345678",
      newPassword: "87654321",
      confirmNewPassword: "87654321",
    });

    expect(result.success).toBe(true);
  });
});
