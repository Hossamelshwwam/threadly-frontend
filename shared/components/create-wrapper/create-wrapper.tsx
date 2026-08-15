import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomToaster from "../custom-toaster/custom-toaster";

export function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
        <CustomToaster />
      </QueryClientProvider>
    );
  }

  return Wrapper;
}
