import type React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ModuleInfoFormData, moduleInfoSchema } from "@/schema/module";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { useSaveCourseInfo } from "@/hooks/use-module-info";
import AddAcademicDetails from "../courses/form/add-academic-details";
import SubmitButton from "../../entry/button-submit";
import { useModuleStore } from "@/store/module";

interface CourseFormProps {
  initialData?: ModuleInfoFormData;
  isEditing?: boolean;
}

export function ModuleInfoForm({
  initialData,
  isEditing = false,
}: CourseFormProps) {
  const router = useRouter();
  const moduleId = useModuleStore((state) => state.module.id);
  const saveCourseInfoMutaton = useSaveCourseInfo(moduleId);

  const form = useForm<ModuleInfoFormData>({
    resolver: zodResolver(moduleInfoSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: ModuleInfoFormData) => {
    await saveCourseInfoMutaton.mutateAsync({ moduleInfo: data }).then(() => {
      router.back();
    });
  };

  return (
    <>
      <div className="w-full px-2 sm:px-8">
        <div className="flex items-center mb-3 sm:mb-4">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Volver al Módulo
          </Button>
        </div>

        <Card className="w-full">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle>
                  {isEditing
                    ? "Editar Información del Curso"
                    : "Agregar Información al Curso"}
                </CardTitle>
                <CardDescription>
                  {isEditing
                    ? "Actualiza la información del curso en la plataforma."
                    : "Agrega información relevante para el curso."}
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
              <CardContent className="space-y-6 px-4 sm:px-6">
                <AddAcademicDetails form={form} />
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between px-4 sm:px-6 py-4 sm:py-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => router.back()}
                  className="w-full sm:w-auto"
                >
                  Cancelar
                </Button>
                <SubmitButton
                  title="Guardar Información"
                  isSubmiting={isSubmitting}
                />
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </>
  );
}
