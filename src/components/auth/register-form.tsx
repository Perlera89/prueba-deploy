import { cn } from "@/lib/utils";
import type React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ImageUpload } from "./image-uploader";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormValues, registerSchema } from "@/schema/auth";
import { useRegister, useRequestVerificationEmail } from "@/hooks/use-auth";
import { useAuthStore } from "@/store/auth";
import SubmitButton from "../entry/button-submit";
import { PasswordInput } from "../entry/input-password";
import { useUploadThumbnail } from "@/hooks/use-thumbnail";

export default function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { register, setEmail } = useAuthStore();
  const registerMutation = useRegister(register);
  const requestVerificationEmailMutation = useRequestVerificationEmail();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      names: "",
      surnames: "",
      password: "",
      confirmPassword: "",
      instructorRequest: false,
      acceptTerms: false,
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      let imageUrl: string = "";

      if (data.profileImage) {
        imageUrl = await useUploadThumbnail(data.profileImage);
      }

      await registerMutation.mutateAsync({
        ...data,
        profileImage: imageUrl,
      });
      setEmail(data.email);
      await requestVerificationEmailMutation.mutateAsync({
        email: data.email,
      });
    } catch (error) {

    }
  };

  const isFormValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Crear una cuenta</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Ingresa tus datos a continuación para crear tu cuenta
          </p>
        </div>

        <FormField
          control={form.control}
          name="profileImage"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <ImageUpload
                  value={value}
                  onChange={onChange}
                  {...fieldProps}
                />
              </FormControl>
              <FormDescription>
                Selecciona una imagen para el perfil
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input
                    placeholder="usuario@ejemplo.com"
                    type="email"
                    required
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombres</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="David"
                      type="text"
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
              name="surnames"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input placeholder="Díaz" type="text" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
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

          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex gap-2 items-center">
                    <Checkbox
                      id="visible-section"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <p className="text-sm">
                      Acepta los{" "}
                      <Link
                        href="/policy/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        Términos
                      </Link>{" "}
                      y&nbsp;
                      <Link
                        href="/policy/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-4"
                      >
                        Condiciones
                      </Link>
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SubmitButton
            title="Registrarse"
            isSubmiting={isSubmitting}
            isValid={isFormValid}
          />
        </div>

        <div className="text-center text-sm">
          ¿Ya tienes una cuenta?&nbsp;
          <Link href="/auth/login" className="underline underline-offset-4">
            Inicia sesión
          </Link>
        </div>
      </form>
    </Form>
  );
}
