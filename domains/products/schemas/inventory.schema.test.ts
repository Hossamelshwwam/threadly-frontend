import { describe, expect, it } from "vitest";
import {
  createVariantSchema,
  restockVariantSchema,
  updateVariantSchema,
} from "./inventory.schema";

describe("createVariantSchema", () => {
  it("returns the correct result for valid data", () => {
    const result = createVariantSchema.safeParse({
      sku: "TSHIRT-BLK-XL",
      size: "XL",
      color: "Midnight Black",
      stock: 25,
      price: 299.99,
    });

    expect(result.success).toBe(true);
  });

  it("fails when required fields are missing", () => {
    const result = createVariantSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("returns the correct error message for a too-short SKU", () => {
    const result = createVariantSchema.safeParse({
      sku: "",
      size: "XL",
      color: "Black",
      stock: 10,
      price: 100,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "SKU reference identifier is required",
      );
      expect(result.error.issues[0].path[0]).toBe("sku");
    }
  });

  it("returns the correct error message for missing size", () => {
    const result = createVariantSchema.safeParse({
      sku: "TSHIRT-BLK-XL",
      size: "",
      color: "Black",
      stock: 10,
      price: 100,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Size dimension is required",
      );
      expect(result.error.issues[0].path[0]).toBe("size");
    }
  });

  it("returns the correct error message for missing color", () => {
    const result = createVariantSchema.safeParse({
      sku: "TSHIRT-BLK-XL",
      size: "XL",
      color: "",
      stock: 10,
      price: 100,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Color attribute is required",
      );
      expect(result.error.issues[0].path[0]).toBe("color");
    }
  });

  it("returns the correct error message for negative stock", () => {
    const result = createVariantSchema.safeParse({
      sku: "TSHIRT-BLK-XL",
      size: "XL",
      color: "Black",
      stock: -5,
      price: 100,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Stock quantity cannot be negative",
      );
      expect(result.error.issues[0].path[0]).toBe("stock");
    }
  });

  it("accepts zero stock", () => {
    const result = createVariantSchema.safeParse({
      sku: "TSHIRT-BLK-XL",
      size: "XL",
      color: "Black",
      stock: 0,
      price: 100,
    });

    expect(result.success).toBe(true);
  });

  it("returns the correct error message for negative price", () => {
    const result = createVariantSchema.safeParse({
      sku: "TSHIRT-BLK-XL",
      size: "XL",
      color: "Black",
      stock: 10,
      price: -5,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Price metric must be a positive number",
      );
      expect(result.error.issues[0].path[0]).toBe("price");
    }
  });
});

describe("updateVariantSchema", () => {
  it("accepts a partial update with a single field", () => {
    const result = updateVariantSchema.safeParse({ price: 349.5 });

    expect(result.success).toBe(true);
  });

  it("accepts an empty update payload", () => {
    const result = updateVariantSchema.safeParse({});

    expect(result.success).toBe(true);
  });

  it("still validates provided field values", () => {
    const result = updateVariantSchema.safeParse({ stock: -3 });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Stock quantity cannot be negative",
      );
      expect(result.error.issues[0].path[0]).toBe("stock");
    }
  });
});

describe("restockVariantSchema", () => {
  it("accepts a positive quantity", () => {
    const result = restockVariantSchema.safeParse({ quantity: 10 });

    expect(result.success).toBe(true);
  });

  it("rejects zero and negative quantities", () => {
    const zeroResult = restockVariantSchema.safeParse({ quantity: 0 });
    const negativeResult = restockVariantSchema.safeParse({ quantity: -2 });

    expect(zeroResult.success).toBe(false);
    expect(negativeResult.success).toBe(false);

    if (!negativeResult.success) {
      expect(negativeResult.error.issues[0].message).toBe(
        "Restock increment value must be at least 1",
      );
      expect(negativeResult.error.issues[0].path[0]).toBe("quantity");
    }
  });
});
