import {
  findContent,
  addContent,
  updateContent,
  deleteContent,
  updateVisibilityContent,
} from "@/route/content";
import { useFindData, useSaveData, useDeleteData } from "./use-generic";
import { useSession } from "./use-session";
import { ContentFormData } from "@/schema/content";
import { Content } from "@/types";

export function useFindContent(contentId: string, contentType: string) {
  const { token } = useSession();
  return useFindData<Content>(
    ["contentId", contentId],
    async () => await findContent(contentId, contentType, token),
    !!contentId
  );
}

export function useSaveContent() {
  const { token } = useSession();
  return useSaveData(
    async ({ content }: { content: ContentFormData }) => {
      const contentData: Partial<Content> = {
        title: content.title,
        description: content.description,
        sectionId: content.sectionId,
        isVisible: content.isVisible,
        files: content.files,
        assignment: content.assignment,
      };
      if (content.id) {
        await updateContent(content.id, contentData, token);
      } else {
        await addContent(contentData, token);
      }
    },
    ["sections"],
    "Contenido guardado exitosamente",
    "Error al guardar el Contenido"
  );
}

export function useUpdateVisibilityContent() {
  const { token } = useSession();
  return useSaveData(
    async ({
      contentId,
      contentType,
    }: {
      contentId: string;
      contentType: string;
    }) => {
      await updateVisibilityContent(contentId, contentType, token);
    },
    ["sections"],
    "Se cambió la Visibilidad",
    "Error al cambiar la Visibilidad"
  );
}

export function useDeleteContent() {
  const { token } = useSession();

  return useDeleteData(
    async ({
      contentId,
      contentType,
    }: {
      contentId: string;
      contentType: string;
    }) => await deleteContent(contentId, contentType, token),
    ["sections"],
    "Contenido eliminado exitosamente",
    "Error al eliminar el Contenido"
  );
}
