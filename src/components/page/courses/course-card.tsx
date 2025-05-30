"use client";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Archive, ArchiveRestore, Edit, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useArchiveCourse } from "@/hooks/course/use-course";
import AlertDialogComponent from "../../display/alert-dialog";
import { useState } from "react";
import Image from "next/image";
import { truncateText } from "@/utils/truncate-text";
import { useAuthStore } from "@/store/auth";
import { InstructorProfile } from "@/types";

interface CourseCardProps {
  course: any;
  isArchived?: boolean;
}

export function CourseCard({ course, isArchived = false }: CourseCardProps) {
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const router = useRouter();
  const role = useAuthStore((state) => state.user?.role);


  const handleEdit = (courseId: string) => {
    router.push(`/courses/edit/${courseId}`);
  };

  const archiveCourseMutation = useArchiveCourse();

  const handleArchive = (courseId: string) => {
    archiveCourseMutation.mutateAsync({ courseId: courseId });
  };
  const handleCardClick = () => {
    if (!isArchived && !openAlertDialog && !isOpenMenu) {
      router.push(`/courses/${course.id}`);
    }
  };

  return (
    <Card
      className="overflow-hidden py-0 hover:bg-muted hover:transition-colors cursor-pointer flex flex-col !gap-0 group"
      onClick={handleCardClick}
    >
      <div className="h-32 relative bg-blue-500">
        <div className="absolute inset-0">
          <Image
            src={course.picture ? course.picture.url : "/placeholder.svg"}
            alt={course.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <p className="absolute top-2 left-2 bg-background/90 text-xs px-2 py-1 rounded font-medium">
          {truncateText(course.courseCategory.name, 30)}
        </p>
        <div className="absolute bottom-2 right-2 bg-background/90 text-xs px-2 py-1 rounded font-medium">
          {course.moduleCount || 0} módulos
        </div>
        {course.status === "completed" && (
          <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
            Completado
          </div>
        )}
        {role === "manager" && (
          <div className="absolute top-2 right-2">
            <DropdownMenu open={isOpenMenu} onOpenChange={setIsOpenMenu}>
              <DropdownMenuTrigger onClick={(e) => e.stopPropagation()} asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(course.id);
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Curso
                </DropdownMenuItem>
                <DropdownMenuSeparator />{" "}
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenAlertDialog(true);
                    setIsOpenMenu(false);
                  }}
                  variant="destructive"
                >
                  {isArchived ? (
                    <>
                      <ArchiveRestore className="h-4 w-4 mr-2" />
                      Desarchivar Curso
                    </>
                  ) : (
                    <>
                      <Archive className="h-4 w-4 mr-2" />
                      Archivar Curso
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <CardHeader className="py-8 cursor-pointer">
        <CardTitle className="text-base group-hover:underline-offset-4 hover:underline">
          {truncateText(course.title, 25)}
        </CardTitle>
        <CardDescription className="text-xs">
          {course.instructorProfiles.length > 0 ? (
            <>
              {course.instructorProfiles
                .slice(0, 2)
                .map((instructor: InstructorProfile, index: number) => (
                  <div key={`${instructor.id}-${index}`}>
                    {instructor.title}&nbsp;
                    {instructor.names}&nbsp;
                    {instructor.surnames}
                  </div>
                ))}
              {course.instructorProfiles.length > 2 && (
                <div className="text-xs font-medium text-muted-foreground mt-1">
                  +{course.instructorProfiles.length - 2} instructores más
                </div>
              )}
            </>
          ) : (
            <p>No hay instructores</p>
          )}
        </CardDescription>
      </CardHeader>{" "}
      <CardFooter className="pt-0" onClick={(e) => e.stopPropagation()}>
        {openAlertDialog && (
          <AlertDialogComponent
            title="Archivar Curso"
            description="¿Estás seguro de que deseas archivar este curso? Esta acción no se puede deshacer."
            onConfirm={() => handleArchive(course.id)}
            openAlertDialog={openAlertDialog}
            setOpenAlertDialog={setOpenAlertDialog}
          />
        )}
      </CardFooter>
    </Card>
  );
}
