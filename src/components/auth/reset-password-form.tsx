"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Brain } from "lucide-react";
import { useResetPassword } from "@/hooks/use-auth";
import SubmitButton from "../entry/button-submit";
import { PasswordInput } from "../entry/input-password";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const resetPasswordMutation = useResetPassword();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    await resetPasswordMutation
      .mutateAsync({
        token,
        password: data.password,
      })
      .then(() => {
        router.push("/auth/login");
      });
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="w-full max-w-md h-[70vh] p-6 rounded-lg">
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4 p-3 rounded-full bg-primary/10">
          <Brain className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-center">
          Restablecer contraseña
        </h1>
      </div>

      <>
        <p className="text-muted-foreground text-center mb-6">
          Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="●●●●●●●●" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="●●●●●●●●" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton
              title="Restablecer contraseña"
              isSubmiting={isSubmitting}
              className="w-full"
            />
          </form>
        </Form>
      </>
    </div>
  );
}
