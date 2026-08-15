import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import EmailVerifiedPage from "./verify-email-page";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";
import { authApi } from "../api/auth.api";
import userEvent from "@testing-library/user-event";
vi.mock("@/domains/auth/api/auth.api", () => ({
  authApi: { verifyEmail: vi.fn(), sendVerificationEmailAgain: vi.fn() },
}));

describe("verify email page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("success verification with message", async () => {
    let resolveVerify!: (value: any) => void;
    vi.mocked(authApi.verifyEmail).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveVerify = resolve;
        }),
    );
    render(<EmailVerifiedPage token="token" />, { wrapper: createWrapper() });

    expect(
      await screen.findByText(/verifying your email/i),
    ).toBeInTheDocument();

    resolveVerify({});

    expect(await screen.findByText(/email verified/i)).toBeInTheDocument();
  });

  it("shows verification failed when verification fails", async () => {
    let rejectVerify!: (error: any) => void;
    vi.mocked(authApi.verifyEmail).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectVerify = reject;
        }),
    );
    render(<EmailVerifiedPage token="token" />, { wrapper: createWrapper() });

    expect(
      await screen.findByText(/verifying your email/i),
    ).toBeInTheDocument();

    rejectVerify(new Error("Verification failed"));
    expect(await screen.findByText(/verification failed/i)).toBeInTheDocument();
  });

  it("sends the entered email", async () => {
    const user = userEvent.setup();

    let rejectVerify!: (error: any) => void;

    vi.mocked(authApi.verifyEmail).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectVerify = reject;
        }),
    );

    vi.mocked(authApi.sendVerificationEmailAgain).mockResolvedValueOnce({});

    render(<EmailVerifiedPage token="token" />, {
      wrapper: createWrapper(),
    });

    rejectVerify(new Error("Verification failed"));

    const input = await screen.findByLabelText("Email Address");

    await user.type(input, "test@test.com");

    await user.click(
      screen.getByRole("button", {
        name: /resend verification email/i,
      }),
    );

    expect(authApi.sendVerificationEmailAgain).toHaveBeenCalledWith(
      "test@test.com",
      expect.any(Object),
    );
  });

  it("success to send new verification email", async () => {
    const user = userEvent.setup();
    let rejectVerify!: (error: any) => void;
    vi.mocked(authApi.verifyEmail).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectVerify = reject;
        }),
    );
    let resolveSendVerification!: (value: any) => void;
    vi.mocked(authApi.sendVerificationEmailAgain).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSendVerification = resolve;
        }),
    );
    render(<EmailVerifiedPage token="token" />, { wrapper: createWrapper() });

    rejectVerify(new Error("Verification failed"));
    const input = await screen.findByLabelText("Email Address");
    await user.type(input, "test@test.com");

    await user.click(
      await screen.findByRole("button", {
        name: "Resend Verification Email",
      }),
    );

    expect(
      await screen.findByText("Sending verification email..."),
    ).toBeInTheDocument();

    resolveSendVerification({});

    expect(
      await screen.findByText("Verification email sent successfully!"),
    ).toBeInTheDocument();
  });

  it("shows error when sending verification email fails", async () => {
    const user = userEvent.setup();
    let rejectVerify!: (error: any) => void;
    vi.mocked(authApi.verifyEmail).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectVerify = reject;
        }),
    );
    let rejectSendVerification!: (error: any) => void;
    vi.mocked(authApi.sendVerificationEmailAgain).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectSendVerification = reject;
        }),
    );
    render(<EmailVerifiedPage token="token" />, { wrapper: createWrapper() });

    rejectVerify(new Error("Verification failed"));
    const input = await screen.findByLabelText("Email Address");
    await user.type(input, "test@test.com");

    await user.click(
      await screen.findByRole("button", {
        name: "Resend Verification Email",
      }),
    );

    expect(
      await screen.findByText("Sending verification email..."),
    ).toBeInTheDocument();

    rejectSendVerification(new Error("Failed to send"));

    expect(
      await screen.findByText("Failed to send verification email!"),
    ).toBeInTheDocument();
  });

  it("does not send verification email when email is invalid", async () => {
    const user = userEvent.setup();
    let rejectVerify!: (error: any) => void;
    vi.mocked(authApi.verifyEmail).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectVerify = reject;
        }),
    );
    render(<EmailVerifiedPage token="token" />, { wrapper: createWrapper() });

    rejectVerify(new Error("Verification failed"));
    const input = await screen.findByLabelText("Email Address");
    await user.type(input, "test");

    expect(
      await screen.findByRole("button", {
        name: "Resend Verification Email",
      }),
    ).toBeDisabled();

    await user.click(
      await screen.findByRole("button", {
        name: "Resend Verification Email",
      }),
    );

    expect(authApi.sendVerificationEmailAgain).not.toHaveBeenCalled();
  });
});
