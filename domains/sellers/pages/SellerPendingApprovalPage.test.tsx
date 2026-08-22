import { sellerStoreApi } from "@/domains/sellers/api/seller-store.api";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SellerPendingApprovalPage from "./SellerPendingApprovalPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

const pushMock = vi.fn();
const logoutMock = vi.fn();

vi.mock("@/domains/sellers/api/seller-store.api", () => ({
  sellerStoreApi: {
    getMyStore: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock("@/shared/hooks/useLogout", () => ({
  default: () => ({ logout: logoutMock }),
}));

describe("Seller Pending Approval Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows the skeleton while store status is being fetched", async () => {
    vi.mocked(sellerStoreApi.getMyStore).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<SellerPendingApprovalPage />, { wrapper: createWrapper() });

    expect(
      screen.queryByText(/store review in progress/i),
    ).not.toBeInTheDocument();

    expect(sellerStoreApi.getMyStore).toHaveBeenCalled();
  });

  it("renders the review-in-progress state with the store name", async () => {
    vi.mocked(sellerStoreApi.getMyStore).mockResolvedValue({
      data: { status: "pending", storeName: "Vintage Threads" },
    } as any);

    render(<SellerPendingApprovalPage />, { wrapper: createWrapper() });

    expect(
      await screen.findByText(/store review in progress/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/vintage threads/i)).toBeInTheDocument();
    expect(screen.getByText(/under review/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /check approval status/i }),
    ).toBeInTheDocument();
  });

  it("redirects to seller dashboard when the store is approved", async () => {
    vi.mocked(sellerStoreApi.getMyStore).mockResolvedValue({
      data: { status: "approved", storeName: "Vintage Threads" },
    } as any);

    render(<SellerPendingApprovalPage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/seller");
    });
  });

  it("refetches the store status when clicking check approval status", async () => {
    const user = userEvent.setup();

    vi.mocked(sellerStoreApi.getMyStore).mockResolvedValue({
      data: { status: "pending", storeName: "Vintage Threads" },
    } as any);

    render(<SellerPendingApprovalPage />, { wrapper: createWrapper() });

    await screen.findByText(/store review in progress/i);

    await user.click(
      screen.getByRole("button", { name: /check approval status/i }),
    );

    await waitFor(() => {
      expect(sellerStoreApi.getMyStore).toHaveBeenCalledTimes(2);
    });
  });

  it("calls logout when clicking sign out", async () => {
    const user = userEvent.setup();

    vi.mocked(sellerStoreApi.getMyStore).mockResolvedValue({
      data: { status: "pending", storeName: "Vintage Threads" },
    } as any);

    render(<SellerPendingApprovalPage />, { wrapper: createWrapper() });

    await screen.findByText(/store review in progress/i);

    await user.click(screen.getByRole("button", { name: /sign out/i }));

    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});
