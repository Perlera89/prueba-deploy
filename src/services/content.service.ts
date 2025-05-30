/**
 * content.service.ts
 * Servicio para interactuar con la API de contenido/materiales
 */

import { Content, ContentType, ResourceViewModel } from "@/types";

class ContentService {
  private static instance: ContentService;
  private baseUrl: string;

  private constructor() {
    // URL base para las llamadas a la API
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
  }

  public static getInstance(): ContentService {
    if (!ContentService.instance) {
      ContentService.instance = new ContentService();
    }
    return ContentService.instance;
  }

  // Obtener un contenido específico por ID
  async getContentById(contentId: string): Promise<Content> {
    try {
      const response = await fetch(`${this.baseUrl}/content/${contentId}`);

      if (!response.ok) {
        throw new Error(
          `Error al obtener el contenido: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getContentById:", error);
      throw error;
    }
  }

  // Obtener todos los contenidos de una sección
  async getContentsBySection(sectionId: string): Promise<Content[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/sections/${sectionId}/contents`
      );

      if (!response.ok) {
        throw new Error(
          `Error al obtener los contenidos de la sección: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getContentsBySection:", error);
      throw error;
    }
  }

  // Crear un nuevo contenido
  async createContent(content: Partial<Content>): Promise<Content> {
    try {
      const response = await fetch(`${this.baseUrl}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error(`Error al crear el contenido: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en createContent:", error);
      throw error;
    }
  }

  // Actualizar un contenido existente
  async updateContent(
    contentId: string,
    content: Partial<Content>
  ): Promise<Content> {
    try {
      const response = await fetch(`${this.baseUrl}/content/${contentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error(
          `Error al actualizar el contenido: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error en updateContent:", error);
      throw error;
    }
  }

  // Eliminar un contenido
  async deleteContent(contentId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/content/${contentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(
          `Error al eliminar el contenido: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error en deleteContent:", error);
      throw error;
    }
  }

  // Subir un archivo para un contenido
  async uploadFile(contentId: string, file: File): Promise<ResourceViewModel> {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${this.baseUrl}/content/${contentId}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error al subir el archivo: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error en uploadFile:", error);
      throw error;
    }
  }

  // Crear una asignación (actividad)
  async createAssignment(
    sectionId: string,
    assignmentData: Partial<Content>
  ): Promise<Content> {
    try {
      // Asegurarse de que el tipo de contenido sea correcto
      const data = {
        ...assignmentData,
        contentType: ContentType.ASSIGNMENT,
        sectionId,
      };

      return await this.createContent(data);
    } catch (error) {
      console.error("Error en createAssignment:", error);
      throw error;
    }
  }
}

// Exportar una instancia del servicio
export const contentService = ContentService.getInstance();
