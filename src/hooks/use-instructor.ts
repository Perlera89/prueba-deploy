import {
  getInstructors,
  addInstructor,
  updateInstructor,
  findInstructor,
} from "@/route/instructor";
import { InstructorProfile } from "@/types";
import { useFetchData, useSaveData } from "./use-generic";
import { useSession } from "./use-session";
import { InstructorFormData } from "@/schema/instructor-profile";

const KEY_INSTRUCTOR = "instructors";

export function useFetchInstructors(page: number = 1, limit: number = 10) {
  const { token } = useSession();
  return useFetchData<InstructorProfile[]>(
    [KEY_INSTRUCTOR, String(page), String(limit)],
    async () => await getInstructors(page, limit, token)
  );
}

export function useFetchInstructorById(id: string) {
  const { token } = useSession();
  return useFetchData<InstructorProfile>(
    [KEY_INSTRUCTOR, "by-id", id],
    async () => await findInstructor(id, token),
    !!id && !!token
  );
}

export function useSaveInstructor() {
  const { token } = useSession();
  return useSaveData(
    async ({
      instructor,
    }: {
      instructor: Omit<InstructorFormData, "profileImage"> & {
        profileImage?: {
          url: string;
          title: string;
          fileExtension: string;
        };
        imagePerfil?: string;
      };
    }) => {
      const instructorData: Partial<InstructorProfile> = {
        names: instructor.names,
        surnames: instructor.surnames,
        title: instructor.title,
        email: instructor.email,
        password: instructor.password,
        instructorCode: instructor.instructorCode,
        imagePerfil: instructor.profileImage?.url || instructor.imagePerfil,
      };

      if (instructor.id) {
        const updatedInstructor = {
          ...instructorData,
          id: instructor.id,
        };
        await updateInstructor(updatedInstructor, token);
      } else {
        await addInstructor(instructorData, token);
      }
    },
    [KEY_INSTRUCTOR],
    "Instructor guardado exitosamente",
    "Error al guardar el instructor"
  );
}
