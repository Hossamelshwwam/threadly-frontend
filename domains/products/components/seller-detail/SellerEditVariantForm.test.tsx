import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SellerEditVariantForm } from "./SellerEditVariantForm";
import type { ProductVariant } from "../../types/inventory.types";

const mockVariant: ProductVariant = {
  _id: "variant-1",
  productId: "prod-1",
  sku: "TSHIRT-BLK-XL",
  size: "XL",
  color: "Midnight Black",
  stock: 25,
  reserved: 0,
  price: 299.99,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("Seller Edit Variant Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("pre-fills the form with variant data", () => {
    render(
      <SellerEditVariantForm
        variant={mockVariant}
        isPending={false}
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText(/edit variant/i)).toBeInTheDocument();
    expect(screen.getByText("ID: variant-1")).toBeInTheDocument();
    expect(screen.getByLabelText("SKU")).toHaveValue("TSHIRT-BLK-XL");
    expect(screen.getByLabelText("Size")).toHaveValue("XL");
    expect(screen.getByLabelText("Color")).toHaveValue("Midnight Black");
    expect(screen.getByLabelText("Price (EGP)")).toHaveValue(299.99);
  });

  it("calls onSave with the edited variant data", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <SellerEditVariantForm
        variant={mockVariant}
        isPending={false}
        onSave={onSave}
        onCancel={vi.fn()}
      />,
    );

    await user.clear(screen.getByLabelText("Price (EGP)"));
    await user.type(screen.getByLabelText("Price (EGP)"), "349.5");
    await user.clear(screen.getByLabelText("Color"));
    await user.type(screen.getByLabelText("Color"), "Jet Black");
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    // react-hook-form's handleSubmit passes the DOM event as a second argument
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith(
      {
        sku: "TSHIRT-BLK-XL",
        size: "XL",
        color: "Jet Black",
        price: 349.5,
      },
      expect.anything(),
    );
  });

  it("shows validation error when SKU is too short", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <SellerEditVariantForm
        variant={mockVariant}
        isPending={false}
        onSave={onSave}
        onCancel={vi.fn()}
      />,
    );

    await user.clear(screen.getByLabelText("SKU"));
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText("SKU reference identifier is required"),
    ).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("disables the save button while update is pending", () => {
    render(
      <SellerEditVariantForm
        variant={mockVariant}
        isPending={true}
        onSave={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /saving/i }),
    ).toBeDisabled();
    expect(
      screen.queryByRole("button", { name: /save changes/i }),
    ).not.toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <SellerEditVariantForm
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
