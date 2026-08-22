import { sellerStoreApi } from "@/domains/sellers/api/seller-store.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StoreRegistrationForm from "./StoreRegistrationForm";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

const pushMock = vi.fn();

vi.mock("@/domains/sellers/api/seller-store.api", () => ({
  sellerStoreApi: {
    registerStore: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe("Store Registration Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while store registration is pending", async () => {
    const user = userEvent.setup();

    let resolveRegister!: (value: any) => void;

    vi.mocked(sellerStoreApi.registerStore).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveRegister = resolve;
        }),
    );

    render(<StoreRegistrationForm />, { wrapper: createWrapper() });

    await user.type(screen.getByLabelText("Store Name *"), "Vintage Threads");
    await user.type(screen.getByLabelText("Bank Name"), "CIB");
    await user.type(screen.getByLabelText("Account Name"), "Hossam Attia");
    await user.type(
      screen.getByLabelText("IBAN / Account Number"),
      "EG120000000000000000000000",
    );
    await user.click(
      screen.getByRole("button", { name: /open my store/i }),
    );

    expect(
      await screen.findByText(/creating your store/i),
    ).toBeInTheDocument();

    resolveRegister({ data: { storeName: "Vintage Threads" } });

    expect(
      await screen.findByText(/congratulations! vintage threads is now live/i),
    ).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/seller");
  });

  it("shows API error message when store registration fails", async () => {
    const user = userEvent.setup();

    let rejectRegister!: (error: any) => void;

    vi.mocked(sellerStoreApi.registerStore).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectRegister = reject;
        }),
    );

    render(<StoreRegistrationForm />, { wrapper: createWrapper() });

    await user.type(screen.getByLabelText("Store Name *"), "Vintage Threads");
    await user.type(screen.getByLabelText("Bank Name"), "CIB");
    await user.type(screen.getByLabelText("Account Name"), "Hossam Attia");
    await user.type(
      screen.getByLabelText("IBAN / Account Number"),
      "EG120000000000000000000000",
    );
    await user.click(
      screen.getByRole("button", { name: /open my store/i }),
    );

    expect(
      await screen.findByText(/creating your store/i),
    ).toBeInTheDocument();

    rejectRegister({
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

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();

    render(<StoreRegistrationForm />, { wrapper: createWrapper() });

    await user.click(
      screen.getByRole("button", { name: /open my store/i }),
    );

    expect(
      await screen.findByText(/store name must be at least 3 characters/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/bank name is required/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/account holder name is required/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/valid iban\/account number is required/i),
    ).toBeInTheDocument();
    expect(sellerStoreApi.registerStore).not.toHaveBeenCalled();
  });
});
