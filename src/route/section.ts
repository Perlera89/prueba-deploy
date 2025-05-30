import { Section } from "@/types";
import { api } from "@/route/api";

export const getSections = async (
  moduleId: string,
  token: string,
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.get(
    `/courses/sections/get-all-by-module/${moduleId}`,
    {
      params: { moduleId, page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return {
    sections: response.data.courseSections || [],
    meta: response.data.meta || {
      total: response.data.courseSections.length,
      totalPages: Math.ceil(response.data.courseSections.length / limit) || 1,
      page: page || 1,
      limit: limit || response.data.courseSections.length,
    },
  };
};

export const findSection = async (courseCode: string, token: string) => {
  const response = await api.get(`courses/${courseCode}/create-section`, {
    params: { courseCode },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.course;
};

export const addSection = async (
  moduleId: string,
  section: Partial<Section>,
  token: string
) => {
  await api.post(`/courses/sections/create/${moduleId}`, section, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVisibilitySection = async (
  sectionId: string,
  token: string
) => {
  await api.patch(
    `/courses/sections/visibility/${sectionId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const updateSection = async (
  sectionId: string,
  section: Partial<Section>,
  token: string
) => {
  await api.put(`/courses/sections/update/${sectionId}`, section, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSection = async (sectionId: string, token: string) => {
  await api.delete(`/courses/sections/delete/${sectionId}`, {
    params: { sectionId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
