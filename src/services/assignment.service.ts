// Servicio para gestionar asignaciones (actividades)
import { Content, Assignment, RubricCriteria } from "@/types";

// Interfaz para representar a un estudiante en el contexto de una asignación
export interface AssignmentStudent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Interfaz para representar una entrega de asignación
export interface AssignmentSubmission {
  id: string;
  studentId: string;
  materialId: string;
  submittedAt: Date;
  status: "submitted" | "late" | "graded" | "not_submitted";
  score?: number;
  feedback?: string;
  files?: { name: string; url: string; type: string }[];
}

// Clase de servicio para gestionar las asignaciones
export class AssignmentService {
  private static instance: AssignmentService;
  private baseUrl: string;

  private constructor() {
    // URL base para las llamadas a la API
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  }

  public static getInstance(): AssignmentService {
    if (!AssignmentService.instance) {
      AssignmentService.instance = new AssignmentService();
    }
    return AssignmentService.instance;
  }

  // Obtener detalles de una asignación específica
  async getAssignmentDetails(assignmentId: string): Promise<Content> {
    try {
      const response = await fetch(`${this.baseUrl}/content/${assignmentId}`);

      if (!response.ok) {
        throw new Error("Error al obtener detalles de la asignación");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getAssignmentDetails:", error);
      throw error;
    }
  }

  // Obtener estudiantes para una asignación
  async getAssignmentStudents(courseId: string): Promise<AssignmentStudent[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/courses/${courseId}/students`
      );

      if (!response.ok) {
        throw new Error("Error al obtener estudiantes del curso");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getAssignmentStudents:", error);
      throw error;
    }
  }

  // Obtener entregas para una asignación
  async getAssignmentSubmissions(
    assignmentId: string
  ): Promise<AssignmentSubmission[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/assignments/${assignmentId}/submissions`
      );

      if (!response.ok) {
        throw new Error("Error al obtener entregas");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getAssignmentSubmissions:", error);
      throw error;
    }
  }

  // Calificar una entrega
  async gradeSubmission(
    submissionId: string,
    score: number,
    feedback?: string
  ): Promise<AssignmentSubmission> {
    try {
      const response = await fetch(
        `${this.baseUrl}/submissions/${submissionId}/grade`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ score, feedback }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al calificar la entrega");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en gradeSubmission:", error);
      throw error;
    }
  }

  // Actualizar rubrica de asignación
  async updateAssignmentRubric(
    assignmentId: string,
    rubric: RubricCriteria[]
  ): Promise<Assignment> {
    try {
      const response = await fetch(
        `${this.baseUrl}/assignments/${assignmentId}/rubric`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rubric }),
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar la rúbrica");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en updateAssignmentRubric:", error);
      throw error;
    }
  }

  // Calcular estadísticas para una asignación basada en las entregas
  calculateStats(submissions: AssignmentSubmission[], totalStudents: number) {
    const graded = submissions.filter((sub) => sub.status === "graded").length;
    const submitted = submissions.length;
    const pending = submitted - graded;
    const passed = submissions.filter(
      (sub) =>
        sub.status === "graded" && sub.score !== undefined && sub.score >= 60
    ).length;

    return {
      total: totalStudents,
      submitted,
      graded,
      pending,
      passed,
    };
  }
}

// Exportar una instancia del servicio
export const assignmentService = AssignmentService.getInstance();
