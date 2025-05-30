import { Assignment } from "@/types";
import { api } from "@/route/api";

interface AssingnametsProps {
  courseCode?: string;
  sectionId?: string;
}

export const getAssignments = async (
  assignment: AssingnametsProps,
  token: string
) => {
  const response = await api.get(`/course/assignment/get-all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      courseCode: assignment.courseCode,
      sectionId: assignment.sectionId,
    },
  });

  return response.data.courseAssignments || [];
};

export const findAssignment = async (id: string, token: string) => {
  const response = await api.get(`/course/assignment/get-by-id/${id}`, {
    params: { id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.courseAssignment;
};

export const addAssignments = async (
  assingment: Partial<Assignment>,
  token: string
) => {
  await api.post(`/course/assignment/add`, assingment, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAssignment = async (
  id: string,
  assignment: Partial<Assignment>,
  token: string
) => {
  await api.put(`/course/assignment/update/${id}`, assignment, {
    params: { id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVisibilityAssignment = async (id: string, token: string) => {
  await api.patch(
    `/course/assignment/visibility/${id}`,
    {},
    {
      params: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteAssignment = async (id: string, token: string) => {
  await api.delete(`/course/assignment/delete/${id}`, {
    params: { id },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
