import { api } from "@/route/api";

export const courseEnrollment = async (courseId: string, token: string) => {

  const response = await api.post(
    "/course/enrollment",
    {
      courseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
