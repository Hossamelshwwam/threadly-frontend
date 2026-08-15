import { describe, expect, it } from "vitest";
import useRegisterSchema from "./useRegisterSchema";

describe("useRegisterSchema", () => {
  it("returns the correct error message for invalid data", () => {
    const result = useRegisterSchema.safeParse({});

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name is required");
      expect(result.error.issues[1].message).toBe("Invalid email");
      expect(result.error.issues[2].message).toBe("Password is required");
      expect(result.error.issues[3].message).toBe(
        "Confirm password is required",
      );
    }
  });

  it("returns the correct error message for invalid name and password length", () => {
    const result = useRegisterSchema.safeParse({
      name: "12",
      email: "test@test.com",
      password: "12345",
      confirmPassword: "123456",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Name must be at least 3 characters",
      );
      expect(result.error.issues[1].message).toBe("At least 8 characters");
    }
  });

  it("returns the correct error message for invalid confirm password", () => {
    const result = useRegisterSchema.safeParse({
      name: "123",
      email: "test@test.com",
      password: "12345678",
      confirmPassword: "1234567",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Passwords do not match");
    }
  });

  it("returns the correct result for valid data", () => {
    const result = useRegisterSchema.safeParse({
      name: "123",
      email: "test@test.com",
      password: "12345678",
      confirmPassword: "12345678",
    });

    expect(result.success).toBe(true);
  });
});
