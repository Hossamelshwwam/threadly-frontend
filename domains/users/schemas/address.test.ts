import { describe, expect, it } from "vitest";
import { addAddressSchema } from "./address.schema";

describe("add address schema", () => {
  it("rejects invalid address data with correct validation messages", () => {
    const result = addAddressSchema.safeParse({
      label: "",
      street: "abc",
      city: "a",
      state: "a",
      postalCode: "12",
      country: "a",
      phonenumber: "123",
      isDefault: "true",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ["label"],
            message: "Label is required (e.g., Home)",
          }),
          expect.objectContaining({
            path: ["street"],
            message: "Street address is required",
          }),
          expect.objectContaining({
            path: ["city"],
            message: "City is required",
          }),
          expect.objectContaining({
            path: ["state"],
            message: "State/Governorate is required",
          }),
          expect.objectContaining({
            path: ["postalCode"],
            message: "Postal code is required",
          }),
          expect.objectContaining({
            path: ["country"],
            message: "Country is required",
          }),
          expect.objectContaining({
            path: ["phonenumber"],
            message: "Valid phone number is required",
          }),
          expect.objectContaining({
            path: ["isDefault"],
          }),
        ]),
      );
    }
  });

  it("accepts valid address data", () => {
    const result = addAddressSchema.safeParse({
      label: "Home",
      street: "123 Main Street",
      city: "Cairo",
      state: "Cairo",
      postalCode: "11511",
      country: "Egypt",
      phonenumber: "01012345678",
      isDefault: false,
    });

    expect(result.success).toBe(true);
  });
});
