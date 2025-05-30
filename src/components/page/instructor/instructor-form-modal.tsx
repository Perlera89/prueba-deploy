import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  instructorSchema,
  InstructorFormData,
} from "@/schema/instructor-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSaveInstructor } from "@/hooks/use-instructor";
import { useState, useEffect } from "react";
import SubmitButton from "@/components/entry/button-submit";
import { InstructorProfile } from "@/types";
import { ImageUpload } from "@/components/auth/image-uploader";
import { PasswordInput } from "@/components/entry/input-password";
import { useUploadThumbnail } from "@/hooks/use-thumbnail";

interface InstructorFormModalProps {
  instructor?: InstructorProfile;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function InstructorFormModal({
  instructor,
  isOpen,
  onClose,
  onSuccess,
}: InstructorFormModalProps) {
  const saveInstructorMutation = useSaveInstructor();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!instructor;
  const [existingImageUrl, setExistingImageUrl] = useState<string | undefined>(
    instructor?.imagePerfil
  );

  const form = useForm<InstructorFormData>({
    resolver: zodResolver(instructorSchema),
    defaultValues: {
      id: instructor?.id || "",
      email: instructor?.user?.email || "",
      password: "",
      instructorCode: instructor?.instructorCode || "",
      names: instructor?.names || "",
      surnames: instructor?.surnames || "",
      title: instructor?.title || "",
      imagePerfil: undefined,
    },
  });
  useEffect(() => {
    if (instructor) {
      setExistingImageUrl(instructor.imagePerfil);
      form.reset({
        id: instructor.id,
        email: instructor.user?.email || "",
        password: "",
        instructorCode: instructor.instructorCode,
        names: instructor.names,
        surnames: instructor.surnames,
        title: instructor.title || "",
        imagePerfil: undefined,
      });
    }
  }, [instructor, form]);

  const onSubmit = async (data: InstructorFormData) => {
    setIsSubmitting(true);
    try {
      const { imagePerfil, password, ...restData } = data;

      const instructorData: Omit<
        InstructorFormData,
        "profileImage" | "password"
      > & {
        imagePerfil?: string;
        password?: string;
        profileImage?: {
          url: string;
          title: string;
          fileExtension: string;
        };
      } = {
        ...restData,
      };

      if (password) {
        instructorData.password = password;
      }

      if (imagePerfil) {
        const imageUrl = await useUploadThumbnail(imagePerfil);

        instructorData.imagePerfil = imageUrl;
      } else if (isEditMode && existingImageUrl) {
        instructorData.imagePerfil = existingImageUrl as any;
      }

      await saveInstructorMutation.mutateAsync({
        instructor: instructorData,
      });

      onClose();
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error("Error al guardar instructor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    onClose();
    if (!isEditMode) {
      form.reset();
    }
  };

  const handleImageChange = (file?: File) => {
    if (file) {
      setExistingImageUrl(undefined);
      form.setValue("imagePerfil", file);
    } else {
      setExistingImageUrl(undefined);
      form.setValue("imagePerfil", undefined);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Instructor" : "Agregar Nuevo Instructor"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifique la información del instructor. Puede actualizar todos los campos, incluido el correo y la contraseña."
              : "Complete la información para registrar un nuevo instructor en la plataforma."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="imagePerfil"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Imagen de Perfil</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={value}
                      onChange={handleImageChange}
                      existingUrl={existingImageUrl}
                      {...fieldProps}
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
                    <FormLabel required>Nombres</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Juan Carlos" {...field} />
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
                    <FormLabel required>Apellidos</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: García López" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Correo Electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="instructor@ejemplo.com"
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
                    <FormLabel required={!isEditMode}>
                      Contraseña {isEditMode && "(Dejar vacío para mantener)"}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder={
                          isEditMode
                            ? "Nueva contraseña (opcional)"
                            : "Mínimo 8 carácteres"
                        }
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instructorCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Código de Instructor</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: INST001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título Académico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Dr., Ing., Lic., MSc."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="gap-2 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={handleCloseModal}
              >
                Cancelar
              </Button>
              <SubmitButton
                title={
                  isEditMode ? "Actualizar Instructor" : "Agregar Instructor"
                }
                isSubmiting={isSubmitting}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
