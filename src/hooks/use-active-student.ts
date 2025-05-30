import { useSession } from "./use-session";
import { useFetchData } from "./use-generic";
import { activeStudents } from "@/route/active-student";

const KEY_ACTIVE_STUDENTS = "active-students";

export function useFetchActiveStudets(
  page: number,
  limit: number,
  courseCode: string
) {
  const { token } = useSession();
  return useFetchData(
    [KEY_ACTIVE_STUDENTS, courseCode, String(page), String(limit)],
    async () => await activeStudents(courseCode, token, page, limit)
  );
}
