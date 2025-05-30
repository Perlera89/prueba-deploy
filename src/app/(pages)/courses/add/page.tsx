"use client";

import { AddCourseForm } from "@/components/page/courses/course-form";
import { CourseFormData } from "@/schema/course";
import { useAuthStore } from "@/store/auth";
import { CourseStatus } from "@/types";
import { useEffect } from "react";
import { useBreadcrumbStore } from "@/store/breadcrumb";

export default function NewCoursePage() {
  const instructorId = useAuthStore((state) => state.user?.profileId);
  const { setItems } = useBreadcrumbStore();

  const defaultCourseData: CourseFormData = {
    id: "",
    title: "",
    courseCode: "",
    categoryId: "",
    price: "",
    picture: "",
    instructorId: instructorId,
    status: CourseStatus.OPEN_INSCRIPTION,
    isVisible: true,
  };

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Cursos", href: "/courses" },
      { label: "Editar curso", href: `/courses/add` },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [setItems]);

  return <AddCourseForm initialData={defaultCourseData} />;
}
