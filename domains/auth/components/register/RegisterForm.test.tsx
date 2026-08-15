import { beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";
import { authApi } from "../../api/auth.api";
import RegisterForm from "./RegisterForm";
vi.mock("@/domains/auth/api/auth.api", () => ({
  authApi: { register: vi.fn() },
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("login form", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state while login is pending", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.register).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveLogin = resolve;
        }),
    );

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText("Email Address"), "test@test.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.type(screen.getByLabelText("Confirm Password"), "12345678");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText(/creating account/i)).toBeInTheDocument();

    resolveLogin({});

    expect(
      await screen.findByText(
        /account created successfully!, please check your email to verify it/i,
      ),
    ).toBeInTheDocument();
  });

  it("shows error message when login fails", async () => {
    const user = userEvent.setup();
    render(<RegisterForm />, { wrapper: createWrapper() });

    let resolveLogin!: (value: any) => void;

    vi.mocked(authApi.register).mockImplementation(
      () =>
        new Promise((_, reject) => {
          resolveLogin = reject;
        }),
    );

    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText("Email Address"), "test@test.com");
    await user.type(screen.getByLabelText("Password"), "12345678");
    await user.type(screen.getByLabelText("Confirm Password"), "12345678");
    await user.click(screen.getByRole("button", { name: /create account/i }));

    expect(await screen.findByText(/creating account/i)).toBeInTheDocument();

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
    render(<RegisterForm />, { wrapper: createWrapper() });
    await user.click(screen.getByRole("button", { name: /create account/i }));
    expect(
      await screen.findByText(/name must be at least 3 characters/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/at least 8 characters/i),
    ).toBeInTheDocument();
  });
});
