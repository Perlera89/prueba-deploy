"use client";

import NotFoundPage from "@/app/not-found";
import ContentContainer from "@/components/page/content/view/content";
import { MaterialSkeleton } from "@/components/page/content/view/content-skeleton";
import { useFindContent } from "@/hooks/use-content";
import { useParams } from "next/navigation";
import { useContentStore } from "@/store/content";

export default function MaterialPage() {
  const params = useParams();
  const contentId = params.content as string;
  const { contentType } = useContentStore();

  const {
    data: content = {
      id: "",
      sectionId: "",
      title: "",
      description: "",
      files: [],
      isVisible: false,
    },
    isLoading,
  } = useFindContent(contentId, contentType);


  if (!content) {
    return <NotFoundPage />;
  }

  if (isLoading) {
    return <MaterialSkeleton />;
  }

  return <ContentContainer content={content} />;
}
