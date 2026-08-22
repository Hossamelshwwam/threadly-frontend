import { productsApi } from "@/domains/products/api/products.api";
import { sellerProductsApi } from "@/domains/products/api/seller-products.api";
import { categoriesApi } from "@/domains/categories/api/categories.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SellerEditProductPage from "./SellerEditProductPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

const pushMock = vi.fn();

vi.mock("@/domains/products/api/products.api", () => ({
  productsApi: {
    updateProduct: vi.fn(),
  },
}));

vi.mock("@/domains/products/api/seller-products.api", () => ({
  sellerProductsApi: {
    getSellerProduct: vi.fn(),
  },
}));

vi.mock("@/domains/categories/api/categories.api", () => ({
  categoriesApi: {
    listCategories: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockProduct = {
  _id: "prod-1",
  name: "Old Name",
  description: "Old description text",
  basePrice: 100,
  categoryId: "cat-1",
  status: "draft",
  attributes: [],
};

describe("Seller Edit Product Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(categoriesApi.listCategories).mockResolvedValue({
      data: [{ _id: "cat-1", name: "T-Shirts" }],
    } as any);
  });

  it("shows the spinner while the product is being fetched", async () => {
    vi.mocked(sellerProductsApi.getSellerProduct).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<SellerEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    expect(screen.queryByText(/edit details/i)).not.toBeInTheDocument();
    expect(sellerProductsApi.getSellerProduct).toHaveBeenCalledWith("prod-1");
  });

  it("pre-fills the form with the product data", async () => {
    vi.mocked(sellerProductsApi.getSellerProduct).mockResolvedValue({
      data: mockProduct,
    } as any);

    render(<SellerEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    expect(
      await screen.findByDisplayValue("Old Name"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Detailed Description *"),
    ).toHaveValue("Old description text");
    expect(screen.getByLabelText("Base Price (EGP) *")).toHaveValue(100);
  });

  it("saves the changes and redirects to the preview page on success", async () => {
    const user = userEvent.setup();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(sellerProductsApi.getSellerProduct).mockResolvedValue({
      data: mockProduct,
    } as any);
    vi.mocked(productsApi.updateProduct).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<SellerEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    const titleInput = await screen.findByDisplayValue("Old Name");

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Name");
    await user.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    expect(await screen.findByText(/saving changes/i)).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/product updated successfully/i),
    ).toBeInTheDocument();
    expect(productsApi.updateProduct).toHaveBeenCalledWith(
      "prod-1",
      expect.objectContaining({ name: "Updated Name" }),
    );
    expect(pushMock).toHaveBeenCalledWith("/seller/products/prod-1");
  });

  it("shows API error message when updating the product fails", async () => {
    const user = userEvent.setup();

    let rejectUpdate!: (error: any) => void;

    vi.mocked(sellerProductsApi.getSellerProduct).mockResolvedValue({
      data: mockProduct,
    } as any);
    vi.mocked(productsApi.updateProduct).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectUpdate = reject;
        }),
    );

    render(<SellerEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByDisplayValue("Old Name");
    await user.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    expect(await screen.findByText(/saving changes/i)).toBeInTheDocument();

    rejectUpdate({
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
});
