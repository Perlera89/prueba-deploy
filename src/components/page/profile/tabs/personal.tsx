import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateProfile } from "@/hooks/use-profile";
import {
  Edit,
  Save,
  Github,
  Linkedin,
  ExternalLink,
  Twitter,
} from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { personalFormSchema, PersonalFormValues } from "@/schema/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstructorProfile } from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PersonalTabProps {
  profile: InstructorProfile;
}

import { useAuthStore } from "@/store/auth";

export default function PersonalTab({ profile }: PersonalTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const updateProfileMutation = useUpdateProfile();
  const user = useAuthStore((state) => state.user);

  const form = useForm<PersonalFormValues>({
    resolver: zodResolver(personalFormSchema),
    mode: "onChange",
    defaultValues: {
      names: "",
      surnames: "",
      title: "",
      aboutMe: "",
      thelephone: "",
      contactInfo: {
        email: "",
        office: "",
        office_hours: "",
      },
      socialLinks: {
        linkedin: "",
        twitter: "",
        github: "",
      },
    },
  });

  useEffect(() => {
    form.reset({
      names: profile?.names || "",
      surnames: profile?.surnames || "",
      title: profile?.title || "",
      aboutMe: profile?.aboutMe || "",
      thelephone: profile?.thelephone || "",
      contactInfo: {
        email: profile?.contactInfo?.email || "",
        office: profile?.contactInfo?.office || "",
        office_hours: profile?.contactInfo?.office_hours || "",
      },
      socialLinks: {
        linkedin: profile?.socialLinks?.linkedin || "",
        twitter: profile?.socialLinks?.twitter || "",
        github: profile?.socialLinks?.github || "",
      },
    });
  }, [profile, form]);

  const onSubmit = async (data: PersonalFormValues) => {

    const fullname = `${data.names} ${data.surnames}`.trim();
    try {
      await updateProfileMutation.mutateAsync({
        profile: { ...data, id: profile?.id },
      }).then(() => {
        useAuthStore.setState({ user: { ...user, names: data.names, surnames: data.surnames, fullName: fullname } });
      });
      setIsEditing(false);

    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <Card className="shadow-sm">
      <Form {...form}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="text-xl font-semibold">
              Información Personal
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Actualiza tu información personal y de contacto
            </CardDescription>
          </div>

          {isEditing ? (
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={form.handleSubmit(onSubmit)}
              disabled={
                updateProfileMutation.isPending || !form.formState.isDirty
              }
              className="transition-all"
            >
              <Save className="mr-2 h-4 w-4" />
              {updateProfileMutation.isPending ? "Guardando..." : "Guardar"}
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(true)}
              size="sm"
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
          )}
        </CardHeader>
        <CardContent className="px-6">
          {/* Sección Información Básica */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-primary">
              Información Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="names"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Nombre
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input id="first-name" {...field} className="h-9" />
                      </FormControl>
                    ) : (
                      <p className="text-sm font-medium pt-1.5 pb-0.5 border-b border-transparent group-hover:border-border transition-colors">
                        {profile?.names || (
                          <span className="text-muted-foreground italic">
                            No especificado
                          </span>
                        )}
                      </p>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="surnames"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Apellido
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input id="last-name" {...field} className="h-9" />
                      </FormControl>
                    ) : (
                      <p className="text-sm font-medium pt-1.5 pb-0.5 border-b border-transparent group-hover:border-border transition-colors">
                        {profile?.surnames || (
                          <span className="text-muted-foreground italic">
                            No especificado
                          </span>
                        )}
                      </p>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Título
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input id="title" {...field} className="h-9" />
                      </FormControl>
                    ) : (
                      <p className="text-sm font-medium pt-1.5 pb-0.5 border-b border-transparent group-hover:border-border transition-colors">
                        {profile?.title || (
                          <span className="text-muted-foreground italic">
                            No especificado
                          </span>
                        )}
                      </p>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thelephone"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Teléfono
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input id="phone" {...field} className="h-9" />
                      </FormControl>
                    ) : (
                      <p className="text-sm font-medium pt-1.5 pb-0.5 border-b border-transparent group-hover:border-border transition-colors">
                        {profile?.thelephone || (
                          <span className="text-muted-foreground italic">
                            No especificado
                          </span>
                        )}
                      </p>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Sección Información de Contacto */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-primary">
              Información de Contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactInfo.email"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Correo Electrónico
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input id="email" {...field} className="h-9" />
                      </FormControl>
                    ) : (
                      <p className="text-sm font-medium pt-1.5 pb-0.5 border-b border-transparent group-hover:border-border transition-colors">
                        {profile?.contactInfo?.email || (
                          <span className="text-muted-foreground italic">
                            No especificado
                          </span>
                        )}
                      </p>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactInfo.office"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Oficina
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input id="office" {...field} className="h-9" />
                      </FormControl>
                    ) : (
                      <p className="text-sm font-medium pt-1.5 pb-0.5 border-b border-transparent group-hover:border-border transition-colors">
                        {profile?.contactInfo?.office || (
                          <span className="text-muted-foreground italic">
                            No especificado
                          </span>
                        )}
                      </p>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactInfo.office_hours"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""} md:col-span-2`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground">
                      Horario de Atención
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input id="office-hours" {...field} className="h-9" />
                      </FormControl>
                    ) : (
                      <p className="text-sm font-medium pt-1.5 pb-0.5 border-b border-transparent group-hover:border-border transition-colors">
                        {profile?.contactInfo?.office_hours || (
                          <span className="text-muted-foreground italic">
                            No especificado
                          </span>
                        )}
                      </p>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-md font-medium text-primary">
              Enlaces Sociales
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="socialLinks.linkedin"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground flex items-center">
                      <Linkedin className="h-4 w-4 mr-1.5" /> LinkedIn
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/username"
                          {...field}
                          className="h-9"
                        />
                      </FormControl>
                    ) : (
                      <div className="pt-1">
                        {profile?.socialLinks?.linkedin ? (
                          <a
                            href={profile.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center group-hover:text-primary/80"
                          >
                            {profile.socialLinks.linkedin.replace(
                              /^https?:\/\/(www\.)?/i,
                              ""
                            )}
                            <ExternalLink className="h-3 w-3 ml-1 inline" />
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No especificado
                          </p>
                        )}
                      </div>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLinks.twitter"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground flex items-center">
                      <Twitter className="h-4 w-4 mr-1.5" /> Twitter
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          id="twitter"
                          placeholder="https://twitter.com/username"
                          {...field}
                          className="h-9"
                        />
                      </FormControl>
                    ) : (
                      <div className="pt-1">
                        {profile?.socialLinks?.twitter ? (
                          <a
                            href={profile.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center group-hover:text-primary/80"
                          >
                            {profile.socialLinks.twitter.replace(
                              /^https?:\/\/(www\.)?/i,
                              ""
                            )}
                            <ExternalLink className="h-3 w-3 ml-1 inline" />
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No especificado
                          </p>
                        )}
                      </div>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLinks.github"
                render={({ field }) => (
                  <FormItem
                    className={`space-y-1.5 ${!isEditing ? "group" : ""}`}
                  >
                    <FormLabel className="text-sm font-medium text-muted-foreground flex items-center">
                      <Github className="h-4 w-4 mr-1.5" /> GitHub
                    </FormLabel>
                    {isEditing ? (
                      <FormControl>
                        <Input
                          id="github"
                          placeholder="https://github.com/username"
                          {...field}
                          className="h-9"
                        />
                      </FormControl>
                    ) : (
                      <div className="pt-1">
                        {profile?.socialLinks?.github ? (
                          <a
                            href={profile.socialLinks.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline flex items-center group-hover:text-primary/80"
                          >
                            {profile.socialLinks.github.replace(
                              /^https?:\/\/(www\.)?/i,
                              ""
                            )}
                            <ExternalLink className="h-3 w-3 ml-1 inline" />
                          </a>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No especificado
                          </p>
                        )}
                      </div>
                    )}
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Sección Biografía */}
          <div className="space-y-4">
            <h3 className="text-md font-medium text-primary">
              Biografía Profesional
            </h3>
            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem className={`space-y-2 ${!isEditing ? "group" : ""}`}>
                  {isEditing ? (
                    <FormControl>
                      <Textarea
                        id="bio"
                        placeholder="Cuéntanos sobre tu experiencia profesional..."
                        className="min-h-[120px] resize-none"
                        {...field}
                      />
                    </FormControl>
                  ) : (
                    <div className="bg-card border border-transparent rounded-md p-3 group-hover:border-border transition-colors">
                      {profile?.aboutMe ? (
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {profile.aboutMe}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          No se ha proporcionado información biográfica
                        </p>
                      )}
                    </div>
                  )}
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t px-6 py-4 text-sm">
          <p className="text-muted-foreground">
            Última actualización:{" "}
            <span className="font-medium">
              {profile?.updatedAt
                ? dayjs(profile.updatedAt).format("DD/MM/YYYY HH:mm")
                : "No disponible"}
            </span>
          </p>
          {isEditing && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false);
                form.reset();
              }}
            >
              Cancelar
            </Button>
          )}
        </CardFooter>
      </Form>
    </Card>
  );
}
