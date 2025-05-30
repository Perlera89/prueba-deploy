import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { nanoid } from "nanoid";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { ResourceUploader } from "./resource-uploader";
import { AssignmentEvaluation } from "./assignment-evaluation";
import {
  RubricCriteria,
  ContentType,
  ResourceType,
  ResourceUpload,
} from "@/types";
import { getFileExtension } from "@/utils/material";
import { RichTextEditor } from "@/components/entry/rich-text-editor";
import { useSaveContent } from "@/hooks/use-content";
import { contentSchema, ContentFormData } from "@/schema/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/entry/button-submit";

interface ContentFormProps {
  contentType: ContentType;
  initialData: ContentFormData;
  isEditing?: boolean;
}

export default function ContentForm({
  contentType,
  initialData,
  isEditing = false,
}: ContentFormProps) {
  console.log("initialData", initialData);

  const router = useRouter();
  const [resources, setResources] = useState<ResourceUpload[]>([]);

  const [rubricCriteria, setRubricCriteria] = useState<RubricCriteria[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [uploadErrors, setUploadErrors] = useState<Record<string, string>>({});
  const saveContentMutation = useSaveContent();

  const form = useForm<any>({
    resolver: zodResolver(contentSchema),
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      // Asigna los valores del formulario desde initialData
      form.reset(initialData);

      if (
        initialData.files &&
        initialData.files.length > 0 &&
        resources.length === 0
      ) {
        const existingResources: ResourceUpload[] = initialData.files.map(
          (file) => {
            if (file.fileExtension === ResourceType.URL) {
              return {
                id: nanoid(),
                type: ResourceType.URL,
                value: file.url || "",
                cloudinaryTitle: file.title || "",
              };
            } else {
              return {
                id: nanoid(),
                type: ResourceType.FILE,
                value: file.title || "",
                fileType: file.fileExtension
                  ? `application/${file.fileExtension}`
                  : "application/octet-stream",
                cloudinaryUrl: file.url || "",
                cloudinaryTitle: file.title || "",
                cloudinaryFileExtension: file.fileExtension || "",
              };
            }
          }
        );
        setResources(existingResources);
      }

      if (
        initialData.assignment?.rubric &&
        Array.isArray(initialData.assignment.rubric) &&
        rubricCriteria.length === 0
      ) {
        setRubricCriteria(initialData.assignment.rubric);
      }
    }
  }, [initialData]);

  useEffect(() => {
    // Solo ejecutamos este efecto una vez cuando estamos en modo edición
    if (isEditing && initialData && resources.length === 0) {
      const existingResources: ResourceUpload[] = [];

      // Convertir archivos existentes al formato ResourceUpload
      if (initialData.files && initialData.files.length > 0) {
        initialData.files.forEach((file) => {
          // Determinar si es un archivo o un enlace
          if (file.fileExtension === ResourceType.URL) {
            // Es un enlace
            existingResources.push({
              id: nanoid(),
              type: ResourceType.URL,
              value: file.url || "",
              cloudinaryTitle: file.title || "",
            });
          } else {
            // Es un archivo
            existingResources.push({
              id: nanoid(),
              type: ResourceType.FILE,
              value: file.title || "",
              fileType: file.fileExtension
                ? `application/${file.fileExtension}`
                : "application/octet-stream",
              cloudinaryUrl: file.url || "",
              cloudinaryTitle: file.title || "",
              cloudinaryFileExtension: file.fileExtension || "",
            });
          }
        });
      }

      // Inicializar la rúbrica si existe
      if (
        initialData.assignment?.rubric &&
        Array.isArray(initialData.assignment.rubric) &&
        rubricCriteria.length === 0
      ) {
        setRubricCriteria(initialData.assignment.rubric);
      }

      if (existingResources.length > 0) {
        setResources(existingResources);
      }
    }
  }, [isEditing, initialData, resources.length, rubricCriteria.length]);

  const isSubmitting = form.formState.isSubmitting;

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to upload file");
      }

      return {
        url: data.url,
        title: data.title,
        fileExtension: data.fileExtension,
      };
    } catch (error) {
      throw error;
    }
  };

  const uploadAllFiles = async (resources: ResourceUpload[]) => {
    // Solo procesamos los archivos que aún no han sido subidos
    const fileResources = resources.filter(
      (resource) =>
        resource.type === ResourceType.FILE &&
        resource.file &&
        !resource.cloudinaryUrl
    );

    if (fileResources.length === 0) {
      return resources;
    }

    const initialProgress: Record<string, number> = {};
    const initialErrors: Record<string, string> = {};
    fileResources.forEach((resource) => {
      initialProgress[resource.id] = 0;
      initialErrors[resource.id] = "";
    });
    setUploadProgress(initialProgress);
    setUploadErrors(initialErrors);

    const results = [...resources];

    for (const resource of fileResources) {
      if (resource.type === ResourceType.FILE && resource.file) {
        try {
          setUploadProgress((prev) => ({ ...prev, [resource.id]: 10 }));

          const cloudinaryData = await uploadToCloudinary(resource.file);

          setUploadProgress((prev) => ({ ...prev, [resource.id]: 100 }));

          const index = results.findIndex((r) => r.id === resource.id);
          if (index !== -1) {
            results[index] = {
              ...results[index],
              cloudinaryUrl: cloudinaryData.url,
              cloudinaryTitle: cloudinaryData.title,
              cloudinaryFileExtension: cloudinaryData.fileExtension,
            };
          }
        } catch (error) {
          setUploadProgress((prev) => ({ ...prev, [resource.id]: -1 }));
          setUploadErrors((prev) => ({
            ...prev,
            [resource.id]:
              error instanceof Error ? error.message : String(error),
          }));
        }
      }
    }

    return results;
  };

  const handleContentSubmit = async (data: ContentFormData) => {
    try {
      // Procesamos los archivos para subirlos a Cloudinary
      const fileResources = resources.filter(
        (resource) => resource.type === ResourceType.FILE
      );

      const newFileResources = fileResources.filter(
        (resource) => !resource.cloudinaryUrl && resource.file
      );

      // Solo subimos los archivos nuevos
      let updatedResources = [...resources];
      if (newFileResources.length > 0) {
        updatedResources = await uploadAllFiles(resources);
      } // Transformamos los recursos a la estructura que espera la API
      // Primero los archivos que han sido subidos a Cloudinary
      const allCloudinaryFiles = updatedResources
        .filter(
          (resource) =>
            resource.type === ResourceType.FILE && resource.cloudinaryUrl
        )
        .map((resource) => ({
          title: resource.value,
          fileExtension:
            resource.cloudinaryFileExtension ||
            getFileExtension(resource.value),
          url: resource.cloudinaryUrl || "",
        })); // Ahora procesamos los URLs
      const allUrls = updatedResources
        .filter((resource) => resource.type === ResourceType.URL)
        .map((resource) => ({
          title: resource.value,
          url: resource.value,
          fileExtension: "url", // Usamos "url" como extensión para enlaces
        }));

      // Combinamos todos los recursos
      const allResources = [...allCloudinaryFiles, ...allUrls];

      // Preparamos el objeto de datos para enviar
      const contentData: ContentFormData = {
        ...data,
        files: allResources,
      };

      // Agregamos la rúbrica si este es un assignment (tarea)
      if (contentType === ContentType.ASSIGNMENT && rubricCriteria.length > 0) {
        if (!contentData.assignment) {
          contentData.assignment = {};
        }

        // Aplicamos los criterios de la rúbrica directamente
        contentData.assignment.rubric = rubricCriteria;
      }

      await saveContentMutation.mutateAsync({
        content: contentData,
      });

      router.back();
      form.reset();
      setResources([]);
    } catch (error) {
    } finally {
      setUploadProgress({});
    }
  };

  return (
    <div className="w-full px-2 sm:px-8">
      <div className="flex items-center mb-3 sm:mb-4">
        <Button onClick={() => router.back()} variant="ghost">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al Módulo
        </Button>
      </div>
      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>
                {isEditing ? "Editar" : "Agregar"}&nbsp;
                {contentType === "material" ? "Material" : "Actividad"}
              </CardTitle>
              <CardDescription>
                Complete la información para&nbsp;
                {isEditing ? "actualizar" : "agregar"}&nbsp;
                {contentType === "material" ? "el material" : "la actividad"}
                &nbsp;
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleContentSubmit)}
            className="space-y-6"
          >
            <CardContent className="space-y-6 px-4 sm:px-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Título</FormLabel>
                    <FormControl>
                      <Input placeholder="Título del recurso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        value={field.value || ""}
                        onChange={field.onChange}
                        placeholder={`Descripción para ${contentType === "material" ? "material" : "tarea"}...`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {contentType === ContentType.ASSIGNMENT && (
                <AssignmentEvaluation
                  form={form}
                  rubricCriteria={rubricCriteria}
                  setRubricCriteria={setRubricCriteria}
                />
              )}
              <ResourceUploader
                resources={resources}
                setResources={setResources}
                isSubmitting={isSubmitting}
                uploadProgress={uploadProgress}
                uploadErrors={uploadErrors}
              />

              <FormField
                control={form.control}
                name="isVisible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-8">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Visible para estudiantes</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between px-4 sm:px-6 py-4 ">
              <Button
                type="button"
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <SubmitButton
                title={`${isEditing ? "Actualizar" : "Crear"} ${contentType === "material" ? "Material" : "Actividad"}`}
                isSubmiting={isSubmitting}
              />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
