import { describe, expect, it } from "vitest";
import {
  createProductSchema,
  updateProductSchema,
} from "./product.schema";

describe("createProductSchema", () => {
  it("returns the correct result for valid data", () => {
    const result = createProductSchema.safeParse({
      name: "Premium Cotton T-Shirt",
      description: "Soft 100% organic cotton t-shirt",
      categoryId: "cat-1",
      basePrice: 250,
      status: "draft",
      attributes: [{ key: "Material", value: "Cotton" }],
    });

    expect(result.success).toBe(true);
  });

  it("fails when required fields are missing", () => {
    const result = createProductSchema.safeParse({});

    expect(result.success).toBe(false);
  });

  it("returns the correct error message for missing category", () => {
    const result = createProductSchema.safeParse({
      name: "T-Shirt",
      description: "A nice t-shirt",
      categoryId: "",
      basePrice: 100,
      status: "draft",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Category is required");
      expect(result.error.issues[0].path[0]).toBe("categoryId");
    }
  });

  it("returns the correct error message for negative price", () => {
    const result = createProductSchema.safeParse({
      name: "T-Shirt",
      description: "A nice t-shirt",
      categoryId: "cat-1",
      basePrice: -5,
      status: "draft",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Base price must be a positive number",
      );
      expect(result.error.issues[0].path[0]).toBe("basePrice");
    }
  });

  it("rejects an invalid status value", () => {
    const result = createProductSchema.safeParse({
      name: "T-Shirt",
      description: "A nice t-shirt",
      categoryId: "cat-1",
      basePrice: 100,
      status: "published",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].path[0]).toBe("status");
    }
  });
});

describe("updateProductSchema", () => {
  it("accepts a partial update with a single field", () => {
    const result = updateProductSchema.safeParse({ name: "New Name" });

    expect(result.success).toBe(true);
  });

  it("accepts an empty update payload", () => {
    const result = updateProductSchema.safeParse({});

    expect(result.success).toBe(true);
  });

  it("still validates provided field values", () => {
    const result = updateProductSchema.safeParse({ basePrice: -5 });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Base price must be a positive number",
      );
      expect(result.error.issues[0].path[0]).toBe("basePrice");
    }
  });
});
