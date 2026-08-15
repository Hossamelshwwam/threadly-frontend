import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";
import { authApi } from "../../api/auth.api";
import { ResetPasswordForm } from "./ResetPasswordForm";
vi.mock("@/domains/auth/api/auth.api", () => ({
  authApi: { resetPassword: vi.fn() },
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("auth register form", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while login is pending", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm token="" />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.resetPassword).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLogin = resolve;
        }),
    );

    await user.type(screen.getByLabelText("New Password"), "12345678");
    await user.type(screen.getByLabelText("Confirm Password"), "12345678");
    await user.click(screen.getByRole("button", { name: /reset password/i }));

    expect(await screen.findByText(/resetting password/i)).toBeInTheDocument();

    resolveLogin({});

    expect(
      await screen.findByText(/password reset! You can now log in/i),
    ).toBeInTheDocument();
  });

  it("shows error message when login fails", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm token="" />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.resetPassword).mockImplementation(
      () =>
        new Promise((_, reject) => {
          resolveLogin = reject;
        }),
    );

    await user.type(screen.getByLabelText("New Password"), "12345678");
    await user.type(screen.getByLabelText("Confirm Password"), "12345678");
    await user.click(screen.getByRole("button", { name: /reset password/i }));

    expect(await screen.findByText(/resetting password/i)).toBeInTheDocument();

    resolveLogin({
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

  it("show error message validation", async () => {
    const user = userEvent.setup();
    render(<ResetPasswordForm token="" />, { wrapper: createWrapper() });
    await user.click(screen.getByRole("button", { name: /reset password/i }));

    expect(
      await screen.findByText(/at least 8 characters/i),
    ).toBeInTheDocument();
  });
});
