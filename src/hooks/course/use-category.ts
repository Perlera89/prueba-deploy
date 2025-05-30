import {
  getCategories,
  findCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/route/course/course-category";
import { CourseCategory } from "@/types";
import {
  useFetchData,
  useFindData,
  useSaveData,
  useDeleteData,
} from "@/hooks/use-generic";
import { useSession } from "@/hooks/use-session";

const KEY_CATEGORIES = "categories";

export function useFetchCategories() {
  const { token } = useSession();
  return useFetchData<CourseCategory[]>(
    [KEY_CATEGORIES],
    async () => await getCategories(token).then((res) => res.data.categories).catch(() => []),
  );
}

export function useFindCategory(id: string) {
  return useFindData([KEY_CATEGORIES, id], async () => findCategory(id), !!id);
}

export function useSaveCategory() {
  const { token } = useSession();

  return useSaveData(
    async ({ category }: { category: Partial<CourseCategory> }) => {
      const categoryData = {
        name: category.name,
        description: category.description,
      };

      if (category.id) {
        const updatedCategory = {
          id: category.id,
          ...categoryData,
        };

        await updateCategory(updatedCategory, token);
      } else {
        await addCategory(categoryData, token);
      }
    },
    [KEY_CATEGORIES],
    "Categoría guardada exitosamente",
    "Error al guardar la Categoría"
  );
}

export function useDeleteCategory() {
  const { token } = useSession();

  return useDeleteData(
    async ({ id }: { id: string }) => await deleteCategory(Number(id), token),
    [KEY_CATEGORIES],
    "Categoría eliminada exitosamente",
    "Error al eliminar la Categoría"
  );
}
