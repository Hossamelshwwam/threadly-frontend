import { usersApi } from "@/domains/users/api/users.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AddAddressForm from "./AddAddressForm";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

vi.mock("@/domains/users/api/users.api", () => ({
  usersApi: {
    addAddress: vi.fn(),
  },
}));

describe("Add Address Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows success message when address is added successfully", async () => {
    const user = userEvent.setup();
    const setShowAddressForm = vi.fn();

    let resolveAdd!: (data: any) => void;

    vi.mocked(usersApi.addAddress).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveAdd = resolve;
        }),
    );

    render(<AddAddressForm setShowAddressForm={setShowAddressForm} />, {
      wrapper: createWrapper(),
    });

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Country/Region" }),
      "Egypt",
    );

    await user.type(screen.getByLabelText("Address Label"), "Home");

    await user.type(screen.getByLabelText("Address"), "123 Main Street");

    await user.type(screen.getByLabelText("City"), "Cairo");

    await user.type(screen.getByLabelText("Governorate"), "Cairo");

    await user.type(screen.getByLabelText("ZIP code"), "14482");

    await user.type(screen.getByLabelText("Phone Number"), "01063554728");

    await user.click(
      screen.getByRole("button", {
        name: "Save Address",
      }),
    );

    expect(await screen.findByText("Adding address...")).toBeInTheDocument();

    resolveAdd({});

    expect(
      await screen.findByText("Address added successfully!"),
    ).toBeInTheDocument();

    expect(setShowAddressForm).toHaveBeenCalledWith(false);
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

    render(<AddAddressForm setShowAddressForm={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Country/Region" }),
      "Egypt",
    );

    await user.type(screen.getByLabelText("Address Label"), "Home");

    await user.type(screen.getByLabelText("Address"), "123 Main Street");

    await user.type(screen.getByLabelText("City"), "Cairo");

    await user.type(screen.getByLabelText("Governorate"), "Cairo");

    await user.type(screen.getByLabelText("ZIP code"), "14482");

    await user.type(screen.getByLabelText("Phone Number"), "01063554728");

    await user.click(
      screen.getByRole("button", {
        name: "Save Address",
      }),
    );

    expect(await screen.findByText("Adding address...")).toBeInTheDocument();

    rejectAdd({
      response: {
        data: {
          message: "error in the document",
        },
      },
    });

    expect(
      await screen.findByText("error in the document"),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();

    render(<AddAddressForm setShowAddressForm={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.click(
      screen.getByRole("button", {
        name: "Save Address",
      }),
    );

    expect(
      await screen.findByText("Label is required (e.g., Home)"),
    ).toBeInTheDocument();

    expect(await screen.findByText("Country is required")).toBeInTheDocument();

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
  });
});
