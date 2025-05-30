// Hook para gestionar los datos de asignaciones
import { useState, useEffect } from "react";
import { Content } from "@/types";
import {
  assignmentService,
  AssignmentStudent,
  AssignmentSubmission,
} from "@/services/assignment.service";
import { contentService } from "@/services/content.service";

interface UseAssignmentResult {
  // Datos principales
  loading: boolean;
  error: string | null;
  assignment: Content | null;
  students: AssignmentStudent[];
  submissions: AssignmentSubmission[];
  stats: {
    total: number;
    submitted: number;
    graded: number;
    pending: number;
    passed: number;
  };

  // Acciones
  refreshData: () => Promise<void>;
  gradeSubmission: (
    submissionId: string,
    score: number,
    feedback?: string
  ) => Promise<void>;
  updateRubric: (rubric: any[]) => Promise<void>;
  updateAssignment: (updatedData: Partial<Content>) => Promise<void>;
}

export function useAssignment(
  assignmentId: string,
  courseId: string
): UseAssignmentResult {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assignment, setAssignment] = useState<Content | null>(null);
  const [students, setStudents] = useState<AssignmentStudent[]>([]);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    submitted: 0,
    graded: 0,
    pending: 0,
    passed: 0,
  });

  // Función para cargar todos los datos necesarios
  const loadData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Cargar datos en paralelo para mejor rendimiento
      const [assignmentData, studentsData, submissionsData] = await Promise.all(
        [
          assignmentService.getAssignmentDetails(assignmentId),
          assignmentService.getAssignmentStudents(courseId),
          assignmentService.getAssignmentSubmissions(assignmentId),
        ]
      );

      setAssignment(assignmentData);
      setStudents(studentsData);
      setSubmissions(submissionsData);

      // Calcular estadísticas basadas en las entregas y estudiantes
      const calculatedStats = assignmentService.calculateStats(
        submissionsData,
        studentsData.length
      );
      setStats(calculatedStats);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error desconocido al cargar datos"
      );
      console.error("Error en useAssignment:", err);
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos inicialmente
  useEffect(() => {
    loadData();
  }, [assignmentId, courseId]);

  // Función para calificar una entrega
  const gradeSubmission = async (
    submissionId: string,
    score: number,
    feedback?: string
  ) => {
    try {
      const updatedSubmission = await assignmentService.gradeSubmission(
        submissionId,
        score,
        feedback
      );

      // Actualizar la lista de entregas con la nueva
      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === submissionId ? updatedSubmission : sub))
      );

      // Recalcular estadísticas
      const updatedStats = assignmentService.calculateStats(
        submissions.map((sub) =>
          sub.id === submissionId ? updatedSubmission : sub
        ),
        students.length
      );
      setStats(updatedStats);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al calificar la entrega"
      );
      console.error("Error al calificar:", err);
    }
  };
  // Función para actualizar la rúbrica
  const updateRubric = async (rubric: any[]) => {
    if (!assignment) return;

    try {
      // Actualizar la rúbrica usando el servicio de contenido
      await contentService.updateContent(assignmentId, {
        assignment: {
          ...assignment.assignment,
          rubric,
        },
      });

      // Actualizar la asignación con la nueva rúbrica localmente
      setAssignment((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          assignment: {
            ...prev.assignment,
            rubric,
          },
        };
      });

      // Recargar todos los datos para asegurarnos de tener la última versión
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar la rúbrica"
      );
      console.error("Error al actualizar rúbrica:", err);
    }
  };

  // Función para actualizar la asignación completa
  const updateAssignment = async (updatedData: Partial<Content>) => {
    try {
      await contentService.updateContent(assignmentId, updatedData);
      // Recargar datos después de actualizar
      await loadData();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar la asignación"
      );
      console.error("Error al actualizar asignación:", err);
      throw err; // Re-lanzar el error para que el componente que llama pueda manejarlo
    }
  };
  return {
    loading,
    error,
    assignment,
    students,
    submissions,
    stats,
    refreshData: loadData,
    gradeSubmission,
    updateRubric,
    updateAssignment,
  };
}
