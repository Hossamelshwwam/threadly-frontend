import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SellerProfileSidebar } from "./SellerProfileSidebar";
import type { SellerProfile } from "../../types/seller.types";

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

function renderSidebar(
  overrides: Partial<Parameters<typeof SellerProfileSidebar>[0]> = {},
) {
  const onUpdateStatus = vi.fn();
  render(
    <SellerProfileSidebar
      seller={mockSeller}
      isUpdating={false}
      onUpdateStatus={onUpdateStatus}
      {...overrides}
    />,
  );
  return { onUpdateStatus };
}

describe("Seller Profile Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the store identity and owner details", () => {
    renderSidebar();

    expect(screen.getByText("Attia Threads")).toBeInTheDocument();
    expect(screen.getByText("@attia-threads")).toBeInTheDocument();
    expect(
      screen.getByText("Premium apparel and accessories"),
    ).toBeInTheDocument();
    expect(screen.getByText("Hossam Attia")).toBeInTheDocument();
    expect(screen.getByText("hossam@test.com")).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
    expect(screen.getByText(/store lifecycle controls/i)).toBeInTheDocument();
  });

  it("shows fallbacks when rating and sales are missing", () => {
    renderSidebar();

    expect(screen.getByText("No reviews")).toBeInTheDocument();
    expect(screen.getByText("No Orders Yet")).toBeInTheDocument();
  });

  it("shows both approve and suspend actions for a pending seller", () => {
    renderSidebar();

    expect(
      screen.getByRole("button", { name: /approve store/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /suspend store/i }),
    ).toBeInTheDocument();
  });

  it("hides the approve action for an approved seller", () => {
    renderSidebar({
      seller: { ...mockSeller, status: "approved" },
    });

    expect(
      screen.queryByRole("button", { name: /approve store/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /suspend store/i }),
    ).toBeInTheDocument();
  });

  it("hides the suspend action for a suspended seller", () => {
    renderSidebar({
      seller: { ...mockSeller, status: "suspended" },
    });

    expect(
      screen.queryByRole("button", { name: /suspend store/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /approve store/i }),
    ).toBeInTheDocument();
  });

  it("approves the seller from the confirmation dialog", async () => {
    const user = userEvent.setup();
    const { onUpdateStatus } = renderSidebar();

    await user.click(screen.getByRole("button", { name: /approve store/i }));

    const dialog = screen.getByRole("dialog");
    expect(
      within(dialog).getByText(/approve seller profile/i),
    ).toBeInTheDocument();

    await user.click(
      within(dialog).getByRole("button", { name: /approve store/i }),
    );

    expect(onUpdateStatus).toHaveBeenCalledTimes(1);
    expect(onUpdateStatus).toHaveBeenCalledWith({
      status: "approved",
      adminNote: undefined,
    });
  });

  it("sends the typed admin note with the approval", async () => {
    const user = userEvent.setup();
    const { onUpdateStatus } = renderSidebar();

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

    expect(onUpdateStatus).toHaveBeenCalledWith({
      status: "approved",
      adminNote: "Documents verified",
    });
  });

  it("requires the authorization checkbox before suspending", async () => {
    const user = userEvent.setup();
    const { onUpdateStatus } = renderSidebar();

    await user.click(screen.getByRole("button", { name: /suspend store/i }));

    const dialog = screen.getByRole("dialog");
    const confirmButton = within(dialog).getByRole("button", {
      name: /suspend store/i,
    });
    expect(confirmButton).toBeDisabled();

    await user.click(
      within(dialog).getByLabelText(
        "I authorize freezing operations for this store profile",
      ),
    );
    expect(confirmButton).toBeEnabled();

    await user.click(confirmButton);

    expect(onUpdateStatus).toHaveBeenCalledTimes(1);
    expect(onUpdateStatus).toHaveBeenCalledWith({
      status: "suspended",
      adminNote: undefined,
    });
  });

  it("closes the dialog without updating when cancelled", async () => {
    const user = userEvent.setup();
    const { onUpdateStatus } = renderSidebar();

    await user.click(screen.getByRole("button", { name: /approve store/i }));

    const dialog = screen.getByRole("dialog");
    await user.click(
      within(dialog).getByRole("button", { name: /^cancel$/i }),
    );

    expect(onUpdateStatus).not.toHaveBeenCalled();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("shows the active admin note when present", () => {
    renderSidebar({
      seller: { ...mockSeller, adminNote: "Awaiting tax documents" },
    });

    expect(screen.getByText(/active admin note/i)).toBeInTheDocument();
    expect(screen.getByText(/awaiting tax documents/i)).toBeInTheDocument();
  });

  it("disables the confirm button while update is pending", async () => {
    const user = userEvent.setup();
    renderSidebar({ isUpdating: true });

    await user.click(screen.getByRole("button", { name: /approve store/i }));

    const confirmButton = within(screen.getByRole("dialog")).getByRole(
      "button",
      { name: /processing/i },
    );
    expect(confirmButton).toBeDisabled();
  });
});
