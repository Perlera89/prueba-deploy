import {
  Code,
  File,
  FileArchive,
  FileText,
  Globe,
  Headphones,
  Image,
  Presentation,
  Table,
  Video,
} from "lucide-react";

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

export const getFileIcon = (extensionOrMime?: string) => {
  if (!extensionOrMime) return <FileText className="h-6 w-6 text-gray-500" />;

  const extension = extensionOrMime.includes("/")
    ? extensionOrMime.split("/")[1]
    : extensionOrMime;

  switch (extension.toLowerCase()) {
    // Documentos
    case "pdf":
      return <FileText className="h-6 w-6 text-red-600" />;

    // docs
    case "doc":
    case "vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "docx":
      return <FileText className="h-6 w-6 text-blue-600" />;
    // docs
    case "doc":
    case "vnd.openxmlformats-officedocument.wordprocessingml.document":
    case "docx":
      return <Presentation className="h-6 w-6 text-orange-600" />;

    // Hojas de cálculo
    case "xls":
    case "xlsx":
    case "csv":
      return <Table className="h-6 w-6 text-green-600" />;

    // Imágenes
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "svg":
      return <Image className="h-6 w-6 text-purple-500" />;

    // Videos
    case "mp4":
    case "mov":
    case "avi":
    case "mkv":
      return <Video className="h-6 w-6 text-pink-500" />;

    // Audio
    case "mp3":
    case "mpeg":
    case "wav":
    case "ogg":
      return <Headphones className="h-6 w-6 text-yellow-500" />;

    // Código
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
    case "py":
    case "java":
    case "html":
    case "css":
      return <Code className="h-6 w-6 text-cyan-500" />;

    // Archivos comprimidos
    case "zip":
    case "x-compressed":
    case "rar":
    case "tar":
    case "7z":
      return <FileArchive className="h-6 w-6 text-red-500" />;

    // Enlaces web
    case "url":
    case "link":
      return <Globe className="h-6 w-6 text-blue-400" />;

    default:
      return <File className="h-6 w-6 text-gray-500" />;
  }
};

export function getFileType(
  extension?: string,
  url: string = ""
): "image" | "pdf" | "video" | "audio" | "other" {
  // Primero verificar por extensión
  const ext = extension ? extension.toLowerCase().trim() : "";

  if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(ext)) {
    return "image";
  }

  if (ext === "pdf") {
    return "pdf";
  }

  if (["mp4", "webm", "ogg", "mov", "avi", "wmv", "flv", "mkv"].includes(ext)) {
    return "video";
  }

  if (["mp3", "wav", "ogg", "aac", "flac"].includes(ext)) {
    return "audio";
  }

  // Si no hay extensión o no es reconocida, intentar detectar por URL
  const urlLower = url.toLowerCase();

  // Detectar videos de plataformas comunes
  if (
    urlLower.includes("youtube.com") ||
    urlLower.includes("youtu.be") ||
    urlLower.includes("vimeo.com") ||
    urlLower.includes("dailymotion.com") ||
    urlLower.endsWith(".mp4") ||
    urlLower.endsWith(".webm") ||
    urlLower.endsWith(".ogg") ||
    urlLower.endsWith(".mov")
  ) {
    return "video";
  }

  // Detectar audios por URL
  if (
    urlLower.endsWith(".mp3") ||
    urlLower.endsWith(".wav") ||
    urlLower.endsWith(".ogg") ||
    urlLower.endsWith(".aac") ||
    urlLower.endsWith(".flac")
  ) {
    return "audio";
  }

  // Detectar imágenes por URL
  if (
    urlLower.endsWith(".jpg") ||
    urlLower.endsWith(".jpeg") ||
    urlLower.endsWith(".png") ||
    urlLower.endsWith(".gif") ||
    urlLower.endsWith(".webp") ||
    urlLower.endsWith(".svg")
  ) {
    return "image";
  }

  // Detectar PDFs por URL
  if (urlLower.endsWith(".pdf")) {
    return "pdf";
  }

  return "other";
}
