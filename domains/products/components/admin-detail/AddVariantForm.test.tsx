import { inventoryApi } from "@/domains/products/api/inventory.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AddVariantForm } from "./AddVariantForm";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

vi.mock("@/domains/products/api/inventory.api", () => ({
  inventoryApi: {
    createVariant: vi.fn(),
  },
}));

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(
    screen.getByLabelText("Unique Variant SKU Identifier *"),
    "TSHRT-LNN-SLIM-BLK-XL",
  );
  await user.type(screen.getByLabelText("Size Attribute Dimension *"), "XL");
  await user.type(screen.getByLabelText("Color Variant Label *"), "Pure Black");
  await user.type(screen.getByLabelText("Variant Level Price (EGP) *"), "349.99");
  await user.type(screen.getByLabelText("Initial Physical Floor Stock *"), "40");
}

describe("Admin Add Variant Form", () => {
  const productId = "prod-1";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while variant creation is pending", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    let resolveCreate!: (value: any) => void;

    vi.mocked(inventoryApi.createVariant).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreate = resolve;
        }),
    );

    render(<AddVariantForm productId={productId} onCancel={onCancel} />, {
      wrapper: createWrapper(),
    });

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /add variant/i }));

    expect(
      await screen.findByText(/publishing sku allocation details/i),
    ).toBeInTheDocument();

    resolveCreate({});

    expect(
      await screen.findByText(
        /variant option appended to stock matrix successfully/i,
      ),
    ).toBeInTheDocument();
  });

  it("resets the form after a successful creation", async () => {
    const user = userEvent.setup();

    vi.mocked(inventoryApi.createVariant).mockResolvedValue({} as any);

    render(<AddVariantForm productId={productId} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /add variant/i }));

    expect(
      await screen.findByText(
        /variant option appended to stock matrix successfully/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Unique Variant SKU Identifier *"),
    ).toHaveValue("");
    expect(screen.getByLabelText("Size Attribute Dimension *")).toHaveValue("");
    expect(screen.getByLabelText("Color Variant Label *")).toHaveValue("");
  });

  it("shows API error message when variant creation fails", async () => {
    const user = userEvent.setup();

    let rejectCreate!: (error: any) => void;

    vi.mocked(inventoryApi.createVariant).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectCreate = reject;
        }),
    );

    render(<AddVariantForm productId={productId} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /add variant/i }));

    expect(
      await screen.findByText(/publishing sku allocation details/i),
    ).toBeInTheDocument();

    rejectCreate({
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

  it("sends the correct payload with numeric price and stock", async () => {
    const user = userEvent.setup();

    vi.mocked(inventoryApi.createVariant).mockResolvedValue({} as any);

    render(<AddVariantForm productId={productId} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /add variant/i }));

    expect(
      await screen.findByText(
        /variant option appended to stock matrix successfully/i,
      ),
    ).toBeInTheDocument();

    expect(inventoryApi.createVariant).toHaveBeenCalledTimes(1);
    expect(inventoryApi.createVariant).toHaveBeenCalledWith(productId, {
      sku: "TSHRT-LNN-SLIM-BLK-XL",
      size: "XL",
      color: "Pure Black",
      price: 349.99,
      stock: 40,
    });
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();

    render(<AddVariantForm productId={productId} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole("button", { name: /add variant/i }));

    expect(
      await screen.findByText("SKU reference identifier is required"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Size dimension is required"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Color attribute is required"),
    ).toBeInTheDocument();
    expect(inventoryApi.createVariant).not.toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<AddVariantForm productId={productId} onCancel={onCancel} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
