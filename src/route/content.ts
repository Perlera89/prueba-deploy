import { api } from "./api";
import { ContentFormData } from "../schema/content";

export const findContent = async (
  contentId: string,
  contentType: string,
  token: string
) => {
  const response = await api.get(
    `/course/content/get-by-id/${contentType}/${contentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("getContent response", response.data);
  return response.data || response.data;
};

export const addContent = async (
  content: Partial<ContentFormData>,
  token: string
) => {
  await api.post("/course/content/add", content, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateContent = async (
  contentId: string,
  content: Partial<ContentFormData>,
  token: string
) => {
  await api.put(`/course/content/update/${contentId}`, content, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateVisibilityContent = async (
  contentId: string,
  contentType: string,
  token: string
) => {
  await api.patch(
    `/course/content/visibility/${contentType}/${contentId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteContent = async (
  contentId: string,
  contentType: string,
  token: string
) => {
  await api.delete(`/course/content/delete/${contentType}/${contentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
