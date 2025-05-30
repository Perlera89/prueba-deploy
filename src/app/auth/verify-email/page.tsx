"use client";
import EmailVerification from "@/components/auth/verify-email-form";
import { useAuthStore } from "@/store/auth";

export default function VerifyEmailPage() {
  const { email } = useAuthStore();

  return <EmailVerification email={email} />;
}
