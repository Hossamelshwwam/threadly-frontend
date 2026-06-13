import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Providers from "@/config/providers";
import CustomToaster from "@/shared/components/custom-toaster/custom-toaster";
import { cn } from "@/lib/utils";

const cairo = Cairo({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Threadly — Curated Fashion Marketplace",
  description:
    "The curated marketplace for premium fashion and functional minimalism. Discover pieces that define your style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", cairo.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <CustomToaster />
      </body>
    </html>
  );
}
