import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import {
  requestVerificationEmail,
  verifyOtp,
  requestPasswordReset,
  resetPasswordWithToken,
} from "@/route/auth";
import { useSaveData } from "./use-generic";

export function useRegister(
  registerFn: (user: Partial<User>) => Promise<void>
) {
  const router = useRouter();

  return useMutation({
    mutationFn: registerFn,
    onSuccess: () => {
      router.push("/auth/verify-email");
      toast.success("Registro exitoso");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Error desconocido";
      toast.error("Error al crear la cuenta", {
        description: errorMessage,
      });
    },
  });
}

export function useLogin(loginFn: (user: Partial<User>) => Promise<void>) {
  const router = useRouter();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      router.push("/home");
    },
    onError: (error) => {
      const errorMessage =
        (error as any)?.response?.data?.message || "Error desconocido";
      toast.error("Error al iniciar sesión", {
        description: errorMessage,
      });
    },
  });
}

export function useRequestVerificationEmail() {
  return useSaveData(
    async ({ email }: { email: string }) => {
      await requestVerificationEmail(email);
    },
    ["verification-email"],
    "Se ha enviado un correo de verificación",
    "Error al enviar el correo de verificación"
  );
}

export function useVerifyOtp() {
  return useSaveData(
    async ({ email, otp }: { email: string; otp: string }) => {
      await verifyOtp(email, otp);
    },
    ["verify-otp"],
    "Código de verificación exitoso",
    "Error al verificar el código",
    "/auth/login"
  );
}

export function useRequestPasswordReset() {
  return useSaveData(
    async ({ email }: { email: string }) => {
      await requestPasswordReset(email);
    },
    ["request-password-reset"],
    "Se ha enviado un correo para restablecer la contraseña",
    "Error al enviar el correo para restablecer la contraseña"
  );
}

export function useResetPassword() {
  return useSaveData(
    async ({ token, password }: { token: string; password: string }) => {
      await resetPasswordWithToken(token, password);
    },
    ["reset-password"],
    "Contraseña restablecida exitosamente",
    "Error al restablecer la contraseña"
  );
}
