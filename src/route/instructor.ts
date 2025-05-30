import { api } from "@/route/api";
import { InstructorProfile } from "@/types";

export const getInstructors = async (
  page: number = 1,
  limit: number = 10,
  token: string
) => {
  const response = await api.post(
    `/profile/instructor/get-all`,
    { page, limit },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  return response.data.data.profiles || [];
};

export const findInstructor = async (id: string, token: string) => {
  const response = await api.post(
    `/profile/instructor/get-by-id`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data || response.data;
};

export const addInstructor = async (
  instructor: Partial<InstructorProfile>,
  token: string
) => {
  await api.post(`/profile/instructor/register`, instructor, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateInstructor = async (
  instructor: Partial<InstructorProfile>,
  token: string
) => {
  await api.put(`/profile/instructor/update`, instructor, {
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
