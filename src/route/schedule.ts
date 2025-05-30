import { api } from "@/route/api";
import { CourseScheduleFormData } from "@/schema/course";

export const findSchedule = async (moduleId: string, token: string) => {
  const response = await api.get(`/modules/schedules/module/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.schedules || [];
};

export const updateCourseSchedules = async (
  moduleId: string,
  schedule: CourseScheduleFormData,
  token: string
) => {
  await api.put(`/modules/schedules/update/${moduleId}`, {
    schedules: schedule
  }, {

    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
