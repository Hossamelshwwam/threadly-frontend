import { describe, expect, it } from "vitest";
import {
  createCategorySchema,
  updateCategorySchema,
} from "./category.schema";

describe("createCategorySchema", () => {
  it("returns the correct result for valid data", () => {
    const result = createCategorySchema.safeParse({
      name: "Leather Accessories",
      parentId: "cat-1",
    });

    expect(result.success).toBe(true);
  });

  it("succeeds without an optional parent category", () => {
    const result = createCategorySchema.safeParse({ name: "T-Shirts" });

    expect(result.success).toBe(true);
  });

  it("returns the correct error message for a short name", () => {
    const result = createCategorySchema.safeParse({ name: "a" });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Category name must be at least 2 characters",
      );
    }
  });

  it("rejects a whitespace-only name", () => {
    const result = createCategorySchema.safeParse({ name: "   " });

    expect(result.success).toBe(false);
  });
});

describe("updateCategorySchema", () => {
  it("accepts a partial update with a single field", () => {
    const result = updateCategorySchema.safeParse({ name: "Bags" });

    expect(result.success).toBe(true);
  });

  it("accepts an empty update payload", () => {
    const result = updateCategorySchema.safeParse({});

    expect(result.success).toBe(true);
  });
});
