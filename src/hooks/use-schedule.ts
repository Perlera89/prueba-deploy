import { findSchedule, updateCourseSchedules } from "@/route/schedule";
import { useFetchData, useSaveData } from "./use-generic";
import { useSession } from "./use-session";
import { CourseScheduleFormData } from "@/schema/course";
import { Schedule } from "@/types";

const KEY_SCHEDULES = "schedules";

export function useFindSchedule(moduleId: string) {
  const { token } = useSession();
  return useFetchData<Schedule[]>(
    [KEY_SCHEDULES],
    async () => findSchedule(moduleId, token),
    !!moduleId
  );
}

export function useSaveCourseSchedules() {
  const { token } = useSession();
  return useSaveData(
    async ({
      moduleId,
      schedule,
    }: {
      moduleId: string;
      schedule: CourseScheduleFormData;
    }) => {

      updateCourseSchedules(moduleId, schedule, token);
    },
    [KEY_SCHEDULES],
    "Horario del curso guardado exitosamente",
    "Error al guardar el horario del curso"
  );
}
