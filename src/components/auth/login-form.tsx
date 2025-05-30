"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAuthStore } from "@/store/auth";
import { useLogin } from "@/hooks/use-auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/schema/auth";
import Link from "next/link";
import SubmitButton from "../entry/button-submit";
import { PasswordInput } from "../entry/input-password";
import { api } from "@/route/api";
import { redirect } from "next/navigation";

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { login } = useAuthStore();
  const loginMutation = useLogin(login);

  // const router = useRouter();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const hanldeGoobleLogin = async () => {
    await api.get("/auth/google").then((res) => {
      redirect(res.data.authUrl);
    });
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    await loginMutation.mutateAsync(data);
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Inicia sesión con tu cuenta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Ingresa tu correo electrónico o código para iniciar sesión en tu
            cuenta
          </p>
        </div>
        <div className="grid gap-6">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico | Código</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="usuario@ejemplo.com"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel>Contraseña</FormLabel>
                  <Link
                    className="underline underline-offset-4 text-sm"
                    href="/auth/forgot-password"
                  >
                    No recuerdo mi contraseña
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput placeholder="●●●●●●●●" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton title="Iniciar sesión" isSubmiting={isSubmitting} />

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              O continúa con
            </span>
          </div>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={hanldeGoobleLogin}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Iniciar sesión con google
          </Button>
        </div>
        <div className="text-center text-sm">
          ¿No tienes una cuenta?&nbsp;
          <a href="/auth/register" className="underline underline-offset-4">
            Regístrate
          </a>
        </div>
      </form>
    </Form>
  );
}
