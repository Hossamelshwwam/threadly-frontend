import { categoriesApi } from "@/domains/categories/api/categories.api";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AdminCategoriesPage from "./AdminCategoriesPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";
import type { Category } from "../types/category.types";

vi.mock("@/domains/categories/api/categories.api", () => ({
  categoriesApi: {
    adminListFlat: vi.fn(),
    adminCreateCategory: vi.fn(),
    adminUpdateCategory: vi.fn(),
    adminDeleteCategory: vi.fn(),
  },
}));

const mockCategories: Category[] = [
  {
    _id: "cat-1",
    name: "T-Shirts",
    slug: "t-shirts",
    parentId: null,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    _id: "cat-2",
    name: "Accessories",
    slug: "accessories",
    parentId: null,
    isActive: true,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

// Category names appear both in table rows and as parent <option>s,
// so row lookups are always scoped to the table.
// The edit action is the first button inside the row's last (Actions) cell.
function getTableRow(name: string) {
  const table = screen.getByRole("table");
  return within(table)
    .getByText(name)
    .closest("tr") as HTMLElement;
}

async function clickEditButton(
  user: ReturnType<typeof userEvent.setup>,
  name: string,
) {
  const actionsCell = within(getTableRow(name))
    .getAllByRole("cell")
    .at(-1) as HTMLElement;
  await user.click(within(actionsCell).getAllByRole("button")[0]);
}

describe("Admin Categories Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(categoriesApi.adminListFlat).mockResolvedValue({
      data: mockCategories,
      pagination: { total: 2, pages: 1 },
    } as any);
  });

  it("renders the categories list", async () => {
    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    expect(
      await within(screen.getByRole("table")).findByText("T-Shirts"),
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("table")).getByText("Accessories"),
    ).toBeInTheDocument();
    expect(screen.getByText(/publish category node/i)).toBeInTheDocument();
  });

  it("shows loading state while creating a category", async () => {
    const user = userEvent.setup();

    let resolveCreate!: (value: any) => void;

    vi.mocked(categoriesApi.adminCreateCategory).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreate = resolve;
        }),
    );

    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    await within(screen.getByRole("table")).findByText("T-Shirts");
    await user.type(screen.getByLabelText("Category Name"), "Bags");
    await user.selectOptions(
      screen.getByLabelText("Parent Category"),
      "cat-1",
    );
    await user.click(screen.getByRole("button", { name: /create node/i }));

    expect(
      await screen.findByText(/publishing category element/i),
    ).toBeInTheDocument();

    resolveCreate({});

    expect(
      await screen.findByText(/category created successfully/i),
    ).toBeInTheDocument();
    expect(categoriesApi.adminCreateCategory).toHaveBeenCalledWith({
      name: "Bags",
      parentId: "cat-1",
    });
  });

  it("resets the form back to create mode after a successful creation", async () => {
    const user = userEvent.setup();

    vi.mocked(categoriesApi.adminCreateCategory).mockResolvedValue(
      {} as any,
    );

    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    await within(screen.getByRole("table")).findByText("T-Shirts");
    const nameInput = screen.getByLabelText("Category Name");
    await user.type(nameInput, "Bags");
    await user.click(screen.getByRole("button", { name: /create node/i }));

    expect(
      await screen.findByText(/category created successfully/i),
    ).toBeInTheDocument();
    expect(nameInput).toHaveValue("");
  });

  it("shows API error message when creating a category fails", async () => {
    const user = userEvent.setup();

    let rejectCreate!: (error: any) => void;

    vi.mocked(categoriesApi.adminCreateCategory).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectCreate = reject;
        }),
    );

    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    await within(screen.getByRole("table")).findByText("T-Shirts");
    await user.type(screen.getByLabelText("Category Name"), "Bags");
    await user.click(screen.getByRole("button", { name: /create node/i }));

    expect(
      await screen.findByText(/publishing category element/i),
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

  it("does not call the API when submitting an empty name", async () => {
    const user = userEvent.setup();

    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    await within(screen.getByRole("table")).findByText("T-Shirts");
    await user.click(screen.getByRole("button", { name: /create node/i }));

    expect(categoriesApi.adminCreateCategory).not.toHaveBeenCalled();
  });

  it("pre-fills the form when a category is edited", async () => {
    const user = userEvent.setup();

    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    await within(screen.getByRole("table")).findByText("T-Shirts");
    await clickEditButton(user, "T-Shirts");

    expect(
      screen.getByText(/modify classification/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Category Name")).toHaveValue("T-Shirts");
  });

  it("updates a category and resets to create mode on success", async () => {
    const user = userEvent.setup();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(categoriesApi.adminUpdateCategory).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    await within(screen.getByRole("table")).findByText("T-Shirts");
    await clickEditButton(user, "T-Shirts");

    const nameInput = screen.getByLabelText("Category Name");
    await user.clear(nameInput);
    await user.type(nameInput, "Premium Tees");
    await user.click(
      screen.getByRole("button", { name: /save adjustments/i }),
    );

    expect(
      await screen.findByText(/updating structural configuration/i),
    ).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/category updated successfully/i),
    ).toBeInTheDocument();
    expect(categoriesApi.adminUpdateCategory).toHaveBeenCalledWith(
      "cat-1",
      { name: "Premium Tees", parentId: undefined },
    );
    expect(
      screen.getByText(/publish category node/i),
    ).toBeInTheDocument();
    expect(nameInput).toHaveValue("");
  });

  it("shows API error message when updating a category fails", async () => {
    const user = userEvent.setup();

    let rejectUpdate!: (error: any) => void;

    vi.mocked(categoriesApi.adminUpdateCategory).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectUpdate = reject;
        }),
    );

    render(<AdminCategoriesPage />, { wrapper: createWrapper() });

    await within(screen.getByRole("table")).findByText("T-Shirts");
    await clickEditButton(user, "T-Shirts");

    const nameInput = screen.getByLabelText("Category Name");
    await user.clear(nameInput);
    await user.type(nameInput, "Premium Tees");
    await user.click(
      screen.getByRole("button", { name: /save adjustments/i }),
    );

    expect(
      await screen.findByText(/updating structural configuration/i),
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
  });
});
