import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";
import { authApi } from "../../api/auth.api";
vi.mock("@/domains/auth/api/auth.api", () => ({
  authApi: { login: vi.fn() },
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("auth login form", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while login is pending", async () => {
    const user = userEvent.setup();
    render(<LoginForm />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.login).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLogin = resolve;
        }),
    );

    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/signing in/i)).toBeInTheDocument();

    resolveLogin({ data: { user: { name: "Hossam" } } });

    expect(
      await screen.findByText(/welcome back, hossam/i),
    ).toBeInTheDocument();
  });

  it("shows error message when login fails", async () => {
    const user = userEvent.setup();
    render(<LoginForm />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.login).mockImplementation(
      () =>
        new Promise((_, reject) => {
          resolveLogin = reject;
        }),
    );

    await user.type(screen.getByLabelText(/email/i), "test@test.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.click(screen.getByRole("button", { name: /login/i }));

    expect(await screen.findByText(/signing in/i)).toBeInTheDocument();

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
    render(<LoginForm />, { wrapper: createWrapper() });
    await user.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 6 characters/i),
    ).toBeInTheDocument();
  });
});
