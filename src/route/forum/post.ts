import { api } from "@/route/api";
import { Post } from "@/types";

export const getAllpostsByModuleId = async (
  moduleId: string,
  token: string,
  page: number,
  limit: number
) => {
  const response = await api.get(`/course/forum/get-all/${moduleId}`, {
    params: {
      page,
      limit,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createPost = async (post: any, token: string) => {
  await api.post(`/course/forum/add`, post, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePost = async (post: Partial<Post>, token: string) => {
  const data = {
    title: post.title,
    description: post.description,
    categoryId: post.category?.id,
  };

  await api.put(`/course/forum/update/${post.id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deletePost = async (postId: string, token: string) => {
  await api.delete(`/course/forum/delete/${postId}`, {
    params: { forumId: postId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVisibilityPost = async (postId: string, token: string) => {
  await api.patch(
    `/course/forum/update-visibility/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const closedPost = async (postId: string, token: string) => {
  await api.patch(
    `/course/forum/close/${postId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
