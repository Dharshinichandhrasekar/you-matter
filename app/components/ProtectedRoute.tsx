"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import ClientOnly from "./ClientOnly";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  return (
    <ClientOnly fallback={<div className="p-4">Loading...</div>}>
      <ProtectedRouteContent>{children}</ProtectedRouteContent>
    </ClientOnly>
  );
}

function ProtectedRouteContent({ children }: { children: ReactNode }) {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) return <div className="p-4">Loading...</div>;
  return <>{user && children}</>;
}
