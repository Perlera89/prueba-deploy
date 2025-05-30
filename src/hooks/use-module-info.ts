import { findModuleInfo, updateModuleInfo } from "@/route/course-info";
import { ModuleInfo } from "@/types";
import { useFindData, useSaveData } from "./use-generic";
import { useSession } from "./use-session";
import { ModuleInfoFormData } from "@/schema/module";

const KEY_MODULE_INFO = "module-infos";

export function useFindCourseInfo(courseId: string) {
  const { token } = useSession();

  return useFindData<ModuleInfo>(
    [KEY_MODULE_INFO, courseId],
    async () => findModuleInfo(courseId, token),
    !!courseId
  );
}

export function useSaveCourseInfo(moduleId: string) {
  const { token } = useSession();
  return useSaveData(
    async ({ moduleInfo }: { moduleInfo: ModuleInfoFormData }) => {
      const moduleInfoData: Partial<ModuleInfo> = {
        description: moduleInfo.description,
        methodology: moduleInfo.methodology,
        objectives: moduleInfo.objectives,
        preRequisite: moduleInfo.preRequisite,
        weekDuration: Number(moduleInfo.weekDuration),
      };


      updateModuleInfo(moduleId, moduleInfoData, token);
    },
    ["module", moduleId],
    "Información del Curso guardado exitosamente",
    "Error al guardar la Información del Curso"
  );
}
