import { describe, expect, it } from "vitest";
import { useRegisterStoreSchema } from "./useRegisterStoreSchema";

describe("useRegisterStoreSchema", () => {
  it("returns the correct error messages for empty data", () => {
    const result = useRegisterStoreSchema.safeParse({
      storeName: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Store name must be at least 3 characters",
      );
      expect(result.error.issues[1].message).toBe("Bank name is required");
      expect(result.error.issues[2].message).toBe(
        "Account holder name is required",
      );
      expect(result.error.issues[3].message).toBe(
        "Valid IBAN/Account Number is required",
      );
    }
  });

  it("returns the correct error message for short account number", () => {
    const result = useRegisterStoreSchema.safeParse({
      storeName: "Vintage Threads",
      bankName: "CIB",
      accountName: "Hossam Attia",
      accountNumber: "EG12000",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Valid IBAN/Account Number is required",
      );
    }
  });

  it("succeeds without the optional description", () => {
    const result = useRegisterStoreSchema.safeParse({
      storeName: "Vintage Threads",
      bankName: "CIB",
      accountName: "Hossam Attia",
      accountNumber: "EG120000000000000000000000",
    });

    expect(result.success).toBe(true);
  });

  it("returns the correct result for valid data", () => {
    const result = useRegisterStoreSchema.safeParse({
      storeName: "Vintage Threads",
      description: "Unique vintage clothing",
      bankName: "CIB",
      accountName: "Hossam Attia",
      accountNumber: "EG120000000000000000000000",
    });

    expect(result.success).toBe(true);
  });
});
