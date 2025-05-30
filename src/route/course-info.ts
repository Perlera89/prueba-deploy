import { ModuleInfo } from "@/types";
import { api } from "@/route/api";

export const findModuleInfo = async (courseId: string, token: string) => {
  const response = await api.get(`/course/get-info/${courseId}`, {
    params: { courseId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.courseInfo;
};

export const addModuleInfo = async (
  token: string,
  courseInfo: Partial<ModuleInfo>
) => {
  await api.post("/courses/add-info", courseInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateModuleInfo = async (
  moduleId: string,
  moduleInfo: Partial<ModuleInfo>,
  token: string
) => {
  await api.post(`/course/module/courseInfo/${moduleId}`, moduleInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
