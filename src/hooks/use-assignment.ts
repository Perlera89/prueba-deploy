import {
  getAssignments,
  findAssignment,
  addAssignments,
  updateAssignment,
  deleteAssignment,
  updateVisibilityAssignment,
} from "@/route/assignment";
import {
  useFindData,
  useSaveData,
  useDeleteData,
  useFetchData,
} from "./use-generic";
import { useSession } from "./use-session";
import { AssignmentFormData, ContentFormData } from "@/schema/content";
import { Assignment } from "@/types";

const KEY_ASSIGNMENTS = "assignments";
const KEY_SECTIONS = "sections";

export function useFetchAssignments(courseCode: string, sectionId?: string) {
  const { token } = useSession();
  return useFetchData<Assignment[]>(
    [KEY_ASSIGNMENTS, courseCode],
    async () => await getAssignments({ courseCode, sectionId }, token),
    !!courseCode
  );
}

export function useFindAssignment(id: string) {
  const { token } = useSession();
  return useFindData(
    [KEY_ASSIGNMENTS, id],
    async () => findAssignment(id, token),
    !!id
  );
}

export function useSaveAssignment() {
  const { token } = useSession();
  return useSaveData(
    async ({ content }: { content: ContentFormData }) => {
      const assingmentData: Partial<AssignmentFormData> = {
        sectionId: content.sectionId,
        title: content.title,
        description: content.description,
        files: content.files,
        rubric: content.assignment?.rubric,
        score: content.assignment?.score,
        dueDate: content.assignment?.dueDate,
        isGraded: content.assignment?.isGraded,
        allowLateSubmissions: content.assignment?.allowLateSubmissions,
        isVisible: content.isVisible,
      };

      if (content.id) {
        await updateAssignment(content.id, assingmentData, token);
      } else {
        await addAssignments(assingmentData, token);
      }
    },
    [KEY_SECTIONS],
    "Actividad guardada exitosamente",
    "Error al guardar la Actividad"
  );
}

export function useUpdateVisibilityAssignment() {
  const { token } = useSession();
  return useSaveData(
    async ({ id }: { id: string }) => {
      await updateVisibilityAssignment(id, token);
    },
    [KEY_SECTIONS],
    "Se cambió la Visibilidad",
    "Error al cambiar la Visibilidad"
  );
}

export function useDeleteAssignment() {
  const { token } = useSession();

  return useDeleteData(
    async ({ id }: { id: string }) => await deleteAssignment(id, token),
    [KEY_SECTIONS],
    "Actividad eliminada exitosamente",
    "Error al eliminar la Actividad"
  );
}
