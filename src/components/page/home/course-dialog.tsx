import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "./home-container";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/format-price";
import { CheckCircle, Clock, LockOpen, LoaderCircle } from "lucide-react";

interface CourseDialogProps {
  course: Course;
  children: React.ReactNode;
  onEnroll: (courseId: string | number) => void;
}

/*const categoryColors = {
  Programación: "#3b82f6",
  Diseño: "#ec4899",
  Marketing: "#f59e0b",
  Finanzas: "#10b981",
  "Ciencia de Datos": "#6366f1",
  default: "#64748b",
};*/

export function CourseDialog({
  course,
  children,
  onEnroll,
}: CourseDialogProps) {
  const [imageError, setImageError] = useState(false);

  /* const categoryColor =
     categoryColors[course.category?.name as keyof typeof categoryColors] ||
     categoryColors.default;*/

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only" />
        <DialogDescription className="sr-only" />
        <div className="relative w-full h-[250px] overflow-hidden">
          {course.picture && !imageError ? (
            <Image
              src={course.picture.url}
              alt={course.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 700px"
              className="object-cover w-full h-full"
              priority
              quality={85}
              onError={() => setImageError(true)}
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(to right, #2563eb, #3b82f6)",
              }}
            />
          )}
          <div className="absolute bottom-2 right-2">
            <Badge
              variant="secondary"
              className="bg-black/70 text-white border-none"
            >
              {course.modulesCount || 0} módulos
            </Badge>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h2 className="text-white text-2xl font-bold">{course.title}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge
                variant="outline"
                className="bg-white/90 text-black border-none"
              >
                {course.category?.name || "Sin categoría"}
              </Badge>
              {course.enrolled && (
                <Badge className="bg-green-500 text-white border-none">
                  Inscrito
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              {(() => {
                switch (course.status) {
                  case "completed":
                    return (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Curso completado
                        </span>
                      </>
                    );
                  case "in_progress":
                    return (
                      <>
                        <LoaderCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">En progreso</span>
                      </>
                    );
                  case "open_inscription":
                    return (
                      <>
                        <LockOpen className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Inscripción abierta
                        </span>
                      </>
                    );
                  case "coming_soon":
                    return (
                      <>
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Próximamente
                        </span>
                      </>
                    );
                  default:
                    return (
                      <>
                        <LockOpen className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Inscripción abierta
                        </span>
                      </>
                    );
                }
              })()}
            </div>
            <p className="text-muted-foreground">{course.description}</p>
          </div>
          {/* Módulos del curso */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Módulos del Curso</h3>
            {course.courseModules && course.courseModules.length > 0 ? (
              <div className="space-y-3">
                {course.courseModules.map((module, index) => (
                  <div
                    key={module.id}
                    className="border rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium">
                        {index + 1}. {module.title}
                      </p>
                      {module.instructor && (
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 rounded-full overflow-hidden relative flex-shrink-0 ring-1 ring-muted">
                            <Image
                              src="/avatar-fallback.png"
                              alt={`${module.instructor.names} ${module.instructor.surnames}`}
                              fill
                              sizes="28px"
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/avatar-fallback.png";
                              }}
                            />
                          </div>
                          <div>
                            <p className="text-xs font-medium">
                              {module.instructor.title}&nbsp;
                              {module.instructor.names}&nbsp;
                              {module.instructor.surnames}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Instructor
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    {module.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {module.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-muted/30 text-center">
                <p className="text-muted-foreground text-sm">
                  No hay módulos disponibles para este curso
                </p>
              </div>
            )}
          </div>
          {/* Lista de Módulos */}
          <div className="mt-8 pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-sm text-muted-foreground mb-1">
                  Precio del curso
                </p>
                <p className="text-2xl font-bold">
                  {course.price === "0.00" ||
                    course.price === "0" ||
                    parseFloat(course.price || "0") === 0
                    ? "Gratis"
                    : `$${formatPrice(course.price)}`}
                </p>
              </div>
              {course.enrolled ? (
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href={`/courses/${course.courseCode || course.id}`}>
                    Ir al curso
                  </Link>
                </Button>
              ) : course.status !== "coming_soon" ? (
                <Button
                  onClick={() => Promise.resolve(onEnroll(course.id))}
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Inscribirse
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
