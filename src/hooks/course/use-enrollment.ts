import { courseEnrollment } from "@/route/course/enrollment";
import { useSaveData } from "../use-generic";
import { useSession } from "../use-session";

const KEY_COURSE_ENROLLMENT = "course-enrollment";

export function useCourseEnrollment() {
  const { token } = useSession();
  return useSaveData(
    async ({ courseId }: { courseId: string }) => {
      const response = await courseEnrollment(courseId, token);
      return response;
    },
    [KEY_COURSE_ENROLLMENT],
    "Se está procesando la inscripción",
    "Error al procesar la inscripción"
  );
}
