import { CourseCategory } from "@/types";
import { api } from "@/route/api";

export const getCategories = async (token: string) => {
  const response = await api.get("/course/category/get-all", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data || [];
};

export const findCategory = async (id: string) => {
  const response = await api.get(`/course/category/get-by-id`, {
    params: {
      id,
    },
  });

  return response.data;
};

export const addCategory = async (
  category: Partial<CourseCategory>,
  token: string
) => {
  await api.post("/course/category/create", category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCategory = async (
  category: Partial<CourseCategory>,
  token: string
) => {
  await api.put("/course/category/update", category, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteCategory = async (categoryId: number, token: string) => {
  await api.post(
    `/course/category/delete`,
    { categoryId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
