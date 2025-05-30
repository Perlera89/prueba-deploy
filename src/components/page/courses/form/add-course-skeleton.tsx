import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function CourseFormSkeleton() {
  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="icon" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <span className="text-sm font-medium">Volver a mis Cursos</span>
      </div>

      <div className="space-y-8 bg-card rounded-lg p-6 relative">
        <div>
          <h1 className="text-xl font-semibold">Editar Curso</h1>
          <p className="text-sm text-muted-foreground">
            Modifica la información del curso existente.
          </p>
        </div>

        <div className="space-y-4">
          <div className="border border-dashed border-border rounded-lg p-8 flex flex-col items-center justify-center">
            <div className="mb-4 text-muted-foreground">
              <svg
                className="h-12 w-12 mx-auto opacity-50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <p className="text-center text-sm mb-2">
              Arrastra una imagen aquí o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground text-center mb-4">
              PNG, JPG, GIF (Máx. 5MB)
            </p>
            <Button variant="outline" size="sm" disabled>
              Seleccionar imagen
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Título del Curso <span className="text-destructive">*</span>
              </label>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium">
                Código del Curso <span className="text-destructive">*</span>
              </label>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium">
                Precio <span className="text-destructive">*</span>
              </label>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">
                Estado del curso <span className="text-destructive">*</span>
              </label>
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="category" className="block text-sm font-medium">
            Categoría
          </label>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        <div className="h-px w-full bg-border" />

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">
            Descripción
          </label>
          <Skeleton className="h-32 w-full rounded-md" />
          <div className="text-right text-xs text-muted-foreground">0/500</div>
        </div>

        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <span className="text-sm">Visible para estudiantes</span>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar Curso</Button>
        </div>
      </div>
    </div>
  );
}
