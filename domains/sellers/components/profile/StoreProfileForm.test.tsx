import { sellerStoreApi } from "@/domains/sellers/api/seller-store.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { StoreProfileForm } from "./StoreProfileForm";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

vi.mock("@/domains/sellers/api/seller-store.api", () => ({
  sellerStoreApi: {
    updateStoreProfile: vi.fn(),
  },
}));

const mockStore = {
  storeName: "Threadly Store",
  description: "Premium t-shirts and apparel",
  bankDetails: {
    bankName: "CIB",
    accountName: "Hossam Attia",
    accountNumber: "EG120001000000000012345678",
  },
};

describe("Store Profile Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("pre-fills the form with store data", () => {
    render(<StoreProfileForm store={mockStore} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByLabelText("Store Name")).toHaveValue("Threadly Store");
    expect(screen.getByLabelText("Store Description")).toHaveValue(
      "Premium t-shirts and apparel",
    );
    expect(screen.getByLabelText("Bank Name")).toHaveValue("CIB");
    expect(screen.getByLabelText("Account Holder Name")).toHaveValue(
      "Hossam Attia",
    );
    expect(screen.getByLabelText("Account Number / IBAN")).toHaveValue(
      "EG120001000000000012345678",
    );
  });

  it("shows loading state while store update is pending", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(sellerStoreApi.updateStoreProfile).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<StoreProfileForm store={mockStore} onCancel={onCancel} />, {
      wrapper: createWrapper(),
    });

    await user.clear(screen.getByLabelText("Store Name"));
    await user.type(screen.getByLabelText("Store Name"), "Attia Threads");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText(/saving changes/i)).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/store profile updated successfully/i),
    ).toBeInTheDocument();
    expect(onCancel).toHaveBeenCalled();
  });

  it("shows error message when store update fails", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    let rejectUpdate!: (error: any) => void;

    vi.mocked(sellerStoreApi.updateStoreProfile).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectUpdate = reject;
        }),
    );

    render(<StoreProfileForm store={mockStore} onCancel={onCancel} />, {
      wrapper: createWrapper(),
    });

    await user.clear(screen.getByLabelText("Store Name"));
    await user.type(screen.getByLabelText("Store Name"), "Attia Threads");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText(/saving changes/i)).toBeInTheDocument();

    rejectUpdate({
      response: {
        data: {
          message: "error in the document",
        },
      },
    });

    expect(
      await screen.findByText(/failed to update profile/i),
    ).toBeInTheDocument();
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("shows validation error when store name is too short", async () => {
    const user = userEvent.setup();

    render(<StoreProfileForm store={mockStore} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.clear(screen.getByLabelText("Store Name"));
    await user.type(screen.getByLabelText("Store Name"), "ab");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText(/store name must be at least 3 characters/i),
    ).toBeInTheDocument();
    expect(sellerStoreApi.updateStoreProfile).not.toHaveBeenCalled();
  });

  it("disables save button when form has no changes", () => {
    render(<StoreProfileForm store={mockStore} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    const saveButton = screen.getByRole("button", { name: /save changes/i });
    expect(saveButton).toBeDisabled();

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    expect(cancelButton).not.toBeDisabled();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<StoreProfileForm store={mockStore} onCancel={onCancel} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
