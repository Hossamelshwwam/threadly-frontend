import { usersApi } from "@/domains/users/api/users.api";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProfileForm from "./ProfileForm";
import { createWrapper } from "@/shared/components/create-wrapper/create-wrapper";

vi.mock("@/domains/users/api/users.api", () => ({
  usersApi: {
    updateProfile: vi.fn(),
  },
}));

const mockUser = {
  data: {
    name: "Hossam",
    phone: "01063554728",
    email: "hossam@test.com",
  },
};

describe("Profile Form", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("pre-fills the form with user data", () => {
    render(<ProfileForm user={mockUser} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    expect(screen.getByLabelText("Full Name")).toHaveValue("Hossam");
    expect(screen.getByLabelText("Phone Number")).toHaveValue("01063554728");
    expect(screen.getByText("hossam@test.com")).toBeInTheDocument();
  });

  it("shows loading state while profile update is pending", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    let resolveUpdate!: (value: any) => void;

    vi.mocked(usersApi.updateProfile).mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    render(<ProfileForm user={mockUser} onCancel={onCancel} />, {
      wrapper: createWrapper(),
    });

    await user.type(screen.getByLabelText("Full Name"), " Attia");
    await user.click(
      screen.getByRole("button", { name: /save changes/i }),
    );

    expect(await screen.findByText(/updating profile/i)).toBeInTheDocument();

    resolveUpdate({});

    expect(
      await screen.findByText(/profile updated successfully/i),
    ).toBeInTheDocument();
    expect(onCancel).toHaveBeenCalled();
  });

  it("shows API error message when profile update fails", async () => {
    const user = userEvent.setup();

    let rejectUpdate!: (error: any) => void;

    vi.mocked(usersApi.updateProfile).mockImplementation(
      () =>
        new Promise((_, reject) => {
          rejectUpdate = reject;
        }),
    );

    render(<ProfileForm user={mockUser} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(await screen.findByText(/updating profile/i)).toBeInTheDocument();

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

  it("shows validation error when name is too short", async () => {
    const user = userEvent.setup();

    render(<ProfileForm user={mockUser} onCancel={vi.fn()} />, {
      wrapper: createWrapper(),
    });

    await user.clear(screen.getByLabelText("Full Name"));
    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(
      await screen.findByText(/name must be at least 2 characters/i),
    ).toBeInTheDocument();
    expect(usersApi.updateProfile).not.toHaveBeenCalled();
  });

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const onCancel = vi.fn();

    render(<ProfileForm user={mockUser} onCancel={onCancel} />, {
      wrapper: createWrapper(),
    });

    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
