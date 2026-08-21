import { usersApi } from "@/domains/users/api/users.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import AccountSecurityPage from "./AccountSecurityPage";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

vi.mock("@/domains/users/api/users.api", () => ({
  usersApi: {
    changePassword: vi.fn(),
  },
}));

describe("Account Security Page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while password change is pending", async () => {
    const user = userEvent.setup();

    let resolveChange!: (value: any) => void;

    vi.mocked(usersApi.changePassword).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveChange = resolve;
        }),
    );

    render(<AccountSecurityPage />, { wrapper: createWrapper() });

    await user.type(screen.getByLabelText("Current Password"), "12345678");
    await user.type(screen.getByLabelText("New Password"), "87654321");
    await user.type(screen.getByLabelText("Confirm New Password"), "87654321");

    await user.click(
      screen.getByRole("button", { name: /update password/i }),
    );

    expect(
      await screen.findByText(/securing your new password/i),
    ).toBeInTheDocument();

    resolveChange({});

    expect(
      await screen.findByText(/password successfully updated/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Current Password")).toHaveValue("");
  });

  it("shows API error message when password change fails", async () => {
    const user = userEvent.setup();

    let rejectChange!: (error: any) => void;

    vi.mocked(usersApi.changePassword).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectChange = reject;
        }),
    );

    render(<AccountSecurityPage />, { wrapper: createWrapper() });

    await user.type(screen.getByLabelText("Current Password"), "wrongpass");
    await user.type(screen.getByLabelText("New Password"), "87654321");
    await user.type(screen.getByLabelText("Confirm New Password"), "87654321");

    await user.click(
      screen.getByRole("button", { name: /update password/i }),
    );

    expect(
      await screen.findByText(/securing your new password/i),
    ).toBeInTheDocument();

    rejectChange({
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

  it("shows validation errors when submitting an empty form", async () => {
    const user = userEvent.setup();

    render(<AccountSecurityPage />, { wrapper: createWrapper() });

    await user.click(
      screen.getByRole("button", { name: /update password/i }),
    );

    expect(
      await screen.findByText(/current password is required/i),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(
        /new password must be at least 8 characters long/i,
      ),
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/please confirm your new password/i),
    ).toBeInTheDocument();
    expect(usersApi.changePassword).not.toHaveBeenCalled();
  });

  it("shows validation error when passwords do not match", async () => {
    const user = userEvent.setup();

    render(<AccountSecurityPage />, { wrapper: createWrapper() });

    await user.type(screen.getByLabelText("Current Password"), "12345678");
    await user.type(screen.getByLabelText("New Password"), "87654321");
    await user.type(screen.getByLabelText("Confirm New Password"), "99999999");

    await user.click(
      screen.getByRole("button", { name: /update password/i }),
    );

    expect(
      await screen.findByText(/passwords do not match/i),
    ).toBeInTheDocument();
    expect(usersApi.changePassword).not.toHaveBeenCalled();
  });
});
