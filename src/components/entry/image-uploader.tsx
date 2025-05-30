"use client";

import type React from "react";

import { useState, useRef } from "react";
import { ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ImageUploaderProps {
  currentImage?: string;
  onImageSelected: (file: File | null) => void;
  maxSizeMB?: number;
  acceptedTypes?: string;
}

export function ImageUploader({
  currentImage,
  onImageSelected,
  maxSizeMB = 5,
  acceptedTypes = "image/*",
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      validateAndProcessFile(file);
    }
  };

  const validateAndProcessFile = (file: File) => {
    // Validar tamaño
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(
        `El archivo es demasiado grande. El tamaño máximo es ${maxSizeMB}MB.`
      );
      return;
    }

    // Validar tipo
    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten archivos de imagen.");
      return;
    }

    onImageSelected(file);
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
      validateAndProcessFile(file);
    }
  };

  return (
    <div className="relative">
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center h-64 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : currentImage
              ? "border-green-500/50 bg-green-50/50 hover:border-green-500 hover:bg-green-50 dark:border-green-500/30 dark:bg-green-900/10 dark:hover:bg-green-900/20"
              : "border-muted hover:border-muted-foreground/50 hover:bg-muted/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {currentImage ? (
          <div className="relative w-full h-full">
            <img
              src={currentImage || "/placeholder.svg"}
              alt="Vista previa de la imagen"
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
              <span className="bg-background text-foreground px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                Cambiar imagen
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">
                Arrastra y suelta una imagen o haz clic para seleccionar
              </p>
              <p className="text-xs text-muted-foreground">
                PNG o JPG (máximo {maxSizeMB}MB)
              </p>
            </div>
          </>
        )}
      </div>

      <Input
        id="course-image"
        type="file"
        accept={acceptedTypes}
        className="hidden"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
    </div>
  );
}
