"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DefaultOptionsModal } from "@/components/entry/default-image-modal";
import { ImageIcon, FileIcon, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

// Estructura simplificada para la API
type PictureData = {
  type: "image" | "color";
  name: string;
  value: string; // URL, base64 o código de color
};

interface CourseImageFormProps {
  onPictureSelected?: (picture: PictureData) => void;
  onValueChange?: (value: string) => void;
  fieldName?: string;
  initialValue?: string;
}

export function CourseImageForm({
  onPictureSelected,
  onValueChange,
  fieldName = "coursePicture",
  initialValue,
}: CourseImageFormProps) {
  // Estado principal usando la estructura simplificada
  const [picture, setPicture] = useState<PictureData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Procesar el valor inicial si existe
  useEffect(() => {
    if (initialValue) {
      try {
        const parsedValue = JSON.parse(initialValue) as PictureData;

        // Verificar que el valor tenga la estructura esperada
        if (
          parsedValue &&
          (parsedValue.type === "image" || parsedValue.type === "color") &&
          parsedValue.name !== undefined &&
          parsedValue.value !== undefined
        ) {
          setPicture(parsedValue);

          // Si es una imagen, precargarla
          if (parsedValue.type === "image") {
            setIsImageLoading(true);
          }
        }
      } catch (error) {
        console.error("Error al procesar el valor inicial:", error);
      }
    }
  }, [initialValue]);

  // Convertir archivo a base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (file: File | null) => {
    if (file) {
      setIsProcessing(true);
      try {
        // Convertir la imagen a base64
        const base64 = await fileToBase64(file);

        // Crear el objeto simplificado
        const newPicture: PictureData = {
          type: "image",
          name: file.name,
          value: base64,
        };

        setPicture(newPicture);

        // Convertir a JSON para el campo oculto
        const formValue = JSON.stringify(newPicture);

        if (onValueChange) {
          onValueChange(formValue);
        }

        if (onPictureSelected) {
          onPictureSelected(newPicture);
        }
      } catch (error) {
        console.error("Error al procesar la imagen:", error);
        toast.error(
          "Error al procesar la imagen. Asegúrate de que sea un archivo válido."
        );
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleSelectBackground = (
    type: "image" | "color",
    value: string,
    name?: string
  ) => {
    // Crear el objeto simplificado
    const newPicture: PictureData = {
      type,
      name: name || "",
      value,
    };

    setPicture(newPicture);

    // Convertir a JSON para el campo oculto
    const formValue = JSON.stringify(newPicture);

    if (onValueChange) {
      onValueChange(formValue);
    }

    if (onPictureSelected) {
      onPictureSelected(newPicture);
    }

    setIsModalOpen(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        handleImageUpload(file);
      } else {
        toast.error(
          "Solo se permiten archivos de imagen. Por favor, intenta nuevamente."
        );
      }
    }
  };

  // Manejar errores de carga de imagen
  const handleImageError = () => {
    setIsImageLoading(false);
    toast.error(
      "Error al cargar la imagen. Asegúrate de que sea un archivo válido."
    );
  };

  // Manejar carga exitosa de imagen
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  // Renderizar el contenido del área de carga según el tipo de fondo seleccionado
  const renderUploaderContent = () => {
    if (isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-sm font-medium">Procesando imagen...</p>
        </div>
      );
    }

    if (!picture) {
      // No mostrar nada por defecto
      return (
        <>
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-5">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-1 max-w-xs text-center">
            <p className="text-sm font-medium">
              Arrastra y suelta una imagen o haz clic para seleccionar
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG o GIF (máximo 5MB)
            </p>
          </div>
        </>
      );
    }

    if (picture.type === "image") {
      return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}
          <img
            src={picture.value || "/placeholder.svg"}
            alt={picture.name || "Vista previa de la imagen"}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
            <div className="bg-background/90 dark:bg-background/80 px-4 py-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              <span className="text-sm font-medium">Cambiar imagen</span>
            </div>
          </div>
        </div>
      );
    } else if (picture.type === "color") {
      // Mostrar solo el icono de fallback sin texto adicional
      return (
        <div
          className="w-full h-full flex items-center justify-center"
          style={{ backgroundColor: picture.value }}
        >
          <div className="bg-background/90 dark:bg-background/80 p-5 rounded-full shadow-sm transform transition-transform duration-300 hover:scale-110">
            <ImageIcon className="h-10 w-10 text-foreground" />
          </div>
        </div>
      );
    }
  };

  // Obtener el valor JSON para el campo oculto
  const getFormValue = (): string => {
    if (!picture) return "";
    return JSON.stringify(picture);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="course-image" className="text-base font-medium">
            Fondo del curso
          </Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsModalOpen(true)}
          >
            Ver colores predeterminados
          </Button>
        </div>

        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center h-72 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? "border-primary bg-primary/5 scale-[1.01]"
              : !picture
                ? "border-muted hover:border-muted-foreground/50 hover:bg-muted/50"
                : picture.type === "image"
                  ? "border-green-500/50 bg-green-50/50 hover:border-green-500 hover:bg-green-50 dark:border-green-500/30 dark:bg-green-900/10 dark:hover:bg-green-900/20"
                  : "border-primary/50 hover:border-primary"
          }`}
          onClick={() => document.getElementById("course-image-input")?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {renderUploaderContent()}
        </div>

        {/* Información del fondo seleccionado */}
        {picture && (
          <div className="bg-muted/50 dark:bg-muted/20 rounded-lg p-3 mt-3 flex items-start gap-3">
            {picture.type === "color" ? (
              <div
                className="w-10 h-10 rounded-md flex-shrink-0"
                style={{ backgroundColor: picture.value }}
              ></div>
            ) : (
              <div className="w-10 h-10 rounded-md bg-background flex items-center justify-center flex-shrink-0">
                <FileIcon className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">
                {picture.type === "color"
                  ? `Color: ${picture.name}`
                  : picture.name || "Imagen sin nombre"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {picture.type === "color"
                  ? picture.value
                  : picture.value.startsWith("data:")
                    ? "Imagen subida"
                    : "Imagen externa"}
              </p>
            </div>
          </div>
        )}

        <input
          id="course-image-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
            }
          }}
        />

        {/* Campo oculto para almacenar el valor del fondo como string */}
        <Input type="hidden" name={fieldName} value={getFormValue()} readOnly />
      </div>

      <DefaultOptionsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSelectBackground={(type, value, name) => {
          // Convertir los tipos antiguos al formato simplificado
          const simplifiedType = type === "color" ? "color" : "image";
          handleSelectBackground(simplifiedType, value, name);
        }}
      />
    </div>
  );
}
