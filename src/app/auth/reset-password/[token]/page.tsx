"use client";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();
  const { token } = params;

  return (
    <main className="w-full max-w-md rounded-lg py-20 shadow-md">
      <ResetPasswordForm token={token as string} />
    </main>
  );
}
