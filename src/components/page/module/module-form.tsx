"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { moduleSchema, type ModuleFormValues } from "@/schema/module";
import { useFetchInstructors } from "@/hooks/use-instructor";
import { Module } from "@/types";
import { useCourseStore } from "@/store/course";
import { ImageUploader } from "@/components/entry/custom-image";
import SubmitButton from "@/components/entry/button-submit";
interface ModuleDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  module?: Module | null;
  mode?: "add" | "edit";
  onAction: (data: ModuleFormValues) => void;
}

export function ModuleDialog({
  isOpen,
  setIsOpen,
  module,
  mode,
  onAction,
}: ModuleDialogProps) {
  const { data: instructors = [] } = useFetchInstructors();
  const courseId = useCourseStore((state) => state.course.id);

  const form = useForm<ModuleFormValues>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      id: module?.id,
      title: module?.title || "",
      courseId: courseId || "",
      description: module?.description || "",
      isVisible: module?.isVisible,
      instructorId: module?.instructor?.id || "",
      picture: module?.picture || "",
    },
  });

  useEffect(() => {
    if (module) {
      form.reset({
        id: module?.id,
        title: module?.title || "",
        courseId: courseId || "",
        description: module?.description || "",
        isVisible: module?.isVisible,
        instructorId: module?.instructor?.id || "",
        picture: module?.picture || "",
      });
    }
  }, [module, form]);

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onAction)}>
            <DialogHeader>
              <DialogTitle>
                {mode === "add" ? "Agregar nuevo módulo" : "Editar módulo"}
              </DialogTitle>
              <DialogDescription>
                {mode === "add"
                  ? "Crea un nuevo módulo para este curso. Los módulos pueden contener varias secciones de contenido."
                  : "Modifica los detalles del módulo existente."}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageUploader
                        value={field.value as File | null}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        label="Imagen del módulo"
                        optional={true}
                        mode={mode}
                      />
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
                    <FormLabel required>Título</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Introducción a la programación"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instructorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instructor</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona un instructor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {instructors?.map((instructor) => (
                          <SelectItem
                            key={instructor.id}
                            value={instructor.id}
                            className="flex items-center gap-2"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={
                                    instructor.imagePerfil ||
                                    "/avatar-fallback.png"
                                  }
                                  alt={`${instructor.names} ${instructor.surnames}`}
                                />
                                <AvatarFallback>
                                  {instructor.names.charAt(0)}
                                  {instructor.surnames.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span>
                                {instructor.names} {instructor.surnames}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                        {instructors.length === 0 && (
                          <p className="flex justify-center items-center px-8 py-4 text-sm text-muted-foreground">
                            No hay instructores
                          </p>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Proporciona una descripción detallada del módulo..."
                      rows={4}
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <SubmitButton
                title={mode === "add" ? "Agregar Módulo" : "Actualizar Módulo"}
                isSubmiting={isSubmitting}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
