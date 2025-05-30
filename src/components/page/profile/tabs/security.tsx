import { PasswordInput } from "@/components/entry/input-password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useChangePassword } from "@/hooks/use-profile";
import { ChangePasswordFormValues, changePasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AlertCircle, Lock, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuthStore } from "@/store/auth";

export default function SecurityTab() {
  const { logout } = useAuthStore();

  const changePasswordMutation = useChangePassword();
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleChangePassword = async (data: ChangePasswordFormValues) => {
    try {
      await changePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      form.reset({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });

      logout();
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
    }
  };
  return (
    <Card className="shadow-sm border-muted">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-1.5">
          <Lock className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Seguridad de la Cuenta</CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          Gestiona la seguridad y el acceso a tu cuenta
        </CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleChangePassword)}>
          <CardContent className="space-y-6 pt-2">
            {/* Mensaje de información */}
            <Alert className="bg-muted/50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Recomendaciones de seguridad</AlertTitle>
              <AlertDescription className="text-sm">
                <ul className="list-disc list-inside mt-1.5 space-y-1">
                  <li>
                    Utiliza una contraseña única que no uses en otros sitios
                  </li>
                  <li>Combina mayúsculas, minúsculas, números y símbolos</li>
                  <li>Evita información personal fácil de adivinar</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-5">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="font-medium">
                      Contraseña Actual
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        id="current-password"
                        placeholder="Introduce tu contraseña actual"
                        className="bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium" />
                  </FormItem>
                )}
              />

              <div className="border-t pt-5">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">Nueva Contraseña</h3>
                </div>

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="new-password"
                            placeholder="Introduce tu nueva contraseña"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Mínimo 8 caracteres, debe incluir mayúsculas,
                          minúsculas y números
                        </FormDescription>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmNewPassword"
                    render={({ field }) => (
                      <FormItem className="space-y-1.5">
                        <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="confirmNewPassword"
                            placeholder="Confirma tu nueva contraseña"
                            className="bg-background"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs font-medium" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t flex justify-between py-4 px-6">
            <Button
              type="submit"
              className="ml-auto"
              disabled={
                !form.formState.isValid || changePasswordMutation.isPending
              }
            >
              {changePasswordMutation.isPending
                ? "Actualizando..."
                : "Actualizar Contraseña"}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
