import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/lib/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arabic keyboard",
  description: "This app helps users type Arabic on any keyboard.",
  applicationName: "ArabicKeyboard",
  keywords: ["Arabic", "keyboard", "type", "language", "input"],
  authors: [
    {
      name: "Quatadah Nasdami",
      url: "https://quatadahnasdami.vercel.app",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "flex min-h-screen flex-col items-center flex-start w-full max-w-6xl p-8 mx-auto rounded-lg"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex min-h-screen flex-col items-center flex-start">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
      <Toaster />
    </html>
  );
}
