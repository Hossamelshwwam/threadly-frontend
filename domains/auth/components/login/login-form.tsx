"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import useLoginSchema, {
  LoginSchemaType,
} from "@/domains/auth/schemas/useLoginSchema";
import CustomButton from "@/shared/components/custom-button/custom-button";
import CustomInput from "@/shared/components/custom-input/CustomInput";
import useAuthLogin from "../../hooks/useAuthLogin";
import { toast } from "sonner";

export default function LoginForm() {
  const { mutateAsync: login, isPending } = useAuthLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(useLoginSchema),
  });
  const onSubmit = (data: LoginSchemaType) => {
    toast.promise(login(data), {
      loading: "Signing in...",
      success: (data) => `Welcome back, ${data.user.name}!`,
      error: (error) => error.response?.data.message,
    });
  };
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Email Input Group */}
      <CustomInput
        type="email"
        placeholder="name@company.com"
        name="email"
        label="Email Address"
        registerProps={register("email")}
        error={errors.email?.message}
      />

      <CustomInput
        type="password"
        placeholder="••••••••"
        name="password"
        label="Password"
        registerProps={register("password")}
        error={errors.password?.message}
      />

      {/* CTA Button */}
      <CustomButton
        type="submit"
        className="mt-4"
        rightIcon={<FaArrowRight size={10} />}
        variant="solid"
        theme="primary"
        loading={isPending}
      >
        Login
      </CustomButton>
    </form>
  );
}
