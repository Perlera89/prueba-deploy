import { Course } from "@/types";
import { api } from "@/route/api";

export const getCourses = async (
  token: string,
  page: number,
  limit: number
) => {
  const response = await api.get("courses/get-all", {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    courses: response.data.courses || [],
    meta: response.data.meta || {
      total: response.data.courses.length,
      totalPages: 1,
      page: page || 1,
      limit: limit || response.data.courses.length,
    },
  };
};

export const getCoursesByProfile = async (token: string) => {
  try {
    if (!token) {
      throw new Error("Token de autenticación no disponible");
    }

    const response = await api.get("courses/get-by-profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data || !response.data.courses) {
      throw new Error("Formato de respuesta inesperado");
    }


    return response.data.courses;
  } catch (error) {
    throw error; // Re-lanzamos el error para un mejor manejo
  }
};

export const findCourseById = async (courseId: string, token: string) => {
  const response = await api.get(`/courses/get-by-id/${courseId}`, {
    params: { courseId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.course;
};

export const findCourseByProfile = async (
  courseCode: string,
  token: string,
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.get(`/courses/get-by-code/${courseCode}`, {
    params: { courseCode, page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const course = response.data.course;

  // Añadir metadatos de paginación
  return {
    ...course,
    totalPages: response.data.meta?.totalPages || 1,
    currentPage: page,
    totalItems: response.data.meta?.total || 0,
  };
};

export const addCourse = async (token: string, course: Partial<Course>) => {
  await api.post("/courses/add", course, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCourse = async (
  courseId: string,
  course: Partial<Course>,
  token: string
) => {
  await api.put(`/courses/update/${courseId}`, course, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVisibilityCourse = async (code: string, token: string) => {
  await api.put(
    `/courses/update-visibility/${code}`,
    {},
    {
      params: { code },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const archiveCourse = async (courseId: string, token: string) => {
  await api.put(
    `/courses/archive/${courseId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { courseId },
    }
  );
};

export const getCourseByProfile = async (token: string) => {
  const response = await api.get("/courses/get-by-profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.courses;
};
