import { getAllEvents, getEventsUpcoming } from "@/route/event";
import { useFetchData } from "./use-generic";
import { useSession } from "./use-session";
import { CalendarEvent } from "@/types";

export function useFetchEventsUpcoming(moduleId: string) {
  const { token } = useSession();
  return useFetchData<CalendarEvent[]>(
    ["sections", moduleId],
    async () => await getEventsUpcoming(moduleId, token),
    !!moduleId
  );
}

interface FetchAllEventsParams {
  start?: string;
  end?: string;
}

export function useFetchAllEvents(params?: FetchAllEventsParams) {
  const { token } = useSession();
  return useFetchData<CalendarEvent[]>(
    ["events"],
    async () => await getAllEvents(params?.start, params?.end, token)
  );
}

export interface EventTypeFilters {
  assignment: boolean;
  announcement: boolean;
  [key: string]: boolean;
}

export interface CourseFilters {
  [courseCode: string]: boolean;
}

export interface DateInfo {
  title: string;
  startDate?: Date;
  endDate?: Date;
}
