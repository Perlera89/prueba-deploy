import { Module } from "@/types";
import { api } from "@/route/api";

export const getModulesByCourse = async (courseId: string, token: string) => {
  const response = await api.get(`/course/module/get-by-course/${courseId}`, {
    params: { courseId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    course: response.data.course,
    modules: response.data.courseModules || [],
  };
};

export const findModuleById = async (moduleId: string, token: string) => {
  const response = await api.get(`/course/module/get-by-id/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.courseModule;
};

export const addModule = async (module: Partial<Module>, token: string) => {
  await api.post(`/course/module/add`, module, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateModule = async (
  moduleId: string,
  module: Partial<Module>,
  token: string
) => {
  await api.put(`/course/module/update/${moduleId}`, module, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateMeetingLink = async (
  moduleId: string,
  meetingLink: string,
  token: string
) => {
  await api.put(
    `/course/module/meeting-link/${moduleId}`,
    {
      meetingLink,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateVisibilityModule = async (
  moduleId: string,
  token: string
) => {
  await api.put(
    `/course/module/visibility/${moduleId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteModule = async (moduleId: string, token: string) => {
  await api.delete(`/course/module/delete/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
