import { PostCategory } from "@/types";
import { api } from "@/route/api";

export const getCategoriesPost = async (courseId: string, token: string) => {
  const response = await api.get(`/course/forum/get-categories/${courseId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.categories || [];
};

export const deleteCategoryPost = async (categoryId: string, token: string) => {
  await api.delete(`/course/forum/category/delete/${categoryId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCategoryPost = async (
  category: Partial<PostCategory>,
  token: string
) => {
  const res = await api.post(
    `/course/forum/category/create`,
    {
      name: category.name,
      moduleId: category.moduleId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
