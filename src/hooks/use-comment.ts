import { addComment, deleteComment, getComments } from "@/route/coment";
import { useDeleteData, useFetchData, useSaveData } from "./use-generic";
import { useSession } from "./use-session";
import { Comment } from "@/types";

export function useComment(contentId: string, contentType: string) {
  const { token } = useSession();
  return useFetchData<Comment[]>(
    ["comments", contentId],
    async () => await getComments(contentId, contentType, token),
    !!contentId
  );
}

export function useAddComment(contentId: string) {
  const { token } = useSession();
  return useSaveData(
    async ({ contentType, content }: { contentType: string; content: string }) => {
      await addComment(contentType, contentId, content, token);
    },
    ["comments", contentId],
    "Comentario guardado exitosamente",
    "Error al guardar el comentario"
  );
}

export function useDeleteComment(materialType: string) {
  const { token } = useSession();
  return useDeleteData(
    async ({ commentId }: { commentId: string }) => {
      await deleteComment(materialType, commentId, token);
    },
    ["comments", materialType],
    "Comentario eliminado exitosamente",
    "Error al eliminar el comentario"
  );
}
