import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getInitials } from "@/utils/initials";
import { useModuleStore } from "@/store/module";
import { useCourseStore } from "@/store/course";
import { useAuthStore } from "@/store/auth";

export default function InfoTab() {
  const moduleId = useModuleStore((state) => state.module.id);
  const description = useModuleStore((state) => state.module.description);
  const courseId = useCourseStore((state) => state.course.id);
  const isInstructor = useModuleStore((state) => state.module.isInstructor);
  const moduleInfo = useModuleStore((state) => state.module.moduleInfo);
  const instructor = useModuleStore((state) => state.module.instructor);
  const role = useAuthStore((state) => state.user?.role);

  const instructorFullName: string = `${instructor?.names} ${instructor?.surnames}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Información del Curso</CardTitle>
              {(isInstructor || role === "manager") && (
                <Link href={`/courses/${courseId}/${moduleId}/edit-info`}>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar Información
                  </Button>
                </Link>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Descripción</h3>
              <p className="text-sm text-muted-foreground">
                {description || "Sin descripción disponible."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Objetivos de Aprendizaje</h3>

              <div>
                <h4 className="text-sm font-medium mb-2">Objetivo General</h4>
                <p className="text-sm text-muted-foreground">
                  {moduleInfo?.objectives?.general ||
                    "No hay objetivo general definido."}
                </p>
                <h4 className="text-sm font-medium my-2">
                  Objetivos Específicos
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
                  {moduleInfo?.objectives?.specific?.map((objective) => (
                    <li key={objective}>{objective}</li>
                  )) || <li>No hay objetivos específicos definidos.</li>}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Metodología</h3>
              <p className="text-sm text-muted-foreground">
                {moduleInfo?.methodology || "No hay metodología definida."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalles del Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="font-medium">Requisitos Previos</p>
                  <p className="text-muted-foreground">
                    {moduleInfo?.preRequisite || "Ninguno"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profesor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={instructor?.imagePerfil}
                  alt={instructor?.names}
                />
                <AvatarFallback>
                  {getInitials(instructorFullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{instructorFullName}</p>
                <p className="text-xs text-muted-foreground">Instructor</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {instructor?.aboutMe || "Sin información adicional del profesor."}
            </p>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href={`https://wa.me/${instructor?.thelephone}`}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Contactar Profesor
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
