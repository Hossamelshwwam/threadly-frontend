import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CategoryFormPanel } from "./CategoryFormPanel";
import type { Category } from "../types/category.types";

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

describe("Category Form Panel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows create mode title and button when not editing", () => {
    render(
      <CategoryFormPanel
        isEditing={false}
        name=""
        onNameChange={vi.fn()}
        parentId={undefined}
        onParentIdChange={vi.fn()}
        categories={mockCategories}
        selectedCategory={null}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText(/publish category node/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create node/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /cancel/i }),
    ).not.toBeInTheDocument();
  });

  it("shows edit mode title and buttons when editing", () => {
    render(
      <CategoryFormPanel
        isEditing={true}
        name="T-Shirts"
        onNameChange={vi.fn()}
        parentId={undefined}
        onParentIdChange={vi.fn()}
        categories={mockCategories}
        selectedCategory={mockCategories[0]}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(screen.getByText(/modify classification/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save adjustments/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /cancel/i }),
    ).toBeInTheDocument();
  });

  it("calls onNameChange when the category name is typed", async () => {
    const user = userEvent.setup();
    const onNameChange = vi.fn();

    render(
      <CategoryFormPanel
        isEditing={false}
        name=""
        onNameChange={onNameChange}
        parentId={undefined}
        onParentIdChange={vi.fn()}
        categories={mockCategories}
        selectedCategory={null}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    await user.type(screen.getByLabelText("Category Name"), "B");

    expect(onNameChange).toHaveBeenCalledWith("B");
  });

  it("excludes the selected category from its own parent options", () => {
    render(
      <CategoryFormPanel
        isEditing={true}
        name="T-Shirts"
        onNameChange={vi.fn()}
        parentId={undefined}
        onParentIdChange={vi.fn()}
        categories={mockCategories}
        selectedCategory={mockCategories[0]}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    const parentSelect = screen.getByLabelText("Parent Category");

    expect(parentSelect).toHaveValue("");
    expect(parentSelect).not.toHaveTextContent("T-Shirts");
    expect(parentSelect).toHaveTextContent("Accessories");
  });

  it("calls onParentIdChange when a parent category is selected", async () => {
    const user = userEvent.setup();
    const onParentIdChange = vi.fn();

    render(
      <CategoryFormPanel
        isEditing={false}
        name=""
        onNameChange={vi.fn()}
        parentId={undefined}
        onParentIdChange={onParentIdChange}
        categories={mockCategories}
        selectedCategory={null}
        onSubmit={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    await user.selectOptions(
      screen.getByLabelText("Parent Category"),
      "cat-2",
    );

    expect(onParentIdChange).toHaveBeenCalledWith("cat-2");
  });

  it("submits the form", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <CategoryFormPanel
        isEditing={false}
        name="Bags"
        onNameChange={vi.fn()}
        parentId={undefined}
        onParentIdChange={vi.fn()}
        categories={mockCategories}
        selectedCategory={null}
        onSubmit={onSubmit}
        onCancel={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: /create node/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(
      <CategoryFormPanel
        isEditing={true}
        name="T-Shirts"
        onNameChange={vi.fn()}
        parentId={undefined}
        onParentIdChange={vi.fn()}
        categories={mockCategories}
        selectedCategory={mockCategories[0]}
        onSubmit={vi.fn()}
        onCancel={onCancel}
      />,
    );

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
