import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseFormData, courseSchema } from "@/schema/course";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AddBasicInfo from "./form/add-basic-info";
import AddClasification from "./form/add-clasification";
import AddStatus from "./form/add-status";
import { useSaveCourse } from "@/hooks/course/use-course";
import { Checkbox } from "../../ui/checkbox";
import { Label } from "../../ui/label";
import SubmitButton from "../../entry/button-submit";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { ImageUploader } from "@/components/entry/custom-image";
import { useUploadImage } from "@/hooks/use-updoad-image";

interface CourseFormProps {
  initialData?: CourseFormData;
  isEditing?: boolean;
}

export function AddCourseForm({
  initialData,
  isEditing = false,
}: CourseFormProps) {
  const router = useRouter();
  const [originalData, setOriginalData] = useState<CourseFormData | undefined>(
    initialData
  );
  const saveCourseMutaton = useSaveCourse();

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: initialData,
  });

  //const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    if (initialData) {
      setOriginalData(initialData);
    }
  }, [initialData, form]);

  const onSubmit = async (data: CourseFormData) => {
    const uploadImage = await useUploadImage(data.picture as File)
      .then((res) => res)
      .catch(() => typeof data.picture === 'string' ? '' : data.picture);

    await saveCourseMutaton.mutateAsync({
      course: { ...data, picture: uploadImage },
    });
  };

  /*const handleDiscardChanges = () => {
    if (isEditing) {
      form.reset(originalData);
    } else {
      form.reset(initialData);
    }
  };*/

  return (
    <div className="w-full px-2 sm:px-8">
      <div className="flex items-center mb-3 sm:mb-4">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          size="sm"
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver a mis Cursos
        </Button>
      </div>

      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle>
                {isEditing ? "Editar Curso" : "Crear Nuevo Curso"}
              </CardTitle>
              <CardDescription>
                {isEditing
                  ? "Modifica la información del curso existente."
                  : "Complete la información para crear un nuevo curso en la plataforma."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardContent className="space-y-6 px-4 sm:px-6">
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
                        label="Imagen del Curso"
                        optional={true}
                        mode={isEditing ? "edit" : "add"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <AddBasicInfo form={form} />
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Precio</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                            $
                          </span>
                          <Input
                            type="number"
                            placeholder="9.99"
                            className="w-full pl-8"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AddStatus form={form} />
              </div>
              <AddClasification form={form} />
              <Separator />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={4}
                        maxLength={500}
                        placeholder="Agrega una descripción del curso"
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
                name="isVisible"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="visible"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <Label htmlFor="visible" className="text-sm">
                          Visible para estudiantes
                        </Label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between px-4 sm:px-6 py-4 sm:py-6">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.push("/courses")}
              >
                Cancelar
              </Button>
              <SubmitButton title="Guardar Curso" isSubmiting={isSubmitting} />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
