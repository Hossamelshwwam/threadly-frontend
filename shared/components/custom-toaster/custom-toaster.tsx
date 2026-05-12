import { Toaster } from "sonner";

export default function CustomToaster() {
  return (
    <Toaster
      richColors
      position="bottom-right"
      closeButton
      toastOptions={{
        style: {
          fontFamily: "Cairo, sans-serif",
        },
      }}
    />
  );
}
