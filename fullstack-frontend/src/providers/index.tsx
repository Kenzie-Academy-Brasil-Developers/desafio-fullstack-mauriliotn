"use client";
import { ReactNode } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { ContactProvider } from "@/contexts/contactContext";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <ContactProvider>{children}</ContactProvider>
      </AuthProvider>
    </>
  );
};
