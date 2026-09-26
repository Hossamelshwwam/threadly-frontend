import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { EditVariantForm } from "./EditVariantForm";
import type { ProductVariant } from "../../types/inventory.types";

const mockVariant: ProductVariant = {
  _id: "variant-1",
  productId: "prod-1",
  sku: "TSHRT-LNN-SLIM-BLK-XL",
  size: "XL",
  color: "Pure Black",
  stock: 40,
  reserved: 0,
  price: 349.99,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("Admin Edit Variant Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("pre-fills the form with variant data", () => {
    render(
      <EditVariantForm
        variant={mockVariant}
        isPending={false}
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText(/modify specifications/i)).toBeInTheDocument();
    expect(screen.getByText("ID: variant-1")).toBeInTheDocument();
    expect(screen.getByLabelText("SKU Identifier *")).toHaveValue(
      "TSHRT-LNN-SLIM-BLK-XL",
    );
    expect(screen.getByLabelText("Size *")).toHaveValue("XL");
    expect(screen.getByLabelText("Color *")).toHaveValue("Pure Black");
    expect(screen.getByLabelText("Price (EGP) *")).toHaveValue(349.99);
  });

  it("calls onSave with the edited variant data", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <EditVariantForm
        variant={mockVariant}
        isPending={false}
        onSave={onSave}
        onCancel={vi.fn()}
      />,
    );

    await user.clear(screen.getByLabelText("Price (EGP) *"));
    await user.type(screen.getByLabelText("Price (EGP) *"), "399.5");
    await user.clear(screen.getByLabelText("Color *"));
    await user.type(screen.getByLabelText("Color *"), "Midnight Blue");
    await user.click(screen.getByRole("button", { name: /save/i }));

    // react-hook-form's handleSubmit passes the DOM event as a second argument
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(
      {
        sku: "TSHRT-LNN-SLIM-BLK-XL",
        size: "XL",
        color: "Midnight Blue",
        price: 399.5,
      },
      expect.anything(),
    );
  });

  it("shows validation error when SKU is too short", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <EditVariantForm
        variant={mockVariant}
        isPending={false}
        onSave={onSave}
        onCancel={vi.fn()}
      />,
    );

    await user.clear(screen.getByLabelText("SKU Identifier *"));
    await user.click(screen.getByRole("button", { name: /save/i }));

    expect(
      await screen.findByText("SKU reference identifier is required"),
    ).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("disables the save button while update is pending", () => {
    render(
      <EditVariantForm
        variant={mockVariant}
        isPending={true}
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByRole("button", { name: /saving/i })).toBeDisabled();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <EditVariantForm
        variant={mockVariant}
        isPending={false}
        onSave={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
