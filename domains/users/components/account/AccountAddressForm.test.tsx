import { usersApi } from "@/domains/users/api/users.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AccountAddressForm } from "./AccountAddressForm";
import type { Address } from "../../types/user.types";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

vi.mock("@/domains/users/api/users.api", () => ({
  usersApi: {
    addAddress: vi.fn(),
    updateAddress: vi.fn(),
  },
}));

const mockAddress: Address = {
  _id: "addr-1",
  label: "Home",
  street: "123 Main Street",
  city: "Cairo",
  state: "Cairo",
  postalCode: "11511",
  country: "Egypt",
  phonenumber: "01012345678",
  isDefault: false,
};

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Address Label"), "Work");
  await user.type(screen.getByLabelText("Address"), "456 Tahrir Square");
  await user.type(screen.getByLabelText("City"), "Giza");
  await user.type(screen.getByLabelText("Governorate"), "Giza");
  await user.type(screen.getByLabelText("ZIP code"), "12511");
  await user.type(screen.getByLabelText("phonenumber"), "01098765432");
}

describe("Account Address Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while adding address is pending", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    let resolveAdd!: (value: any) => void;

    vi.mocked(usersApi.addAddress).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveAdd = resolve;
        }),
    );

    render(<AccountAddressForm onClose={onClose} />, {
      wrapper: createWrapper(),
    });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /save address/i }),
    );

    expect(await screen.findByText(/adding address/i)).toBeInTheDocument();

    resolveAdd({});

    expect(
      await screen.findByText(/address added successfully/i),
    ).toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();
  });

  it("shows API error message when adding address fails", async () => {
    const user = userEvent.setup();

    let rejectAdd!: (error: any) => void;

    vi.mocked(usersApi.addAddress).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectAdd = reject;
        }),
    );

    render(<AccountAddressForm onClose={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /save address/i }),
    );

    expect(await screen.findByText(/adding address/i)).toBeInTheDocument();

    rejectAdd({
      response: {
        data: {
          message: "error in the document",
        },
      },
    });

    expect(
      await screen.findByText(/error in the document/i),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();

    render(<AccountAddressForm onClose={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.click(
      screen.getByRole("button", { name: /save address/i }),
    );

    expect(
      await screen.findByText("Label is required (e.g., Home)"),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Street address is required"),
    ).toBeInTheDocument();

    expect(await screen.findByText("City is required")).toBeInTheDocument();

    expect(
      await screen.findByText("State/Governorate is required"),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Postal code is required"),
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Valid phone number is required"),
    ).toBeInTheDocument();
    expect(usersApi.addAddress).not.toHaveBeenCalled();
  });

  it("pre-fills the form and updates the address when editing", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(usersApi.updateAddress).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<AccountAddressForm initialData={mockAddress} onClose={onClose} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByText(/edit address/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Address Label")).toHaveValue("Home");
    expect(screen.getByLabelText("Address")).toHaveValue("123 Main Street");
    expect(screen.getByLabelText("City")).toHaveValue("Cairo");

    await user.clear(screen.getByLabelText("City"));
    await user.type(screen.getByLabelText("City"), "Alexandria");
    await user.click(
      screen.getByRole("button", { name: /save address/i }),
    );

    expect(await screen.findByText(/updating address/i)).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/address updated successfully/i),
    ).toBeInTheDocument();
    expect(usersApi.updateAddress).toHaveBeenCalledWith(
      "addr-1",
      expect.objectContaining({ city: "Alexandria" }),
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<AccountAddressForm onClose={onClose} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
