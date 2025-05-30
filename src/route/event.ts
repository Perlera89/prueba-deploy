import { api } from "@/route/api";

export const getEventsUpcoming = async (moduleId: string, token: string) => {
  const response = await api.get("/course/assignment/upcoming", {
    params: { moduleId },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.assignments;
};
export const getAllEvents = async (start?: string, end?: string, token?: string) => {
  const response = await api.get("/calendar/events", {
    params: {
      startDate: start,
      endDate: end,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.events || [];
};

