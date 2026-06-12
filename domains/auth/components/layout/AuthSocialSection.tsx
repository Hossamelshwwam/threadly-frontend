import { FcGoogle } from "react-icons/fc";
import CustomButton from "@/shared/components/custom-button/custom-button";

export function AuthSocialSection() {
  return (
    <>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white px-4 text-xs font-medium text-zinc-400">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <CustomButton
          rightIcon={<FcGoogle size={20} />}
          className="w-full"
          variant="outline"
          theme="neutral"
        >
          Continue with Google
        </CustomButton>
      </div>
    </>
  );
}
