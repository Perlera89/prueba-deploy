import {
  getCourses,
  getCoursesByProfile,
  findCourseByProfile,
  addCourse,
  updateCourse,
  archiveCourse,
  findCourseById,
  updateVisibilityCourse,
} from "@/route/course/course";
import { Course } from "@/types";
import {
  useFetchData,
  useFindData,
  useSaveData,
  useDeleteData,
} from "../use-generic";
import { useSession } from "../use-session";
import { CourseFormData } from "@/schema/course";
import { useRouter } from "next/navigation";

const KEY_COURSE = "courses";

export function useFetchCourses(page: number, limit: number) {
  const { token } = useSession();
  return useFetchData(
    [KEY_COURSE, String(page), String(limit)],
    async () => await getCourses(token, page, limit)
  );
}

export function useFetchCoursesByProfile() {
  const { token } = useSession();
  return useFetchData<Course[]>([KEY_COURSE], async () => {
    return await getCoursesByProfile(token);
  });
}

export function useFindCourseById(courseId: string) {
  const { token } = useSession();
  return useFindData<Course>(
    [KEY_COURSE, courseId],
    async () => findCourseById(courseId, token),
    !!courseId
  );
}

export function useFindCourseByProfile(
  courseCode: string,
  page: number = 1,
  limit: number = 10
) {
  const { token } = useSession();
  return useFindData<Course>(
    [KEY_COURSE, courseCode, String(page), String(limit)],
    async () => findCourseByProfile(courseCode, token, page, limit),
    !!courseCode
  );
}

export function useSaveCourse() {
  const { token } = useSession();
  const router = useRouter();
  return useSaveData(
    async ({ course }: { course: CourseFormData }) => {
      const courseData: any = {
        title: course.title,
        courseCode: course.courseCode,
        categoryId: Number(course.categoryId),
        isVisible: course.isVisible,
        status: course.status,
        description: course.description,
        price: Number(course.price),
        picture: course.picture,
      };

      if (course.id) {
        await updateCourse(course.id, courseData, token);
      } else {
        await addCourse(token, courseData);
      }

      router.back();
    },
    [KEY_COURSE],
    "Curso guardado exitosamente",
    "Error al guardar el Curso"
  );
}

export function useUpdateVisibilityCourse(materialId: string) {
  const { token } = useSession();
  return useSaveData(
    async () => {
      await updateVisibilityCourse(materialId, token);
    },
    [KEY_COURSE, materialId],
    "Se cambió la Visibilidad",
    "Error al cambiar la Visibilidad"
  );
}

export function useArchiveCourse() {
  const { token } = useSession();
  return useDeleteData(
    async ({ courseId }: { courseId: string }) =>
      await archiveCourse(courseId, token),
    [KEY_COURSE],
    "Curso archivado exitosamente",
    "Error al archivar el Curso"
  );
}
