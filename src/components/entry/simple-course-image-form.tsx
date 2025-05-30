"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "@/route/api";
import { Loader2, UploadIcon } from "lucide-react";

// Estructura para datos de imagen local
type ImageData = {
  type: "image";
  name: string;
  value: string; // URL o base64 para vista previa
};

// Estructura para datos de imagen en Cloudinary
type CloudinaryImageData = {
  url: string;
  title: string;
  fileExtension: string;
};

interface SimpleCourseImageFormProps {
  onValueChange?: (value: any) => void;
  fieldName?: string;
  initialValue?: string;
}

export function SimpleCourseImageForm({
  onValueChange,
  initialValue,
}: SimpleCourseImageFormProps) {
  const [image, setImage] = useState<ImageData | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [cloudinaryData, setCloudinaryData] =
    useState<CloudinaryImageData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false); // Procesar el valor inicial si existe
  useEffect(() => {
    // Si el valor inicial es falsy (null, undefined, string vacío) o es "null" como string, no hacer nada
    if (initialValue && initialValue !== "null") {
      try {
        const parsedValue = JSON.parse(initialValue);

        if (parsedValue) {
          if (parsedValue.type === "image" && parsedValue.value) {
            // Formato anterior
            setImage(parsedValue);
            setIsImageLoading(true);
          } else if (parsedValue.url) {
            // Formato Cloudinary
            setCloudinaryData(parsedValue);
            setImage({
              type: "image",
              name: parsedValue.title || "Imagen del curso",
              value: parsedValue.url,
            });
            setIsImageLoading(true);
          }
          // No llamamos a onValueChange aquí para evitar bucles infinitos
        }
      } catch (error) {
        console.error("Error al procesar el valor inicial:", error);
        // No llamamos a onValueChange aquí para evitar bucles infinitos
      }
    }
    // Eliminamos la llamada a onValueChange cuando initialValue es falsy
  }, [initialValue]);

  // Convertir archivo a base64 para vista previa
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Subir imagen a Cloudinary
  const uploadImageToCloudinary = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileType", "image");

      const uploadResponse = await api.post(
        "/resources/upload-file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const {
        url,
        title,
        type: fileExtension,
      } = uploadResponse.data.data.resource;

      return {
        url,
        title,
        fileExtension,
      };
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      toast.error("Error al subir la imagen", {
        description:
          "No se pudo cargar la imagen. Por favor, intenta de nuevo.",
      });
      throw error;
    }
  };
  const handleImageSelection = async (file: File | null) => {
    if (file) {
      setIsProcessing(true);
      try {
        // Guardar el archivo para subirlo después
        setSelectedFile(file);

        // Convertir a base64 solo para vista previa
        const base64 = await fileToBase64(file);

        // Crear vista previa de la imagen
        const newImage: ImageData = {
          type: "image",
          name: file.name,
          value: base64,
        };

        setImage(newImage);

        // Subir la imagen a Cloudinary
        const cloudinaryResult = await uploadImageToCloudinary(file);

        setCloudinaryData(cloudinaryResult);

        // Pasar el objeto cloudinaryResult al formulario principal
        if (onValueChange) {
          onValueChange(cloudinaryResult);
        }
      } catch (error) {
        console.error("Error al procesar la imagen:", error);
        toast.error(
          "Error al procesar la imagen. Asegúrate de que sea un archivo válido."
        );

        // Si hay un error, no enviamos null para evitar posibles bucles
        // Solo limpiamos el estado local
        setImage(null);
        setCloudinaryData(null);
      } finally {
        setIsProcessing(false);
      }
    }
    // Eliminamos el caso donde se llama a onValueChange(null) cuando no hay archivo
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
        handleImageSelection(file);
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

  return (
    <div className="w-full h-full">
      <div
        className={`w-full h-full border rounded-lg overflow-hidden transition-all duration-300 ${isDragging
          ? "border-primary bg-primary/5"
          : !image
            ? "border-dashed border-muted-foreground/30 hover:border-muted-foreground/60 bg-muted/30"
            : "border-none"
          }`}
        onClick={() => document.getElementById("course-image-input")?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isProcessing ? (
          <div className="h-full flex flex-col items-center justify-center">
            <Loader2 className="h-6 w-6 text-primary animate-spin mb-2" />
            <p className="text-xs text-muted-foreground">Procesando...</p>
          </div>
        ) : !image ? (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <UploadIcon className="h-6 w-6 text-muted-foreground mb-2" />
            <p className="text-xs text-center text-muted-foreground">
              Arrastra una imagen o haz clic para seleccionar
            </p>
          </div>
        ) : (
          <div className="relative h-full w-full">
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
              </div>
            )}
            <img
              src={image.value}
              alt="Vista previa"
              className="w-full h-full object-cover"
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
              <div className="bg-primary text-primary-foreground text-xs py-1 px-3 rounded">
                Cambiar
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      <input
        id="course-image-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImageSelection(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
