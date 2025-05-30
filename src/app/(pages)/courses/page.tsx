"use client";
import CoursesContainer from "@/components/page/courses/courses-container";
import { useBreadcrumbStore } from "@/store/breadcrumb";
import { useEffect } from "react";

export default function CoursesPage() {
  const { setItems } = useBreadcrumbStore();

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Cursos", href: "/courses" },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [setItems]);
  return <CoursesContainer />;
}
