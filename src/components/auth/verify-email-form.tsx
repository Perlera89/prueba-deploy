"use client";

import { useState } from "react";
import { Brain } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useRequestVerificationEmail, useVerifyOtp } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import SubmitButton from "../entry/button-submit";

interface EmailVerificationProps {
  email: string;
}

const verificationFormSchema = z.object({
  verificationCode: z.string().length(6, "El código debe tener 6 dígitos"),
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

export default function EmailVerification({ email }: EmailVerificationProps) {
  const [isResending, setIsResending] = useState(false);

  const requestVerificationEmailMutation = useRequestVerificationEmail();
  const verifyOtpMutation = useVerifyOtp();

  // Configurar el formulario con React Hook Form y Zod
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      verificationCode: "",
    },
  });

  const resendVerificationEmail = () => {
    setIsResending(true);
    requestVerificationEmailMutation
      .mutateAsync({
        email,
      })
      .then(() => { })
      .finally(() => {
        setIsResending(false);
      });
  };

  const onSubmit = async (data: VerificationFormValues) => {
    await verifyOtpMutation.mutateAsync({
      email,
      otp: data.verificationCode,
    });
  };

  const isFormValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="w-full h-[60vh] max-w-md flex flex-col items-center justify-center p-6">
      <div className="mb-4 p-3 rounded-full bg-primary">
        <Brain className="h-8 w-8 text-secondary" />
      </div>

      <h1 className="text-2xl font-bold text-center mb-2">
        Verificación de correo
      </h1>

      <p className="text-center text-sm text-muted-foreground mb-6">
        Hemos enviado un código de 6 dígitos a<br />
        <span className="text-foreground">{email}</span>
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="verificationCode"
            render={({ field }) => (
              <FormItem className="mb-6 w-full flex justify-center">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="text-sm text-muted-foreground mb-6 text-center">
            ¿No recibiste el código?{" "}
            <button
              type="button"
              onClick={resendVerificationEmail}
              disabled={isResending}
              className="text-primary underline focus:outline-none"
            >
              {isResending ? "Reenviando..." : "Reenviar código"}
            </button>
          </div>

          <SubmitButton
            className="w-full"
            title="Verificar código"
            isSubmiting={isSubmitting}
            isValid={isFormValid}
          />
        </form>
      </Form>
    </div>
  );
}
