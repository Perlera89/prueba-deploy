import { Reply } from "@/types";
import { api } from "@/route/api";

export const getForumAllReplies = async (forumId: string, token: string) => {
  try {
    const response = await api.get(`/course/forum/get-replies/${forumId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReply = async (reply: Partial<Reply>, token: string) => {

  await api.post(`/course/forum/add-reply`, reply, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateReply = async (reply: any, token: string) => {
  await api.put(`/course/forum/update-reply`, reply, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteReply = async (reply: any, token: string) => {
  await api.delete(`/course/forum/delete-reply`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: reply,
  });
};
