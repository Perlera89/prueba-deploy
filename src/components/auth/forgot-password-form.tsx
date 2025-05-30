"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Brain } from "lucide-react";
import Link from "next/link";
import { useRequestPasswordReset } from "@/hooks/use-auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import SubmitButton from "../entry/button-submit";

// Esquema de validación con Zod
const formSchema = z.object({
  email: z.string().email({ message: "Ingresa un correo electrónico válido" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState("");

  const { setEmail } = useAuthStore();

  const requestPasswordResetMutation = useRequestPasswordReset();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await requestPasswordResetMutation
      .mutateAsync({
        email: data.email,
      })
      .then(() => {
        setSuccess(true);
        setEmail(data.email);
        setSentEmail(data.email);
      });
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="w-full max-w-md p-6 h-[70vh] rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4 p-3 rounded-full bg-primary/10">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center">Recuperar contraseña</h1>
      </div>

      {success ? (
        <div className="space-y-4">
          <div className="p-4 bg-muted text-sm rounded-md">
            <p className="text-center">
              Hemos enviado un correo con instrucciones para recuperar tu
              contraseña a <span className="font-medium">{sentEmail}</span>.
            </p>
          </div>

          <div className="text-center mt-4">
            <Link href="/" className="text-primary hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p className="text-muted-foreground text-center mb-6">
            Ingresa tu correo electrónico y te enviaremos un enlace para
            restablecer tu contraseña.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="correo@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton
                title="Enviar enlace de recuperación"
                isSubmiting={isSubmitting}
                className="w-full"
              />
            </form>
          </Form>
        </>
      )}
    </div>
  );
}
