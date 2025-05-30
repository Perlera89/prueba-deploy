import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, RefreshCw } from "lucide-react";

export default function CursoSkeleton() {
  return (
    <div className="min-h-screen text-white px-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="text-white">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      <div className="rounded-lg bg-zinc-900 p-6 w-full mx-auto">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-semibold mb-1">
              Agregar Información al Curso
            </h1>
            <p className="text-zinc-400 text-sm">
              Agrega información relevante para el curso.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Descartar Cambios</span>
            <span className="sm:hidden">Descartar</span>
          </Button>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Detalles Académicos</h2>

          <div className="mb-6">
            <label className="block text-sm mb-2">Créditos</label>
            <Skeleton className="h-10 w-full bg-zinc-800 rounded-md" />
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Objetivos</h2>

          <div className="mb-4">
            <label className="block text-sm mb-2">Objetivo General</label>
            <Skeleton className="h-32 w-full bg-zinc-800 rounded-md" />
          </div>

          <div className="mb-6">
            <label className="block text-sm mb-2">Objetivos Específicos</label>
            <Button className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Agregar objetivo específico
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Metodología</label>
          <Skeleton className="h-32 w-full bg-zinc-800 rounded-md" />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Descripción</label>
          <Skeleton className="h-32 w-full bg-zinc-800 rounded-md" />
        </div>

        <div className="mb-8">
          <label className="block text-sm mb-2">Prerequisitos</label>
          <Skeleton className="h-10 w-full bg-zinc-800 rounded-md" />
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            className="text-white border-zinc-700 bg-zinc-800 hover:bg-zinc-700"
          >
            Cancelar
          </Button>
          <Button className="bg-white text-black hover:bg-zinc-200">
            Crear Curso
          </Button>
        </div>
      </div>
    </div>
  );
}
