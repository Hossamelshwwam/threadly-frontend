import { describe, expect, it } from "vitest";
import { reviewSchema } from "./review.schema";

describe("reviewSchema", () => {
  it("returns the correct error message for empty data", () => {
    const result = reviewSchema.safeParse({ rating: 0, comment: "" });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Please select a rating");
      expect(result.error.issues[1].message).toBe(
        "Comment must be at least 5 characters",
      );
    }
  });

  it("returns the correct error message for a too long comment", () => {
    const result = reviewSchema.safeParse({
      rating: 5,
      comment: "a".repeat(2001),
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Comment is too long");
    }
  });

  it("returns the correct result for valid data", () => {
    const result = reviewSchema.safeParse({
      rating: 5,
      comment: "Great product, highly recommended!",
    });

    expect(result.success).toBe(true);
  });
});
