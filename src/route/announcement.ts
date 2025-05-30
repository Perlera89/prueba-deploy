import { Section, Announcement } from "@/types";
import { api } from "@/route/api";

export const getAnnouncements = async (
  moduleId: string,
  token: string,
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.get(`/modules/announcements/get-all/${moduleId}`, {
    params: { page, limit },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


  return response.data.announcements || [];
};

export const getPublicAnnouncements = async (
  moduleId: string,
  token: string,
  page: number = 1,
  limit: number = 10
) => {
  const response = await api.get(
    `/modules/announcements/public-get-all/${moduleId}`,
    {
      params: { page, limit },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.announcements;
};

export const findAnnouncement = async (
  moduleId: string,
  announcementId: string,
  token: string
) => {
  const response = await api.get(
    `/modules/announcements/get-by-moduleId/${moduleId}/${announcementId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.course;
};

export const addAnnouncement = async (
  moduleId: string,
  announcement: Partial<Announcement>,
  token: string
) => {
  await api.post(`/modules/announcements/create/${moduleId}`, announcement, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateAnnouncement = async (
  announcementId: string,
  section: Partial<Section>,
  token: string
) => {
  await api.put(`/modules/announcements/update/${announcementId}`, section, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAnnouncement = async (
  announcementId: string,
  token: string
) => {
  await api.delete(`/modules/announcements/delete/${announcementId}`, {
    params: { announcementId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
