import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import {
  X,
  Plus,
  Link as LinkIcon,
  Loader2,
  Info,
  FolderOpen,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ResourceType, ResourceUpload } from "@/types";
import { getFileIcon } from "@/utils/material";

// Props interface
interface ResourceUploaderProps {
  resources: ResourceUpload[];
  setResources: React.Dispatch<React.SetStateAction<ResourceUpload[]>>;
  isSubmitting: boolean;
  uploadProgress: Record<string, number>;
  uploadErrors: Record<string, string>;
}

export function ResourceUploader({
  resources,
  setResources,
  isSubmitting,
  uploadProgress,
  uploadErrors,
}: ResourceUploaderProps) {
  // Debug: imprimir los recursos para verificar

  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [resourceUrl, setResourceUrl] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Usamos el enum ResourceType para mantener consistencia
  const fileCount = resources.filter(
    (r) => r.type === ResourceType.FILE
  ).length;
  const canAddMoreFiles = fileCount < 5;

  const isUrlDuplicate = (url: string) => {
    return resources.some(
      (resource) => resource.type === ResourceType.URL && resource.value === url
    );
  };

  const isFileDuplicate = (fileName: string) => {
    return resources.some(
      (resource) =>
        resource.type === ResourceType.FILE && resource.value === fileName
    );
  };
  const addUrlResource = () => {
    if (resourceUrl) {
      // Validamos que sea una URL válida
      try {
        new URL(resourceUrl);
      } catch (e) {
        setUrlError("La URL no es válida. Debe incluir http:// o https://");
        return;
      }

      if (isUrlDuplicate(resourceUrl)) {
        setUrlError("Esta URL ya ha sido agregada");
        return;
      } // Usamos ResourceType.URL para mantener consistencia

      const newResource = {
        id: nanoid(),
        type: ResourceType.URL,
        value: resourceUrl,
        cloudinaryTitle: "",
      };


      const newResources = [...resources, newResource];
      setResources(newResources);

      setResourceUrl("");
      setUrlError(null);
      setShowUrlDialog(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const existingFileCount = resources.filter(
        (r) => r.type === ResourceType.FILE
      ).length;

      const remainingSlots = 5 - existingFileCount;

      if (remainingSlots <= 0) {
        return;
      }

      const filesToProcess = Math.min(e.target.files.length, remainingSlots);

      const newResources: ResourceUpload[] = [];

      for (let i = 0; i < filesToProcess; i++) {
        const file = e.target.files[i];

        if (isFileDuplicate(file.name)) {
          continue;
        } // Usamos ResourceType.FILE para mantener consistencia
        const fileResource: ResourceUpload = {
          id: nanoid(),
          type: ResourceType.FILE,
          value: file.name,
          file: file,
          fileType: file.type,
          cloudinaryTitle: "", // Aseguramos que este campo exista como string vacío
        };

        if (file.type.startsWith("image/") || file.type === "application/pdf") {
          fileResource.preview = URL.createObjectURL(file);
        }

        newResources.push(fileResource);
      }

      if (newResources.length > 0) {
        setResources([...resources, ...newResources]);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const openFileExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeResource = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Recursos</h3>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => setShowUrlDialog(true)}
            type="button"
          >
            <LinkIcon className="h-4 w-4" />
            Agregar enlace
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={openFileExplorer}
            disabled={!canAddMoreFiles}
            type="button"
          >
            <Plus className="h-4 w-4" />
            Agregar Archivo {fileCount > 0 && `(${fileCount}/5)`}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      {resources.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {/* Sección para mostrar URLs primero */}{" "}
          {resources
            .filter((resource) => resource.type === ResourceType.URL)
            .map((resource) => (
              <Card
                key={resource.id}
                className="overflow-hidden border shadow-sm relative group h-[160px] py-0"
              >
                {/* Botón de eliminar */}
                <button
                  onClick={() => removeResource(resource.id)}
                  className="absolute top-2 right-2 z-10 bg-background cursor-pointer rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove resource"
                  disabled={isSubmitting}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Contenido de URL */}
                <div className="h-full bg-muted flex flex-col items-center justify-center p-4">
                  <LinkIcon className="h-6 w-6 text-blue-500" />
                  <p className="mt-3 text-sm text-center truncate max-w-full">
                    {typeof resource.value === "string"
                      ? resource.value
                      : "Enlace"}
                  </p>
                  <a
                    href={resource.value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-xs text-blue-600 hover:underline"
                  >
                    Visitar enlace
                  </a>
                </div>
              </Card>
            ))}
          {/* Sección para mostrar archivos después */}{" "}
          {resources
            .filter((resource) => resource.type === ResourceType.FILE)
            .map((resource) => (
              <Card
                key={resource.id}
                className="overflow-hidden border shadow-sm relative group h-[160px] py-0"
              >
                {/* Botón de eliminar */}
                <button
                  onClick={() => removeResource(resource.id)}
                  className="absolute top-2 right-2 z-10 bg-background cursor-pointer rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Remove resource"
                  disabled={isSubmitting}
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Icono de carga o check en la esquina inferior derecha */}
                {isSubmitting && (
                  <div className="absolute bottom-2 right-2 z-20">
                    {uploadProgress[resource.id] > 0 &&
                      uploadProgress[resource.id] < 100 ? (
                      <Loader2 className="h-8 w-8 animate-spin text-primary rounded-full p-1" />
                    ) : uploadProgress[resource.id] === 100 ? (
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full">
                        <svg
                          className="h-4 w-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    ) : uploadProgress[resource.id] === -1 ? (
                      <div className="relative group">
                        <Info className="h-6 w-6 text-red-500 bg-black/60 rounded-full p-1" />
                        {uploadErrors && uploadErrors[resource.id] && (
                          <div className="absolute bottom-full right-0 mb-2 p-2 bg-black/75 text-white text-xs rounded hidden group-hover:block w-48">
                            {uploadErrors[resource.id]}
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Vista previa de imágenes */}
                {(resource.preview &&
                  resource.file?.type.startsWith("image/")) ||
                  resource.fileType?.startsWith("image/") ||
                  resource.cloudinaryUrl?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={
                        resource.preview ||
                        resource.cloudinaryUrl ||
                        "/placeholder.svg"
                      }
                      alt={
                        typeof resource.value === "string"
                          ? resource.value
                          : "Imagen"
                      }
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <p className="text-white p-3 text-sm truncate w-full">
                        {typeof resource.value === "string"
                          ? resource.value
                          : resource.cloudinaryTitle || "Archivo"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full bg-muted flex flex-col items-center justify-center p-4">
                    {/* Indicador para mostrar recursos ya subidos */}
                    {resource.cloudinaryUrl && !resource.file && (
                      <div className="absolute top-2 left-2 z-10 bg-green-500/20 rounded-full p-1">
                        <svg
                          className="h-3 w-3 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={3}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}

                    {getFileIcon(resource.fileType)}
                    <p className="mt-3 text-sm text-center truncate max-w-full">
                      {typeof resource.value === "string"
                        ? resource.value
                        : resource.cloudinaryTitle || "Archivo"}
                    </p>

                    {resource.cloudinaryUrl ? (
                      <a
                        href={resource.cloudinaryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-xs text-blue-600 hover:underline"
                      >
                        Ver archivo
                      </a>
                    ) : (
                      resource.preview &&
                      resource.file?.type === "application/pdf" && (
                        <iframe
                          src={resource.preview}
                          title={
                            typeof resource.value === "string"
                              ? resource.value
                              : "Vista previa"
                          }
                          className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                      )
                    )}
                  </div>
                )}
              </Card>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dotted rounded-lg">
          <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="mt-3 text-sm font-medium">No hay recursos</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Los recursos subidos aparecerán aquí.
          </p>
        </div>
      )}

      {/* URL Dialog */}
      <Dialog
        open={showUrlDialog}
        onOpenChange={(open) => {
          setShowUrlDialog(open);
          if (!open) setUrlError(null);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar enlace</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Input
                type="url"
                placeholder="https://example.com"
                value={resourceUrl}
                onChange={(e) => {
                  setResourceUrl(e.target.value);
                  setUrlError(null);
                }}
              />
              {urlError && <p className="text-sm text-red-500">{urlError}</p>}
            </div>
            <Button
              onClick={addUrlResource}
              disabled={!resourceUrl}
              className="w-full"
              type="button"
            >
              Agregar enlace
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
