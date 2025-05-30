"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  value?: File;
  onChange: (file?: File) => void;
  disabled?: boolean;
  initials?: string;
  existingUrl?: string;
}

export function ImageUpload({
  onChange,
  disabled,
  existingUrl,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(existingUrl || null);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  useEffect(() => {
    if (existingUrl) {
      setPreview(existingUrl);
    }
  }, [existingUrl]);

  return (
    <div className="flex justify-center">
      <div
        className={cn(
          "relative w-24 h-24 rounded-full bg-muted flex items-center justify-center cursor-pointer transition-all duration-200",
          isHovering && !disabled && "shadow-lg",
          !isHovering && "shadow-md",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {preview ? (
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src={preview || "/placeholder.svg"}
              alt="Vista previa"
              fill
              className="object-cover"
            />

            {isHovering && !disabled && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200">
                <Camera className="h-6 w-6 text-white" />
              </div>
            )}

            {!disabled && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-destructive text-destructive-foreground rounded-full p-1 transform translate-x-1/4 -translate-y-1/4 hover:bg-destructive/90 transition-colors"
                aria-label="Eliminar imagen"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        ) : (
          <>
            <Camera className="h-6 w-6 text-muted-foreground" />
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
