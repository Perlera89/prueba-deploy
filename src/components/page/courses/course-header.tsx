"use client";

import { Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Archive, CircleCheck, Eye, EyeOff, Tag } from "lucide-react";
import Image from "next/image";

interface CourseHeaderProps {
  course: Course;
  onEditCourse?: (courseId: string) => void;
  onArchiveCourse?: (courseId: string) => void;
  onDeleteCourse?: (courseId: string) => void;
  onEditImage?: (courseId: string) => void;
}

export function CourseHeader({ course }: CourseHeaderProps) {
  return (
    <Card className="mb-6 py-0 relative">
      <CardContent className="p-0 rounded-t-xl">
        <div className="w-full h-32 relative rounded-t-xl overflow-hidden">
          {(() => {
            try {
              const picture = course?.picture;
              const imageUrl = picture?.url;

              if (!imageUrl) {
                return (
                  <Image
                    src="/placeholder.svg"
                    alt={`Imagen del curso ${course.title}`}
                    fill
                    className="object-cover"
                  />
                );
              }

              return (
                <Image
                  src={imageUrl}
                  alt={`Imagen del curso ${course.title}`}
                  fill
                  className="object-cover"
                />
              );
            } catch (error) {
              return (
                <Image
                  src="/placeholder.svg"
                  alt={`Imagen del curso ${course.title}`}
                  fill
                  className="object-cover"
                />
              );
            }
          })()}
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <Badge variant="outline" className="ml-2">
                  {course.courseCode}
                </Badge>
              </div>

              <div className="text-muted-foreground text-sm">
                {course.courseCategory && (
                  <p className="mb-1 flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{course.courseCategory.name}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant={course.isVisible ? "secondary" : "destructive"}>
                {course.isVisible ? (
                  <>
                    <Eye className="h-4 w-4" />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="h-4 w-4" />
                    Oculto
                  </>
                )}
              </Badge>
              <Badge variant={!course.isArchived ? "secondary" : "destructive"}>
                {course.isArchived ? (
                  <>
                    <Archive className="h-4 w-4" />
                    Archivado
                  </>
                ) : (
                  <>
                    <CircleCheck className="h-4 w-4" />
                    Activo
                  </>
                )}
              </Badge>
            </div>
          </div>

          <div className="mt-4 min-h-[60px]">
            {course?.description && (
              <p className="text-muted-foreground line-clamp-3">
                {course.description}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
