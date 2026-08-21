import { buyerOrdersApi } from "@/domains/orders/api/orders.api";
import { reviewsApi } from "@/domains/reviews/api/reviews.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AccountWriteReviewPage from "./AccountWriteReviewPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

const pushMock = vi.fn();

vi.mock("@/domains/orders/api/orders.api", () => ({
  buyerOrdersApi: {
    getPendingReviews: vi.fn(),
  },
}));

vi.mock("@/domains/reviews/api/reviews.api", () => ({
  reviewsApi: {
    submitReview: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockPendingItem = {
  _id: "item-1",
  productId: {
    _id: "prod-1",
    name: "Classic T-Shirt",
    images: ["/tshirt.jpg"],
  },
  sellerId: {
    _id: "seller-1",
    storeName: "Threadly Store",
  },
};

describe("Account Write Review Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while pending reviews are being fetched", async () => {
    vi.mocked(buyerOrdersApi.getPendingReviews).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<AccountWriteReviewPage orderItemId="item-1" />, {
      wrapper: createWrapper(),
    });

    expect(await screen.findByText(/loading/i)).toBeInTheDocument();
  });

  it("shows not found state when the item does not exist", async () => {
    vi.mocked(buyerOrdersApi.getPendingReviews).mockResolvedValue({
      data: [],
    } as any);

    render(<AccountWriteReviewPage orderItemId="item-1" />, {
      wrapper: createWrapper(),
    });

    expect(
      await screen.findByText(/item not found or already reviewed/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go back/i }),
    ).toHaveAttribute("href", "/account/reviews/pending");
  });

  it("renders the item context header for the requested item", async () => {
    vi.mocked(buyerOrdersApi.getPendingReviews).mockResolvedValue({
      data: [mockPendingItem],
    } as any);

    render(<AccountWriteReviewPage orderItemId="item-1" />, {
      wrapper: createWrapper(),
    });

    expect(
      await screen.findByText(/classic t-shirt/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/purchased from threadly store/i),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting without rating or comment", async () => {
    const user = userEvent.setup();

    vi.mocked(buyerOrdersApi.getPendingReviews).mockResolvedValue({
      data: [mockPendingItem],
    } as any);

    render(<AccountWriteReviewPage orderItemId="item-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByText(/classic t-shirt/i);
    await user.click(
      screen.getByRole("button", { name: /publish review/i }),
    );

    expect(
      await screen.findByText(/please select a rating/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/comment must be at least 5 characters/i),
    ).toBeInTheDocument();
    expect(reviewsApi.submitReview).not.toHaveBeenCalled();
  });

  it("submits the review and redirects on success", async () => {
    const user = userEvent.setup();

    let resolveSubmit!: (value: any) => void;

    vi.mocked(buyerOrdersApi.getPendingReviews).mockResolvedValue({
      data: [mockPendingItem],
    } as any);
    vi.mocked(reviewsApi.submitReview).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSubmit = resolve;
        }),
    );

    render(<AccountWriteReviewPage orderItemId="item-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByText(/classic t-shirt/i);

    await user.click(screen.getByRole("button", { name: /rate 4 stars/i }));
    await user.type(
      screen.getByRole("textbox"),
      "Great quality, fits perfectly!",
    );
    await user.click(
      screen.getByRole("button", { name: /publish review/i }),
    );

    expect(
      await screen.findByText(/submitting your review/i),
    ).toBeInTheDocument();

    resolveSubmit({});

    expect(
      await screen.findByText(/review submitted successfully/i),
    ).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/account/reviews/pending");
  });

  it("shows API error message when submitting the review fails", async () => {
    const user = userEvent.setup();

    let rejectSubmit!: (error: any) => void;

    vi.mocked(buyerOrdersApi.getPendingReviews).mockResolvedValue({
      data: [mockPendingItem],
    } as any);
    vi.mocked(reviewsApi.submitReview).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectSubmit = reject;
        }),
    );

    render(<AccountWriteReviewPage orderItemId="item-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByText(/classic t-shirt/i);

    await user.click(screen.getByRole("button", { name: /rate 5 stars/i }));
    await user.type(screen.getByRole("textbox"), "Awesome product!");
    await user.click(
      screen.getByRole("button", { name: /publish review/i }),
    );

    expect(
      await screen.findByText(/submitting your review/i),
    ).toBeInTheDocument();

    rejectSubmit({
      response: {
        data: {
          message: "error in the document",
        },
      },
    });

    expect(
      await screen.findByText(/error in the document/i),
    ).toBeInTheDocument();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
