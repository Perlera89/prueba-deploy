import { Post } from "@/types";
import { useSession } from "@/hooks/use-session";
import { useDeleteData, useFetchData, useSaveData } from "@/hooks/use-generic";
import {
  closedPost,
  createPost,
  deletePost,
  getAllpostsByModuleId,
  updatePost,
  updateVisibilityPost,
} from "@/route/forum/post";

interface ResponsePost {
  forums: Post[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export function useFetchAllPostsByModuleId(
  courseId: string,
  page: number,
  limit: number
) {
  const { token } = useSession();
  return useFetchData<ResponsePost>(
    ["forums", courseId, String(page), String(limit)],
    async () => await getAllpostsByModuleId(courseId, token, page, limit),
    !!courseId
  );
}

export function useSavePost(moduleId: string) {
  const { token } = useSession();
  return useSaveData(
    async ({ post }: { post: Partial<Post> }) => {
      await createPost(post, token);
    },
    ["forums", moduleId],
    "Post guardado exitosamente",
    "Error al guardar el post, por favor intente nuevamente"
  );
}

export function useUpdatePost() {
  const { token } = useSession();

  return useSaveData(
    async ({ post }: { post: Partial<Post> }) => {
      if (post.id) {
        await updatePost(post, token);
      } else {
        throw new Error("Post ID is required for updating a post.");
      }
    },
    ["forums"],
    "Post actualizado",
    "Ocurrio un error al actualizar el post, por favor intente nuevamente"
  );
}

export function useDeletePost() {
  const { token } = useSession();

  return useDeleteData(
    async ({ postId }: { postId: string }) => await deletePost(postId, token),
    ["forums"],
    "Foro eliminado exitosamente",
    "Error al eliminar el foro"
  );
}

export function useUpdateVisibilityPost() {
  const { token } = useSession();

  return useSaveData(
    async ({ postId }: { postId: string }) => {
      await updateVisibilityPost(postId, token);
    },
    ["forums"],
    "Foro actualizado exitosamente",
    "Error al actualizar el foro"
  );
}

export function useClosedPost() {
  const { token } = useSession();

  return useSaveData(
    async ({ postId }: { postId: string }) => {
      await closedPost(postId, token);
    },
    ["forums"],
    "Foro cerrado para los alumnos",
    "Error al actualizar el foro"
  );
}
