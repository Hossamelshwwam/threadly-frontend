import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";
import { authApi } from "../../api/auth.api";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
vi.mock("@/domains/auth/api/auth.api", () => ({
  authApi: { forgotPassword: vi.fn() },
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("auth forgot password form", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while login is pending", async () => {
    const user = userEvent.setup();
    render(<ForgotPasswordForm />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.forgotPassword).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLogin = resolve;
        }),
    );

    await user.type(screen.getByLabelText("Email Address"), "test@test.com");
    await user.click(screen.getByRole("button", { name: /send reset link/i }));

    expect(await screen.findByText(/sending reset link/i)).toBeInTheDocument();

    resolveLogin({});

    expect(
      await screen.findByText(/reset link sent! Check your inbox/i),
    ).toBeInTheDocument();
  });

  it("shows error message when login fails", async () => {
    const user = userEvent.setup();
    render(<ForgotPasswordForm />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.forgotPassword).mockImplementation(
      () =>
        new Promise((_, reject) => {
          resolveLogin = reject;
        }),
    );

    await user.type(screen.getByLabelText("Email Address"), "test@test.com");
    await user.click(screen.getByRole("button", { name: /send reset link/i }));

    expect(await screen.findByText(/sending reset link/i)).toBeInTheDocument();

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
    render(<ForgotPasswordForm />, { wrapper: createWrapper() });
    await user.click(screen.getByRole("button", { name: /send reset link/i }));
    expect(
      await screen.findByText(/please enter a valid email/i),
    ).toBeInTheDocument();
  });
});
