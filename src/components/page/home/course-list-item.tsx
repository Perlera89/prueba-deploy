"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, CheckCircle, Clock, LockOpen } from "lucide-react";
import Link from "next/link";
import { Course } from "./home-container";
//import { formatPrice } from "@/utils/format-price";
import { CourseDialog } from "./course-dialog";
import { PaymentButtonWithLoading } from "./payment-button-with-loading";

// Se eliminó el mapa de colores por categoría ya que no es necesario

interface CourseListItemProps {
  course: Course;
  onEnroll: (courseId: string | number) => void;
  processingCourseId?: string | number | null;
  userRole?: string;
}

export function CourseListItem({
  course,
  onEnroll,
  processingCourseId,
}: CourseListItemProps) {
  return (
    <Card className="overflow-hidden p-0 hover:bg-muted hover:transition-colors">
      <div className="flex">
        <div className="w-auto py-4 px-3 flex items-center">
          <Badge variant="outline" className="font-medium">
            {course.modulesCount || 0} módulos
          </Badge>
        </div>
        <div className="flex-1 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex-1">
              <h3 className="font-semibold">{course.title}</h3>{" "}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1.5">
                  {(() => {
                    switch (course.status) {
                      case "completed":
                        return <CheckCircle className="h-3.5 w-3.5" />;
                      case "in_progress":
                        return <Clock className="h-3.5 w-3.5" />;
                      case "open_inscription":
                        return <LockOpen className="h-3.5 w-3.5" />;
                      case "coming_soon":
                        return <Clock className="h-3.5 w-3.5" />;
                      default:
                        return <LockOpen className="h-3.5 w-3.5" />;
                    }
                  })()}
                  <span>
                    {(() => {
                      switch (course.status) {
                        case "completed":
                          return "Curso completado";
                        case "in_progress":
                          return "En progreso";
                        case "open_inscription":
                          return "Inscripción abierta";
                        case "coming_soon":
                          return "Próximamente";
                        default:
                          return "Inscripción abierta";
                      }
                    })()}
                  </span>
                </div>
                <span>•</span>
                <Badge variant="secondary" className="text-xs font-normal">
                  {course.category?.name || "Sin categoría"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {course.description}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex w-full items-center gap-2">
                {course.enrolled ? (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/courses/${course.courseCode || course.id}`}>
                      Ir al curso
                    </Link>
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    {course.status !== "coming_soon" && (
                      <PaymentButtonWithLoading
                        price={course.price}
                        onClick={() => Promise.resolve(onEnroll(course.id))}
                        size="sm"
                        className="whitespace-nowrap"
                      />
                    )}
                    <CourseDialog course={course} onEnroll={onEnroll}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center gap-1 px-2.5 whitespace-nowrap"
                        disabled={processingCourseId === course.id}
                      >
                        <Eye className="h-4 w-4 flex-shrink-0" />
                        <span>Ver</span>
                      </Button>
                    </CourseDialog>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
