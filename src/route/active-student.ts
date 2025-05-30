import { api } from "./api";

export const activeStudents = async (
  courseCode: string,
  token: string,
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.get(`/course/enrollment/students/${courseCode}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      limit,
    },
  });
  return response.data || [];
};
