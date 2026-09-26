import { productsApi } from "@/domains/products/api/products.api";
import { categoriesApi } from "@/domains/categories/api/categories.api";
import { sellersApi } from "@/domains/sellers/api/sellers.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminCreateProductPage from "./AdminCreateProductPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

vi.mock("@/domains/products/api/products.api", () => ({
  productsApi: {
    createProduct: vi.fn(),
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

const mockCategories = [{ _id: "cat-1", name: "Shirts" }] as any;

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Product Title *"), "Linen Shirt");
  await user.type(
    screen.getByLabelText("Detailed Description *"),
    "Slim-fit linen casual shirt",
  );
  await user.type(screen.getByLabelText("Base Price (EGP) *"), "450");
  await user.selectOptions(
    screen.getByRole("combobox", { name: "Category Classification *" }),
    "cat-1",
  );
}

describe("Admin Create Product Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(categoriesApi.adminListFlat).mockResolvedValue({
      data: mockCategories,
    } as any);
    vi.mocked(sellersApi.adminListSellers).mockResolvedValue({
      data: [],
    } as any);
  });

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();

    render(<AdminCreateProductPage />, { wrapper: createWrapper() });

    await user.click(
      screen.getByRole("button", { name: /save & proceed/i }),
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

    render(<AdminCreateProductPage />, { wrapper: createWrapper() });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /save & proceed/i }),
    );

    expect(
      await screen.findByText(/publishing product listing core parameters/i),
    ).toBeInTheDocument();
  });

  it("creates the product and resets the form on success", async () => {
    const user = userEvent.setup();

    let resolveCreate!: (value: any) => void;

    vi.mocked(productsApi.createProduct).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreate = resolve;
        }),
    );

    render(<AdminCreateProductPage />, { wrapper: createWrapper() });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /save & proceed/i }),
    );

    expect(
      await screen.findByText(/publishing product listing core parameters/i),
    ).toBeInTheDocument();

    resolveCreate({ data: { _id: "prod-1" } });

    expect(
      await screen.findByText(
        /product created successfully! proceeding to upload asset images/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Product Title *")).toHaveValue("");
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

    render(<AdminCreateProductPage />, { wrapper: createWrapper() });

    await fillForm(user);
    await user.click(
      screen.getByRole("button", { name: /save & proceed/i }),
    );

    expect(
      await screen.findByText(/publishing product listing core parameters/i),
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
});
