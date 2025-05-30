import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Book } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function MaterialSkeleton() {
  return (
    <main className="w-full px-10 space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver al Módulo
        </Button>
        <div className="flex items-center gap-3">
          <Button disabled className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Editar Material
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border overflow-hidden">
        <div className="bg-muted p-6 flex justify-between items-center">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Book className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-8 w-72" />
              <div className="flex items-center text-muted-foreground text-sm gap-4">
                <Skeleton className="h-4 w-40" />
              </div>
            </div>
          </div>
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="p-6">
          <h2 className="text-lg font-medium mb-2">Descripción</h2>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Separator className="my-6" />

          {/* Skeleton para MaterialView */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="h-[180px] w-full" />
                ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl shadow-sm border p-6">
        {/* Skeleton para CommentSection */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-6 w-48" />
          </div>

          <Separator />

          <div className="space-y-6">
            {Array(1)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="flex gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
          </div>

          <div className="pt-4 border-t mt-6">
            <div className="flex items-start gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-[80px] w-full" />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Skeleton className="h-9 w-36" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
