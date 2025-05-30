import { useSession } from "../use-session";
import {
  deleteCategoryPost,
  getCategoriesPost,
} from "@/route/forum/category-post";
import { useDeleteData, useFetchData } from "../use-generic";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useModuleStore } from "@/store/module";
import { PostCategory } from "@/types";

export function useFetchCategoryPosts(moduleId: string) {
  const { token } = useSession();
  return useFetchData<PostCategory[]>(
    ["categories", moduleId],
    async () => await getCategoriesPost(moduleId, token)
  );
}

export function useDeleteCategoryPost(moduleId: string) {
  const { token } = useSession();
  return useDeleteData(
    async ({ categoryId }: { categoryId: string }) =>
      await deleteCategoryPost(categoryId, token),
    ["categories", moduleId],
    "Categoria eliminada exitosamente",
    "Error al eliminar la categoria"
  );
}

export function useSaveCategoryPost(
  categoryFn: (category: Partial<PostCategory>) => Promise<void>
) {
  const queryClient = new QueryClient();
  const moduleId = useModuleStore((state) => state.module.id);
  return useMutation({
    mutationFn: categoryFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", moduleId] });
      toast.success("Categoria guardada exitosamente");
    },
    onError: () => {
      toast.error("Error al guardar la categoria");
    },
  });
}
