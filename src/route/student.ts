import { api } from "@/route/api";
import { Student } from "@/types";

export const getStudents = async (
  page: number = 1,
  limit: number = 10,
  token: string
) => {
  const response = await api.post(
    `/profile/student/get-all`,
    { page, limit },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    response.data.data || {
      profiles: [],
      pagination: { total: 0, page, limit, pages: 0 },
    }
  );
};

export const findStudent = async (id: string, token: string) => {
  const response = await api.post(
    `/profile/student/get-by-id`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data || response.data;
};

export const addStudent = async (student: Partial<Student>, token: string) => {

  await api.post(`/profile/student/create`, student, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateStudent = async (
  student: Partial<Student>,
  token: string
) => {

  await api.put(`/profile/student/update`, student, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const deleteInstructor = async (sectionId: string, token: string) => {
//   await api.delete(`/profile/instructor/delete-image`, {
//     params: { sectionId },
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
// };
