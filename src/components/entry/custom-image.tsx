import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, ImageIcon, Trash2 } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ImageUploaderProps {
  value?: string | File | null | any;
  onChange?: (value: File | string | null) => void;
  onBlur?: () => void;
  maxSizeMB?: number;
  acceptedFileTypes?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  optional?: boolean;
  errorMessage?: string;
  placeholder?: string;
  mode?: "add" | "edit";
}

export function ImageUploader({
  value,
  onChange,
  onBlur,
  maxSizeMB = 5,
  acceptedFileTypes = "image/png, image/jpeg, image/gif",
  className,
  disabled = false,
  label = "Imagen",
  optional = false,
  errorMessage,
  placeholder = "Arrastra una imagen aquí o haz clic para seleccionar",
  mode = "add",
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [imageAdd, setImageAdd] = useState<boolean>(false);

  const imageUrl =
    mode === "add" || imageAdd
      ? typeof value === "string"
        ? value
        : value instanceof File
          ? URL.createObjectURL(value)
          : null
      : value?.url;



  const handleChange = (file: File) => {
    if (!file) {
      onChange?.("");
      return;
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(
        `El archivo es demasiado grande. El tamaño máximo es ${maxSizeMB}MB.`
      );
      return;
    }

    onChange?.(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleChange(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleButtonClick = () => {
    setImageAdd(true);
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    onChange?.("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {label && (
        <div className="text-sm font-medium">
          {label}{" "}
          {optional && (
            <span className="text-muted-foreground text-xs">(Opcional)</span>
          )}
        </div>
      )}

      <div
        className={cn(
          "border-2 border-dashed border-muted-foreground/25 rounded-md h-40 w-full relative overflow-hidden group transition-all",
          dragActive ? "border-primary" : "hover:border-primary/50",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleButtonClick}
      >
        {imageUrl ? (
          // Vista previa de la imagen
          <>
            <Image
              src={imageUrl.url || imageUrl}
              alt="Imagen seleccionada"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
            />
            {!disabled && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleButtonClick();
                  }}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Cambiar
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove();
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Eliminar
                </Button>
              </div>
            )}
          </>
        ) : (
          // Estado sin imagen
          <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground p-4">
            <UploadCloud className="h-10 w-10 mb-2" />
            <p className="text-sm font-medium text-center">{placeholder}</p>
            <p className="text-xs mt-1 text-center">
              PNG, JPG, GIF (Máx. {maxSizeMB}MB)
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-4"
              disabled={disabled}
            >
              Seleccionar imagen
            </Button>
          </div>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFileTypes}
        onChange={handleFileSelect}
        onBlur={onBlur}
        disabled={disabled}
        className="hidden"
      />
    </div>
  );
}
