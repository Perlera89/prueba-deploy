"use client";
import { useParams } from "next/navigation";
import { useFindModule } from "@/hooks/use-module";
import CourseSkeleton from "@/components/page/courses/skeleton/course-skeleton";
import { useBreadcrumbStore } from "@/store/breadcrumb";
import { useEffect } from "react";
import ModuleContainer from "@/components/page/module/module-container";
import { useModuleStore } from "@/store/module";
import { useCourseStore } from "@/store/course";
import { truncateText } from "@/utils/truncate-text";
import NotFoundPage from "@/app/not-found";

export default function CoursePage() {
  const params = useParams();
  const { setItems } = useBreadcrumbStore();
  const { course } = useCourseStore();
  const { setModule, refetchModule } = useModuleStore();

  const moduleId = params.module as string;

  const { data: module, isLoading, isFetched, refetch } = useFindModule(moduleId);

  useEffect(() => {
    refetch()
  }, [refetchModule])

  useEffect(() => {
    if (module) {
      setItems([
        { label: "Inicio", href: "/home" },
        { label: "Cursos", href: "/courses" },
        {
          label: truncateText(course.title, 25),
          href: `/courses/${course.id}`,
        },
        { label: truncateText(module.title, 25), href: `modulo` },
      ]);
      setModule(module);
    }

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [setItems, setModule, module]);

  if (!module && !isLoading) {
    return <NotFoundPage />;
  }

  if (isLoading || !isFetched) {
    return <CourseSkeleton />;
  }

  return (
    <>
      <ModuleContainer />
    </>
  );
}
