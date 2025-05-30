"use client";
import {
  File,
  FileText,
  ImageIcon,
  LinkIcon,
  Music,
  PlayCircle,
  Video,
  X,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Tipos de recursos
export type ResourceType = "file" | "link";

// Interfaz para un archivo
export interface ResourceFile extends File {
  preview?: string;
}

// Interfaz para un enlace
export interface ResourceLink {
  url: string;
}

interface ResourceCardProps {
  resource: ResourceFile | ResourceLink;
  type: ResourceType;
  onRemove: () => void;
  onPreview?: (preview: string) => void;
}

export function ResourceCard({
  resource,
  type,
  onRemove,
  onPreview,
}: ResourceCardProps) {
  // Función para obtener el icono según el tipo de archivo
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4 text-blue-500" />;
    } else if (file.type.startsWith("video/")) {
      return <PlayCircle className="h-4 w-4 text-red-500" />;
    } else if (file.type.startsWith("audio/")) {
      return <Music className="h-4 w-4 text-purple-500" />;
    } else if (file.type.includes("pdf")) {
      return <FileText className="h-4 w-4 text-orange-500" />;
    } else if (file.type.includes("word") || file.type.includes("document")) {
      return <FileText className="h-4 w-4 text-blue-500" />;
    } else if (file.type.includes("excel") || file.type.includes("sheet")) {
      return <FileText className="h-4 w-4 text-green-500" />;
    } else if (
      file.type.includes("powerpoint") ||
      file.type.includes("presentation")
    ) {
      return <FileText className="h-4 w-4 text-yellow-500" />;
    } else {
      return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  // Función para formatear el tamaño del archivo
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  // Función para extraer el dominio de una URL
  const getDomainFromUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname;
    } catch (e) {
      return url;
    }
  };

  // Renderizar card según el tipo de recurso
  if (type === "file") {
    const file = resource as ResourceFile;
    const hasPreview = file.type.startsWith("image/");
    const previewUrl = hasPreview ? URL.createObjectURL(file) : undefined;

    return (
      <Card className="overflow-hidden p-0">
        {/* Previsualización para imágenes */}
        {hasPreview && (
          <div
            className="h-32 bg-muted relative cursor-pointer"
            onClick={() => onPreview && previewUrl && onPreview(previewUrl)}
            style={{
              backgroundImage: `url(${previewUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
              <Eye className="h-6 w-6 text-white" />
            </div>
          </div>
        )}

        {/* Previsualización para otros tipos de archivos */}
        {!hasPreview && (
          <div className="h-32 bg-muted flex items-center justify-center">
            {file.type.startsWith("video/") && (
              <Video className="h-12 w-12 text-red-500/70" />
            )}
            {file.type.startsWith("audio/") && (
              <Music className="h-12 w-12 text-purple-500/70" />
            )}
            {file.type.includes("pdf") && (
              <FileText className="h-12 w-12 text-orange-500/70" />
            )}
            {file.type.includes("word") && (
              <FileText className="h-12 w-12 text-blue-500/70" />
            )}
            {file.type.includes("excel") && (
              <FileText className="h-12 w-12 text-green-500/70" />
            )}
            {file.type.includes("powerpoint") && (
              <FileText className="h-12 w-12 text-yellow-500/70" />
            )}
            {!file.type.startsWith("video/") &&
              !file.type.startsWith("audio/") &&
              !file.type.includes("pdf") &&
              !file.type.includes("word") &&
              !file.type.includes("excel") &&
              !file.type.includes("powerpoint") && (
                <File className="h-12 w-12 text-gray-500/70" />
              )}
          </div>
        )}

        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div>
                <p className="text-sm font-medium truncate max-w-[180px]">
                  {file.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  ({formatFileSize(file.size)})
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  } else {
    // Renderizar card para enlaces
    const link = (resource as ResourceLink).url;

    return (
      <Card className="overflow-hidden p-0">
        <div className="h-32 bg-muted flex items-center justify-center">
          <LinkIcon className="h-12 w-12 text-green-500/70" />
        </div>
        <CardContent className="p-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div>
                <p className="text-sm font-medium truncate max-w-[180px]">
                  {getDomainFromUrl(link)}
                </p>
                <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                  {link}
                </p>
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 h-auto text-xs"
                  asChild
                >
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    Visitar enlace
                  </a>
                </Button>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRemove}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
