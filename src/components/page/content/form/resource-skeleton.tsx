import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function ResourceFormSkeleton() {
  return (
    <div className="w-full px-2 sm:px-8">
      <div className="flex items-center mb-3 sm:mb-4">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al Módulo
        </Button>
      </div>
      <Card className="w-full">
        <CardHeader className="px-4 sm:px-6">
          <Skeleton className="h-7 w-64 mb-2" />
          <Skeleton className="h-5 w-full max-w-md" />
        </CardHeader>
        <CardContent className="space-y-6 px-4 sm:px-6">
          {/* Título */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-32 w-full" />
          </div>

          {/* Configuración de evaluación (para assignments) */}
          <div className="border rounded-lg p-6 mt-8">
            <Skeleton className="h-6 w-48 mb-4" />
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-4 pl-6 border-l-2 border-gray-200">
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-9 w-32" />
                </div>
                <Skeleton className="h-48 w-full" />
              </div>
            </div>
          </div>

          {/* Recursos */}
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-24" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-28" />
                <Skeleton className="h-9 w-36" />
              </div>
            </div>
            <div className="border border-dotted rounded-lg py-20 flex flex-col items-center justify-center">
              <Skeleton className="h-12 w-12 rounded-full mb-3" />
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>

          {/* Visible para estudiantes */}
          <div className="flex items-center space-x-3 mt-8">
            <Skeleton className="h-5 w-5 rounded-sm" />
            <Skeleton className="h-5 w-40" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between px-4 sm:px-6 py-4">
          <Skeleton className="h-10 w-full sm:w-32" />
          <Skeleton className="h-10 w-full sm:w-48" />
        </CardFooter>
      </Card>
    </div>
  );
}
