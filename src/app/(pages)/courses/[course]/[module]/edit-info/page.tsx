"use client";
import { ModuleInfoForm } from "@/components/page/module/module-info-form";
import { ModuleInfoFormData } from "@/schema/course";
import { useBreadcrumbStore } from "@/store/breadcrumb";
import { useEffect } from "react";
import { useModuleStore } from "@/store/module";

export default function EditCoursePage() {
  const moduleInfo = useModuleStore((state) => state.module.moduleInfo);
  const description = useModuleStore((state) => state.module.description);
  const { setItems } = useBreadcrumbStore();

  const initialData: ModuleInfoFormData = {
    description: description || "",
    preRequisite: moduleInfo?.preRequisite || "",
    methodology: moduleInfo?.methodology || "",
    objectives: moduleInfo?.objectives,
  };

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Cursos", href: "/courses" },
      { label: "Editar información", href: `/courses/edit` },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [setItems]);

  return <ModuleInfoForm initialData={initialData} />;
}
