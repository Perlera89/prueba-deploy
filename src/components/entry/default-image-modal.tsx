"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

type BackgroundType = "uploadedImage" | "defaultImage" | "color";

type DefaultCourseImage = {
  id: string;
  url: string;
  name: string;
  description: string;
};

type DefaultColor = {
  id: string;
  value: string;
  name: string;
};

// Colores predeterminados
const defaultColors: DefaultColor[] = [
  { id: "color1", value: "#6366f1", name: "Índigo" },
  { id: "color2", value: "#0ea5e9", name: "Azul cielo" },
  { id: "color3", value: "#10b981", name: "Verde esmeralda" },
  { id: "color4", value: "#f59e0b", name: "Ámbar" },
  { id: "color5", value: "#ef4444", name: "Rojo" },
  { id: "color6", value: "#8b5cf6", name: "Violeta" },
  { id: "color7", value: "#ec4899", name: "Rosa" },
  { id: "color8", value: "#14b8a6", name: "Verde azulado" },
];

interface DefaultOptionsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectBackground: (
    type: BackgroundType,
    value: string,
    name?: string
  ) => void;
}

export function DefaultOptionsModal({
  open,
  onOpenChange,
  onSelectBackground,
}: DefaultOptionsModalProps) {
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);

  /*const handleSelectImage = (image: DefaultCourseImage) => {
    onSelectBackground("defaultImage", image.url, image.name);
    onOpenChange(false);
  };*/

  const handleSelectColor = (color: DefaultColor) => {
    setSelectedColorId(color.id);
    onSelectBackground("color", color.value, color.name);
    onOpenChange(false);
  };

  // Resetear la selección al abrir el modal
  useEffect(() => {
    if (open) {
      setSelectedColorId(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Elige un color</DialogTitle>
          <DialogDescription>
            Selecciona un color para usar como fondo de tu curso.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 gap-4">
          {defaultColors.map((color) => (
            <div
              key={color.id}
              className={`relative rounded-lg overflow-hidden border cursor-pointer transition-all duration-300 hover:shadow-md ${selectedColorId === color.id
                ? "border-primary ring-2 ring-primary ring-opacity-30 shadow-md"
                : "border-border hover:border-primary"
                }`}
              onClick={() => handleSelectColor(color)}
            >
              <div
                className="w-full h-24 flex items-center justify-center text-white font-medium relative transition-transform duration-300 hover:scale-105"
                style={{ backgroundColor: color.value }}
              >
                {selectedColorId === color.id && (
                  <div className="absolute top-2 right-2 bg-background dark:bg-background/90 text-primary rounded-full p-1 shadow-sm">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                {color.name}
              </div>
              <div className="p-2 bg-background text-center">
                <p className="text-xs text-muted-foreground">{color.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
