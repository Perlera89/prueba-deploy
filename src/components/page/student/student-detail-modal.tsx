import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Student } from "@/types";
import { Mail, CalendarDays, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface StudentDetailModalProps {
  student?: Student;
  isOpen: boolean;
  onClose: () => void;
}

export default function StudentDetailModal({
  student,
  isOpen,
  onClose,
}: StudentDetailModalProps) {
  if (!student) return null;

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Sin información";
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isActive = student.user.isActive;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Detalles del Estudiante</DialogTitle>
          <DialogDescription>
            Información del perfil del estudiante
          </DialogDescription>
        </DialogHeader>{" "}
        <div className="flex flex-col gap-5">
          <div className="flex flex-row items-start gap-8">
            <Avatar className="w-28 h-28">
              <AvatarImage
                src={student.imagePerfil || "/avatar-fallback.png"}
                alt={`${student.names} ${student.surnames}`}
              />
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold">
                {student.names} {student.surnames}
              </h2>
              <Badge
                variant={isActive ? "default" : "destructive"}
                className="mt-1 mb-2"
              >
                {isActive ? "Activo" : "Inactivo"}
              </Badge>
              <p className="text-muted-foreground">
                <span className="font-medium">
                  {student.studentCode || "No asignado"}
                </span>
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <p className="font-medium">
                {student.user?.email || student.email || "No disponible"}
              </p>
            </div>

            <div className="space-y-3 grid grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">Fecha de creación:</p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    {student.createdAt
                      ? formatDate(student.createdAt)
                      : "Sin información"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <p className="font-medium">Fecha de actualización:</p>
                </div>
                <div>
                  <p className="text-muted-foreground">
                    {student.createdAt
                      ? formatDate(student.updatedAt)
                      : "Sin información"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="mt-5">
          <Button onClick={onClose}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
