import { sellersApi } from "@/domains/sellers/api/sellers.api";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminSellerDetailPage from "./AdminSellerDetailPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";
import type { SellerProfile } from "../types/seller.types";

vi.mock("@/domains/sellers/api/sellers.api", () => ({
  sellersApi: {
    adminGetSeller: vi.fn(),
    adminUpdateSellerStatus: vi.fn(),
  },
}));

const mockSeller: SellerProfile = {
  _id: "seller-1",
  bankDetails: {
    accountNumber: "EG120001000000000012345678",
    accountName: "Hossam Attia",
    bankName: "CIB",
  },
  userId: {
    _id: "user-1",
    name: "Hossam Attia",
    email: "hossam@test.com",
  },
  storeName: "Attia Threads",
  description: "Premium apparel and accessories",
  storeSlug: "attia-threads",
  status: "pending",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("Admin Seller Detail Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(sellersApi.adminGetSeller).mockResolvedValue({
      data: mockSeller,
    } as any);
  });

  it("fetches the seller profile by id", async () => {
    vi.mocked(sellersApi.adminGetSeller).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<AdminSellerDetailPage id="seller-1" />, {
      wrapper: createWrapper(),
    });

    expect(sellersApi.adminGetSeller).toHaveBeenCalledWith("seller-1");
    expect(
      screen.queryByText(/store lifecycle controls/i),
    ).not.toBeInTheDocument();
  });

  it("shows the not found state when the seller does not exist", async () => {
    vi.mocked(sellersApi.adminGetSeller).mockResolvedValue({} as any);

    render(<AdminSellerDetailPage id="seller-1" />, {
      wrapper: createWrapper(),
    });

    expect(
      await screen.findByText(/seller profile data not found/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to sellers/i }),
    ).toHaveAttribute("href", "/admin/sellers");
  });

  it("renders the seller profile details", async () => {
    render(<AdminSellerDetailPage id="seller-1" />, {
      wrapper: createWrapper(),
    });

    expect(await screen.findByText("Attia Threads")).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByText(/store lifecycle controls/i)).toBeInTheDocument();
  });

  it("approves a pending seller and shows success feedback", async () => {
    const user = userEvent.setup();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(sellersApi.adminUpdateSellerStatus).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<AdminSellerDetailPage id="seller-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByText("Attia Threads");
    await user.click(screen.getByRole("button", { name: /approve store/i }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: /approve store/i,
      }),
    );

    expect(
      await screen.findByText(/updating status/i),
    ).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/status updated successfully/i),
    ).toBeInTheDocument();
    expect(sellersApi.adminUpdateSellerStatus).toHaveBeenCalledWith(
      "seller-1",
      { status: "approved", adminNote: undefined },
    );
  });

  it("sends the typed admin note when approving", async () => {
    const user = userEvent.setup();

    vi.mocked(sellersApi.adminUpdateSellerStatus).mockResolvedValue(
      {} as any,
    );

    render(<AdminSellerDetailPage id="seller-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByText("Attia Threads");
    await user.type(
      screen.getByPlaceholderText(/append decision feedback statement/i),
      "Documents verified",
    );
    await user.click(screen.getByRole("button", { name: /approve store/i }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: /approve store/i,
      }),
    );

    expect(
      await screen.findByText(/status updated successfully/i),
    ).toBeInTheDocument();
    expect(sellersApi.adminUpdateSellerStatus).toHaveBeenCalledWith(
      "seller-1",
      { status: "approved", adminNote: "Documents verified" },
    );
  });

  it("suspends a seller after requiring the authorization checkbox", async () => {
    const user = userEvent.setup();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(sellersApi.adminUpdateSellerStatus).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<AdminSellerDetailPage id="seller-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByText("Attia Threads");

    const confirmButton = () =>
      within(screen.getByRole("dialog")).getByRole("button", {
        name: /suspend store/i,
      });

    await user.click(screen.getByRole("button", { name: /suspend store/i }));

    const dialog = screen.getByRole("dialog");
    const confirm = confirmButton();
    expect(confirm).toBeDisabled();

    await user.click(
      within(dialog).getByLabelText(
        "I authorize freezing operations for this store profile",
      ),
    );
    await user.click(confirm);

    expect(
      await screen.findByText(/updating status/i),
    ).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/status updated successfully/i),
    ).toBeInTheDocument();
    expect(sellersApi.adminUpdateSellerStatus).toHaveBeenCalledWith(
      "seller-1",
      { status: "suspended", adminNote: undefined },
    );
  });

  it("shows error feedback when updating the status fails", async () => {
    const user = userEvent.setup();

    let rejectUpdate!: (error: any) => void;

    vi.mocked(sellersApi.adminUpdateSellerStatus).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectUpdate = reject;
        }),
    );

    render(<AdminSellerDetailPage id="seller-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByText("Attia Threads");
    await user.click(screen.getByRole("button", { name: /approve store/i }));
    await user.click(
      within(screen.getByRole("dialog")).getByRole("button", {
        name: /approve store/i,
      }),
    );

    expect(
      await screen.findByText(/updating status/i),
    ).toBeInTheDocument();

    rejectUpdate({
      response: {
        data: {
          message: "error in the document",
        },
      },
    });

    expect(
      await screen.findByText(/failed to update status/i),
    ).toBeInTheDocument();
  });
});
