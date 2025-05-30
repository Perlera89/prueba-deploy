"use client";
import ContentForm from "@/components/page/content/form/content-form";
import { ContentFormData } from "@/schema/content";
import { useModuleStore } from "@/store/module";
import { useFindContent } from "@/hooks/use-content";
import { useParams } from "next/navigation";
import { ResourceFormSkeleton } from "@/components/page/content/form/resource-skeleton";
import { useEffect } from "react";
import { useBreadcrumbStore } from "@/store/breadcrumb";
import NotFoundPage from "@/app/not-found";
import { useRouter } from "next/navigation";
import { useContentStore } from "@/store/content";

export default function EditMaterialPage() {
  const params = useParams();
  const router = useRouter();

  const { setItems } = useBreadcrumbStore();
  const { contentType } = useContentStore();
  const isInstructor = useModuleStore((state) => state.module.isInstructor);

  const contentId = params.contentId as string;
  const {
    data: content = {
      id: "",
      sectionId: "",
      title: "",
      description: "",
      files: [],
      isVisible: false,
      assignment: {
        isGraded: false,
        dueDate: undefined,
        score: 0,
        allowLateSubmissions: false,
        rubric: [],
      },
    },
    isLoading,
    isFetched,
  } = useFindContent(contentId, contentType);

  const contentValues: ContentFormData = {
    id: content?.id,
    sectionId: content.sectionId,
    title: content?.title,
    description: content?.description,
    files: content.files,
    isVisible: content.isVisible,
    assignment: content.assignment,
  };

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Cursos", href: "/course" },
      { label: "Editar contenido", href: `/content` },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, [setItems]);

  if (!contentValues) {
    return <NotFoundPage />;
  }

  // if (!isInstructor) {
  //   router.refresh();
  // }

  if (isLoading && isFetched) {
    return <ResourceFormSkeleton />;
  }
  return (
    <ContentForm
      contentType={contentType}
      initialData={contentValues}
      isEditing
    />
  );
}
