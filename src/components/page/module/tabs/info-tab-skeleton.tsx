import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export function InfoTabSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Información del Curso</CardTitle>
              <Button variant="outline" size="sm" disabled>
                <Plus className="h-4 w-4 mr-2" />
                Agregar Información
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Descripción</h3>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-[95%] mb-1" />
              <Skeleton className="h-4 w-[90%]" />
            </div>

            <div>
              <h3 className="font-medium mb-2">Objetivos de Aprendizaje</h3>
              <h4 className="text-sm font-medium mb-1">Objetivo General</h4>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-[92%] mb-3" />

              <h4 className="text-sm font-medium mb-1">
                Objetivos Específicos
              </h4>
              <div className="space-y-1 pl-5">
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted mr-2" />
                  <Skeleton className="h-4 w-[85%]" />
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted mr-2" />
                  <Skeleton className="h-4 w-[80%]" />
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted mr-2" />
                  <Skeleton className="h-4 w-[88%]" />
                </div>
                <div className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted mr-2" />
                  <Skeleton className="h-4 w-[75%]" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Metodología</h3>
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-[94%] mb-1" />
              <Skeleton className="h-4 w-[89%]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Detalles del Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Código del Curso</p>
                  <Skeleton className="h-4 w-24 mt-1" />
                </div>
                <div>
                  <p className="text-muted-foreground">Periodo Académico</p>
                  <Skeleton className="h-4 w-28 mt-1" />
                </div>
                <div>
                  <p className="text-muted-foreground">Horario</p>
                  <Skeleton className="h-4 w-48 mt-1" />
                </div>
                <div>
                  <p className="text-muted-foreground">Aula</p>
                  <Skeleton className="h-4 w-32 mt-1" />
                </div>
                <div>
                  <p className="text-muted-foreground">Créditos</p>
                  <Skeleton className="h-4 w-16 mt-1" />
                </div>
                <div>
                  <p className="text-muted-foreground">Requisitos Previos</p>
                  <Skeleton className="h-4 w-36 mt-1" />
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
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-[95%] mb-1" />
            <Skeleton className="h-4 w-[90%] mb-3" />
            <Skeleton className="h-8 w-full rounded-md" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
