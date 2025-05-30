"use client";
import { AddCourseForm } from "@/components/page/courses/course-form";
import { CourseFormData } from "@/schema/course";
import { useParams } from "next/navigation";
import { useFindCourseById } from "@/hooks/course/use-course";
import CourseFormSkeleton from "@/components/page/courses/form/add-course-skeleton";
import { CourseStatus } from "@/types";
import { useEffect } from "react";
import { useBreadcrumbStore } from "@/store/breadcrumb";

export default function EditCoursePage() {
  const { setItems } = useBreadcrumbStore();
  const params = useParams();
  const courseId = params.courseId as string;
  const { data: course, isLoading, isFetched } = useFindCourseById(courseId);

  const initialData: CourseFormData = {
    id: course?.id,
    title: course?.title ?? "",
    courseCode: course?.courseCode ?? "",
    status: course?.status ?? CourseStatus.COMING_SOON,
    isVisible: course?.isVisible ?? false,
    picture: course?.picture ?? "",
    categoryId: course?.categoryId?.toString() ?? "",
    price: course?.price ? course?.price.toString() : "",
    description: course?.description ?? "",
  };

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Cursos", href: "/courses" },
      { label: "Editar curso", href: `/courses/edit/${courseId}` },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [setItems]);

  if (isLoading || !isFetched) {
    return <CourseFormSkeleton />;
  }

  return <AddCourseForm initialData={initialData} isEditing={true} />;
}
