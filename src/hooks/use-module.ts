import {
  getModulesByCourse,
  addModule,
  findModuleById,
  updateModule,
  updateVisibilityModule,
  updateMeetingLink,
  deleteModule,
} from "@/route/module";
import { Module, Course, Picture } from "@/types";
import {
  useFetchData,
  useFindData,
  useSaveData,
  useDeleteData,
} from "./use-generic";
import { useSession } from "./use-session";
import { ModuleFormValues } from "@/schema/module";

export function useFetchModulesByCourse(courseId: string) {
  const { token } = useSession();
  return useFetchData<{ course: Course; modules: Module[] }>(
    ["modules", courseId],
    async () => await getModulesByCourse(courseId, token),
    !!courseId
  );
}

export function useFindModule(moduleId: string) {
  const { token } = useSession();
  return useFindData(
    ["module", moduleId],
    async () => findModuleById(moduleId, token),
    !!moduleId
  );
}

export function useSaveModule(courseId: string) {
  const { token } = useSession();
  return useSaveData(
    async ({ module }: { module: ModuleFormValues }) => {
      const moduleData: Partial<Module> = {
        title: module.title,
        courseId: module.courseId,
        description: module.description,
        instructorId: module.instructorId,
        isVisible: module.isVisible,
        picture:
          typeof module.picture === "object" &&
            module.picture !== null &&
            "url" in module.picture
            ? (module.picture as Picture)
            : undefined,
      };
      await addModule(moduleData, token);
    },
    ["modules", courseId],
    "Módulo guardado exitosamente",
    "Error al guardar el módulo"
  );
}

export function useUpdateModule(moduleId: string) {
  const { token } = useSession();
  return useSaveData(
    async ({ module }: { module: ModuleFormValues }) => {
      const moduleData: Partial<Module> = {
        title: module.title,
        description: module.description,
        isVisible: module.isVisible,
        picture: module.picture,
      };
      await updateModule(module.id as string, moduleData, token);
    },
    ["modules", moduleId],
    "Módulo actualizado exitosamente",
    "Error al actualizar el módulo"
  );
}

export function useUpdateMeetingLink(materialId: string) {
  const { token } = useSession();
  return useSaveData(
    async ({ meetingLink }: { meetingLink: string }) =>
      await updateMeetingLink(materialId, meetingLink, token),
    ["module", materialId],
    "Enlace de reunión agregado exitosamente",
    "Error al agregar el enlace de reunión"
  );
}

export function useUpdateVisibilityModule(courseId: string) {
  const { token } = useSession();
  return useSaveData(
    async ({ moduleId }: { moduleId: string }) => {
      await updateVisibilityModule(moduleId, token);
    },
    ["modules", courseId],
    "Se cambió la Visibilidad",
    "Error al cambiar la Visibilidad"
  );
}

export function useDeleteModule(courseId: string) {
  const { token } = useSession();

  return useDeleteData(
    async ({ moduleId }: { moduleId: string }) =>
      await deleteModule(moduleId, token),
    ["modules", courseId],
    "Sección eliminada exitosamente",
    "Error al eliminar la Sección"
  );
}
