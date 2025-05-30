import { getStudents, findStudent } from "@/route/student";
import { Student } from "@/types";
import { useFetchData } from "./use-generic";
import { useSession } from "./use-session";

const KEY_STUDENT = "students";

interface PaginatedResponse {
  profiles: Student[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export function useFetchStudents(page: number = 1, limit: number = 10) {
  const { token } = useSession();
  return useFetchData<PaginatedResponse>(
    [KEY_STUDENT, String(page), String(limit)],
    async () => await getStudents(page, limit, token)
  );
}

export function useFetchStudentById(id: string) {
  const { token } = useSession();
  return useFetchData<Student>(
    [KEY_STUDENT, "by-id", id],
    async () => await findStudent(id, token),
    !!id && !!token
  );
}
