"use client";

import { useSectionStore } from "@/store/section";
import { useModuleStore } from "@/store/module";
import { useBreadcrumbStore } from "@/store/breadcrumb";
import { useEffect } from "react";
import { ContentType } from "@/types";
import ContentForm from "@/components/page/content/form/content-form";
import { ContentFormData } from "@/schema/content";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function AddMaterialPage() {
  const params = useParams();
  const router = useRouter();
  const contentType = params.contentType as ContentType;

  const role = useAuthStore((state) => state.user?.role);
  const { selectedSectionId } = useSectionStore();
  const isInstructor = useModuleStore((state) => state.module.isInstructor);
  const { setItems } = useBreadcrumbStore();

  const materialDefaultValues: ContentFormData = {
    sectionId: selectedSectionId,
    title: "",
    isVisible: true,
  };

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Cursos", href: `/courses` },
      { label: "Agregar contenido", href: `/content` },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [setItems]);

  useEffect(() => {
    if (!isInstructor || role !== "manager") {
      router.refresh();
    }
  }, [isInstructor, role, router]);

  return (
    <ContentForm
      contentType={contentType}
      initialData={materialDefaultValues}
    />
  );
}
