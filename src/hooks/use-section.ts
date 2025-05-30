import {
  getSections,
  findSection,
  addSection,
  updateSection,
  deleteSection,
  updateVisibilitySection,
} from "@/route/section";
import { Section } from "@/types";
import {
  useFetchData,
  useFindData,
  useSaveData,
  useDeleteData,
} from "./use-generic";
import { useSession } from "./use-session";
import { SectionFormData } from "@/schema/section";
import { useInfiniteQuery } from "@tanstack/react-query";

export function useFetchSections(
  moduleId: string,
  page: number = 1,
  limit: number = 10
) {
  const { token } = useSession();
  return useFetchData(
    ["sections", moduleId, String(page), String(limit)],
    async () => await getSections(moduleId, token, page, limit),
    !!moduleId,
  );
}

export function useFindSection(code: string) {
  const { token } = useSession();
  return useFindData(
    ["section", code],
    async () => findSection(code, token),
    !!code
  );
}

export function useSaveSection(moduleId: string, page: number, limit: number) {
  const { token } = useSession();
  return useSaveData(
    async ({
      section,
    }: {
      section: SectionFormData;
    }) => {
      const sectionData: Partial<Section> = {
        sectionNumber: Number(section.sectionNumber),
        title: section.title,
        dateRange: {
          startDate: new Date(section.dateRange.startDate),
          endDate: new Date(section.dateRange.endDate),
        },
        isVisible: section.isVisible,
      };

      if (section.id) {
        await updateSection(section.id, sectionData, token);
      } else {
        await addSection(moduleId, sectionData, token);
      }
    },
    ["sections", moduleId, String(page), String(limit)],
    "Sección guardada exitosamente",
    "Error al guardar la sección"
  );
}

export function useUpdateVisibilitySection(moduleId: string, page: number, limit: number) {
  const { token } = useSession();
  return useSaveData(
    async ({ sectionId }: { sectionId: string }) => {
      await updateVisibilitySection(sectionId, token);
    },
    ["sections", moduleId, String(page), String(limit)],
    "Se cambió la Visibilidad",
    "Error al cambiar la Visibilidad"
  );
}

export function useDeleteSection(moduleId: string, page: number, limit: number) {
  const { token } = useSession();

  return useDeleteData(
    async ({ sectionId }: { sectionId: string }) =>
      await deleteSection(sectionId, token),
    ["sections", moduleId, String(page), String(limit)],
    "Sección eliminada exitosamente",
    "Error al eliminar la Sección"
  );
}

//futura implementacion de paginación infinita -- los datos falta correjirlos en cahce de query 

export function useFetchSectionsScroll(materialId: string, page: number, limit: number = 10) {
  const { token } = useSession();

  return useInfiniteQuery({
    queryKey: ["sections", limit],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const data = await getSections(materialId, token, pageParam, limit);
      return data;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.sections.length < limit) {
        return undefined;
      }
      return lastPage.meta.page + 1;
    },
    enabled: !!materialId && !!token,

  });
}
