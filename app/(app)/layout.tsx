import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {children}
      </main>
    </>
  );
}