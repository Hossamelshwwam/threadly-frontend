import { productsApi } from "@/domains/products/api/products.api";
import { categoriesApi } from "@/domains/categories/api/categories.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SellerCreateProductPage from "./SellerCreateProductPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

const pushMock = vi.fn();

vi.mock("@/domains/products/api/products.api", () => ({
  productsApi: {
    createProduct: vi.fn(),
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

const mockCategories = [
  { _id: "cat-1", name: "T-Shirts" },
  { _id: "cat-2", name: "Jeans" },
] as any;

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Product Title *"), "Classic T-Shirt");
  await user.type(
    screen.getByLabelText("Detailed Description *"),
    "Soft organic cotton t-shirt",
  );
  await user.type(screen.getByLabelText("Base Price (EGP) *"), "250");
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Category *" }),
    "cat-1",
  );
}

describe("Seller Create Product Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(categoriesApi.listCategories).mockResolvedValue({
      data: mockCategories,
    } as any);
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();

    render(<SellerCreateProductPage />, { wrapper: createWrapper() });

    await user.click(
      screen.getByRole("button", { name: /create product/i }),
    );

    expect(
      await screen.findByText(/category is required/i),
    ).toBeInTheDocument();
    expect(productsApi.createProduct).not.toHaveBeenCalled();
  });

  it("shows loading state while creating the product is pending", async () => {
    const user = userEvent.setup();

    vi.mocked(productsApi.createProduct).mockImplementation(
      () => new Promise(() => {}),
    );

    render(<SellerCreateProductPage />, { wrapper: createWrapper() });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /create product/i }),
    );

    expect(
      await screen.findByText(/creating product/i),
    ).toBeInTheDocument();
  });

  it("creates the product and redirects to its preview page on success", async () => {
    const user = userEvent.setup();

    let resolveCreate!: (value: any) => void;

    vi.mocked(productsApi.createProduct).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreate = resolve;
        }),
    );

    render(<SellerCreateProductPage />, { wrapper: createWrapper() });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /create product/i }),
    );

    expect(
      await screen.findByText(/creating product/i),
    ).toBeInTheDocument();

    resolveCreate({ data: { _id: "prod-1" } });

    expect(
      await screen.findByText(/product created! now let's add some images/i),
    ).toBeInTheDocument();
    expect(pushMock).toHaveBeenCalledWith("/seller/products/prod-1");
  });

  it("shows API error message when creating the product fails", async () => {
    const user = userEvent.setup();

    let rejectCreate!: (error: any) => void;

    vi.mocked(productsApi.createProduct).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectCreate = reject;
        }),
    );

    render(<SellerCreateProductPage />, { wrapper: createWrapper() });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /create product/i }),
    );

    expect(
      await screen.findByText(/creating product/i),
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
    expect(pushMock).not.toHaveBeenCalled();
  });
});
