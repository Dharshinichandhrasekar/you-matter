import "./globals.css";
import { ReactNode } from "react";
import { AuthProvider } from "@/lib/AuthProvider";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { Toaster } from "sonner";

export const metadata = {
  title: "YouMatter - Your Mental Wellness Journey",
  description:
    "A private, beautiful space to track your moods, journal your thoughts, and discover emotional well-being insights.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="top-center" richColors closeButton />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
