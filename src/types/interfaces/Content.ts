import { Author, ContentType, ResourceType } from "@/types";

interface Resource {
  title: string;
  fileExtension: string;
  url: string;
}

export interface RubricCriteria {
  id: string;
  description: string;
  points: number;
}

export interface Assignment {
  rubric?: RubricCriteria[];
  score?: number;
  dueDate?: Date;
  isGraded?: boolean;
  allowLateSubmissions?: boolean;
}

export interface Content {
  id: string;
  sectionId: string;
  title: string;
  description?: string;
  resourceType: ResourceType;
  contentType: ContentType;
  files?: Resource[];
  assignment?: Assignment;
  resources?: Resource[];
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface ResourceViewModel {
  id: string;
  title: string;
  fileExtension: string;
  url: string;
  type: "file" | "link";
}

export interface ContentViewModel {
  id: string;
  sectionId: string;
  title: string;
  description: string;
  resourceType: ResourceType;
  resources: ResourceViewModel[];
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Funciones de mapeo entre modelos
export function mapToViewModel(content: Content): ContentViewModel {
  const resourceType = determineContentType(content.files ?? []);

  // Determinar si es file y url
  const resources: ResourceViewModel[] = [
    ...(content.files ?? []).map((file, index) => ({
      id: `file-${index}`,
      title: file.title,
      fileExtension: file.fileExtension,
      url: file.url,
      type: "file" as const,
    })),
    ...(content.urls || []).map((link, index) => ({
      id: `url-${index}`,
      title: link.title,
      fileExtension: link.fileExtension,
      url: link.url,
      type: "link" as const,
    })),
  ];

  return {
    id: content.id,
    sectionId: content.sectionId,
    title: content.title,
    description: content.description || "",
    resourceType,
    isVisible: content.isVisible,
    createdAt: content.createdAt,
    updatedAt: content.updatedAt,
    resources,
  };
}

function determineContentType(files: Resource[]): ResourceType {
  if (files.length === 0) {
    return ResourceType.OTHER;
  }

  // Contar los tipos de archivos
  const typeCounts = {
    [ResourceType.VIDEO]: 0,
    [ResourceType.FILE]: 0,
    [ResourceType.IMAGE]: 0,
    [ResourceType.AUDIO]: 0,
    [ResourceType.URL]: 0,
    [ResourceType.DOCUMENT]: 0,
    [ResourceType.OTHER]: 0,
  };

  files.forEach((file) => {
    const fileType = getFileTypeFromExtension(file.fileExtension);
    typeCounts[fileType]++;
  });

  let maxCount = 0;
  let dominantType = ResourceType.OTHER;

  Object.entries(typeCounts).forEach(([type, count]) => {
    if (count > maxCount) {
      maxCount = count;
      dominantType = type as ResourceType;
    }
  });

  return dominantType;
}

// Determinar el tipo de archivo basado en la extensión
function getFileTypeFromExtension(extension: string): ResourceType {
  const ext = extension.toLowerCase().trim();

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
    return ResourceType.IMAGE;
  }

  if (["mp4", "webm", "ogg", "mov", "avi", "wmv", "flv", "mkv"].includes(ext)) {
    return ResourceType.VIDEO;
  }

  if (["mp3", "wav", "ogg", "aac", "flac"].includes(ext)) {
    return ResourceType.AUDIO;
  }

  if (
    [
      "pdf",
      "doc",
      "docx",
      "txt",
      "rtf",
      "odt",
      "ppt",
      "pptx",
      "xls",
      "xlsx",
    ].includes(ext)
  ) {
    return ResourceType.DOCUMENT;
  }

  return ResourceType.OTHER;
}
