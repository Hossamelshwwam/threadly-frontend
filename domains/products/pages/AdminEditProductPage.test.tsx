import { productsApi } from "@/domains/products/api/products.api";
import { categoriesApi } from "@/domains/categories/api/categories.api";
import { sellersApi } from "@/domains/sellers/api/sellers.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminEditProductPage from "./AdminEditProductPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

const pushMock = vi.fn();

vi.mock("@/domains/products/api/products.api", () => ({
  productsApi: {
    getProduct: vi.fn(),
    updateProduct: vi.fn(),
  },
}));

vi.mock("@/domains/categories/api/categories.api", () => ({
  categoriesApi: {
    adminListFlat: vi.fn(),
  },
}));

vi.mock("@/domains/sellers/api/sellers.api", () => ({
  sellersApi: {
    adminListSellers: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const mockProduct = {
  _id: "prod-1",
  name: "Old Linen Shirt",
  description: "Old description text",
  basePrice: 300,
  categoryId: "cat-1",
  sellerId: "seller-1",
  status: "draft",
  attributes: [],
};

describe("Admin Edit Product Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(categoriesApi.adminListFlat).mockResolvedValue({
      data: [{ _id: "cat-1", name: "Shirts" }],
    } as any);
    vi.mocked(sellersApi.adminListSellers).mockResolvedValue({
      data: [{ _id: "seller-1", storeName: "Vintage Threads" }],
    } as any);
  });

  it("shows the loading state while the product is being fetched", async () => {
    vi.mocked(productsApi.getProduct).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<AdminEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    expect(
      await screen.findByText(/retrieving catalog record context/i),
    ).toBeInTheDocument();
    expect(productsApi.getProduct).toHaveBeenCalledWith("prod-1");
  });

  it("shows the not found state when the product does not exist", async () => {
    vi.mocked(productsApi.getProduct).mockResolvedValue({} as any);

    render(<AdminEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    expect(
      await screen.findByText(/product record data not found/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back to catalog/i }),
    ).toHaveAttribute("href", "/admin/products");
  });

  it("pre-fills the form with the product data", async () => {
    vi.mocked(productsApi.getProduct).mockResolvedValue({
      data: mockProduct,
    } as any);

    render(<AdminEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    expect(
      await screen.findByDisplayValue("Old Linen Shirt"),
    ).toBeInTheDocument();
    expect(screen.getByText(/editing: old linen shirt/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText("Base Price (EGP) *"),
    ).toHaveValue(300);
  });

  it("saves the changes and redirects on success", async () => {
    const user = userEvent.setup();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(productsApi.getProduct).mockResolvedValue({
      data: mockProduct,
    } as any);
    vi.mocked(productsApi.updateProduct).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<AdminEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    const titleInput = await screen.findByDisplayValue("Old Linen Shirt");

    await user.clear(titleInput);
    await user.type(titleInput, "New Linen Shirt");
    await user.click(
      screen.getByRole("button", { name: /save & proceed/i }),
    );

    expect(
      await screen.findByText(/saving product parameter adjustments/i),
    ).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/product configurations updated successfully/i),
    ).toBeInTheDocument();
    expect(productsApi.updateProduct).toHaveBeenCalledWith(
      "prod-1",
      expect.objectContaining({ name: "New Linen Shirt" }),
    );
    expect(pushMock).toHaveBeenCalledWith("/admin/products/prod-1");
  });

  it("shows API error message when updating the product fails", async () => {
    const user = userEvent.setup();

    let rejectUpdate!: (error: any) => void;

    vi.mocked(productsApi.getProduct).mockResolvedValue({
      data: mockProduct,
    } as any);
    vi.mocked(productsApi.updateProduct).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectUpdate = reject;
        }),
    );

    render(<AdminEditProductPage id="prod-1" />, {
      wrapper: createWrapper(),
    });

    await screen.findByDisplayValue("Old Linen Shirt");
    await user.click(
      screen.getByRole("button", { name: /save & proceed/i }),
    );

    expect(
      await screen.findByText(/saving product parameter adjustments/i),
    ).toBeInTheDocument();

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
