"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInitials } from "@/utils/initials";

interface Instructor {
  id: string;
  names: string;
  surnames: string;
  title?: string;
  imagePerfil?: string;
}

interface InstructorSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function InstructorSelect({
  value,
  onChange,
  disabled = false,
}: InstructorSelectProps) {  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(false); // Cambio a false para usar datos de ejemplo directamente

  useEffect(() => {
    // Usamos datos de ejemplo en lugar de hacer una petición
    // Estos son los instructores que se mostrarán en el select
    const mockInstructors: Instructor[] = [
      {
        id: "1",
        names: "Carlos",
        surnames: "Martínez",
        title: "Dr.",
        imagePerfil: "/avatar-fallback.png"
      },
      {
        id: "2",
        names: "Ana",
        surnames: "López",
        title: "Dra.",
        imagePerfil: "/avatar-fallback.png"
      },
      {
        id: "3",
        names: "Miguel",
        surnames: "Rodríguez",
        title: "Mg.",
        imagePerfil: "/avatar-fallback.png"
      },
      {
        id: "4",
        names: "Laura",
        surnames: "Sánchez",
        title: "Lic.",
        imagePerfil: "/avatar-fallback.png"
      },
      {
        id: "5",
        names: "Javier",
        surnames: "Gonzalez",
        title: "Prof.",
        imagePerfil: "/avatar-fallback.png"
      }
    ];
    
    setInstructors(mockInstructors);
  }, []);

  // Función para obtener el nombre completo del instructor
  const getFullName = (instructor: Instructor) => {
    const title = instructor.title ? `${instructor.title} ` : "";
    return `${title}${instructor.names} ${instructor.surnames}`;
  };

  return (
    <Select
      value={value}
      onValueChange={onChange}
      disabled={disabled || loading}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Seleccionar instructor" />
      </SelectTrigger>
      <SelectContent>
        {instructors.length > 0 ? (
          instructors.map((instructor) => (
            <SelectItem key={instructor.id} value={instructor.id}>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage 
                    src={instructor.imagePerfil || "/avatar-fallback.png"} 
                    alt={getFullName(instructor)}
                  />
                  <AvatarFallback>
                    {getInitials(getFullName(instructor))}
                  </AvatarFallback>
                </Avatar>
                <span>{getFullName(instructor)}</span>
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no-instructors" disabled>
            {loading ? "Cargando instructores..." : "No hay instructores disponibles"}
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
}
