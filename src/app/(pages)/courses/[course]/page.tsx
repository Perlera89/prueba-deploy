"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CourseHeader } from "@/components/page/courses/course-header";
import { ModulesContainer } from "@/components/page/module/modules-container";
import { CoursePageSkeleton } from "@/components/page/module/course-skeleton";
import { Course } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertDialogComponent from "@/components/display/alert-dialog";
import { useParams, useRouter } from "next/navigation";
import { useBreadcrumbStore } from "@/store/breadcrumb";
import { useFetchModulesByCourse } from "@/hooks/use-module";
import NotFoundPage from "@/app/not-found";
import { useCourseStore } from "@/store/course";
import { useAuthStore } from "@/store/auth";
import { useArchiveCourse } from "@/hooks/course/use-course";

export default function CoursePage() {
  const params = useParams();
  const courseId = params.course as string;
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.user?.role);
  const {
    data: moduleData,
    isLoading,
    refetch: refecthModulo,
  } = useFetchModulesByCourse(courseId);

  const archiveCourseMutation = useArchiveCourse();

  const modules = moduleData?.modules;
  const course = moduleData?.course;

  const [isEditable, setIsEditable] = useState(true);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);
  const { setItems } = useBreadcrumbStore();
  const { setSelectedCourse } = useCourseStore();
  const router = useRouter();

  const handleArchiveCourse = () => {
    archiveCourseMutation.mutateAsync({ courseId: course?.id as string });
  };

  useEffect(() => {
    if (course) {
      setItems([
        { label: "Inicio", href: "/home" },
        { label: "Cursos", href: "/courses" },
        { label: "Desarrollo Web Frontend", href: `/courses/code` },
      ]);
      setSelectedCourse(course);
    }

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [course, setItems, setSelectedCourse]);

  useEffect(() => {
    refecthModulo()
  }, [user]);

  if (isLoading) {
    return <CoursePageSkeleton />;
  }

  if (!course) {
    return <NotFoundPage />;
  }

  return (
    <div className="w-full px-6">
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Cursos
        </Button>
        {role === "manager" && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Acciones
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/courses/edit/${course.id}`}>
                <DropdownMenuItem>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Curso
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setIsOpenAlertDialog(true)}
              >
                <Trash className="h-4 w-4 mr-2" />
                Archivar Curso
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <CourseHeader course={course as Course} />
      <Card>
        <CardContent className="p-6">
          <ModulesContainer
            isEditable={isEditable}
            initialModules={modules}
            role={role}
            refecth={refecthModulo}
          />
        </CardContent>
        <CardFooter>
          {isOpenAlertDialog && (
            <AlertDialogComponent
              title="Archivar Curso"
              description="¿Estás seguro de que deseas archivar este curso? Esta acción no se puede deshacer."
              onConfirm={handleArchiveCourse}
              openAlertDialog={isOpenAlertDialog}
              setOpenAlertDialog={setIsOpenAlertDialog}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
