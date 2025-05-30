import {
  FileText,
  ImageIcon,
  FileCode,
  FileSpreadsheet,
  FileArchive,
  FileIcon as FilePresentationIcon,
  FileVideo,
} from "lucide-react";

export const fileTypeColors: Record<string, { bg: string; text: string }> = {
  pdf: {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-600 dark:text-red-400",
  },
  doc: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-600 dark:text-blue-400",
  },
  sheet: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-600 dark:text-green-400",
  },
  presentation: {
    bg: "bg-orange-100 dark:bg-orange-900/20",
    text: "text-orange-600 dark:text-orange-400",
  },
  video: {
    bg: "bg-purple-100 dark:bg-purple-900/20",
    text: "text-purple-600 dark:text-purple-400",
  },
  image: {
    bg: "bg-pink-100 dark:bg-pink-900/20",
    text: "text-pink-600 dark:text-pink-400",
  },
  archive: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-600 dark:text-yellow-400",
  },
  code: {
    bg: "bg-cyan-100 dark:bg-cyan-900/20",
    text: "text-cyan-600 dark:text-cyan-400",
  },
  link: {
    bg: "bg-indigo-100 dark:bg-indigo-900/20",
    text: "text-indigo-600 dark:text-indigo-400",
  },
  default: {
    bg: "bg-gray-100 dark:bg-gray-800",
    text: "text-gray-600 dark:text-gray-400",
  },
};

// Función para obtener el icono según el tipo de archivo
export const getFileIcon = (file: File) => {
  const type = file.type;

  if (type.startsWith("image/")) return <ImageIcon className="h-8 w-8" />;
  if (type.includes("pdf")) return <FileText className="h-8 w-8" />;
  if (type.includes("word") || type.includes("doc"))
    return <FileText className="h-8 w-8" />;
  if (type.includes("excel") || type.includes("sheet") || type.includes("csv"))
    return <FileSpreadsheet className="h-8 w-8" />;
  if (type.includes("powerpoint") || type.includes("presentation"))
    return <FilePresentationIcon className="h-8 w-8" />;
  if (type.includes("video")) return <FileVideo className="h-8 w-8" />;
  if (type.includes("zip") || type.includes("rar") || type.includes("tar"))
    return <FileArchive className="h-8 w-8" />;
  if (
    type.includes("html") ||
    type.includes("javascript") ||
    type.includes("css")
  )
    return <FileCode className="h-8 w-8" />;

  return <FileText className="h-8 w-8" />;
};

// Función para obtener el color según el tipo de archivo
export const getFileTypeColor = (file: File) => {
  const type = file.type;

  if (type.startsWith("image/")) return fileTypeColors.image;
  if (type.includes("pdf")) return fileTypeColors.pdf;
  if (type.includes("word") || type.includes("doc")) return fileTypeColors.doc;
  if (type.includes("excel") || type.includes("sheet") || type.includes("csv"))
    return fileTypeColors.sheet;
  if (type.includes("powerpoint") || type.includes("presentation"))
    return fileTypeColors.presentation;
  if (type.includes("video")) return fileTypeColors.video;
  if (type.includes("zip") || type.includes("rar") || type.includes("tar"))
    return fileTypeColors.archive;
  if (
    type.includes("html") ||
    type.includes("javascript") ||
    type.includes("css")
  )
    return fileTypeColors.code;

  return fileTypeColors.default;
};
