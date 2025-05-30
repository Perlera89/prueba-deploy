"use client";
import {
  Book,
  MoreVertical,
  EyeOff,
  Edit,
  Trash,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";
import { on } from "events";

interface ModuleInfo {
  description?: string;
  objectives?: any;
  methodology?: string;
  preRequisite?: string;
  weekDuration?: number;
}

interface Instructor {
  id: string;
  names: string;
  surnames: string;
  title?: string;
  imagePerfil?: string;
}

interface Module {
  id: string | number;
  title: string;
  progress: number;
  schedules?: string;
  instructor?: Instructor;
  moduleInfo?: ModuleInfo;
  isVisible?: boolean;
  courseId: string;
}

interface ModuleListItemProps {
  module: Module;
  isEditable?: boolean;
  onEdit?: (moduleId: string | number) => void;
  onDelete?: (moduleId: string | number) => void;
  onToggleVisibility?: (
    moduleId: string | number,
    currentVisibility: boolean
  ) => void;
}

export function ModuleListItem({
  module,
  isEditable = false,
  onEdit,
  onDelete,
  onToggleVisibility,
}: ModuleListItemProps) {
  const handleRowClick = () => {
    window.location.href = `/courses/${module.courseId}/modules/${module.id}`;
  };

  return (
    <TableRow
      onClick={handleRowClick}
      className="cursor-pointer hover:bg-muted/50"
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Book className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="font-medium flex items-center">
              {module.title}
              {module.isVisible === false && (
                <EyeOff className="ml-2 h-4 w-4 text-muted-foreground" />
              )}
            </div>
            {module.moduleInfo?.description && (
              <p className="text-sm text-muted-foreground line-clamp-1">
                {module.moduleInfo.description}
              </p>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        {module.instructor && (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={module.instructor.imagePerfil || "/avatar-fallback.png"}
                alt={`${module.instructor.names} ${module.instructor.surnames}`}
              />
              <AvatarFallback>
                {module.instructor.names.charAt(0)}
                {module.instructor.surnames.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">
                {module.instructor.names} {module.instructor.surnames}
              </div>
              {module.instructor?.title && (
                <div className="text-xs text-muted-foreground">
                  {module.instructor.title}
                </div>
              )}
            </div>
          </div>
        )}
      </TableCell>
      <TableCell>
        {module.moduleInfo?.weekDuration ? (
          <Badge variant="outline" className="rounded-md">
            {module.moduleInfo.weekDuration} secciones
          </Badge>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>
        <div className="w-full max-w-[100px]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">{module.progress}%</span>
          </div>
          <Progress value={module.progress} className="h-2" />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end">
          {isEditable && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Opciones del módulo</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleVisibility) {
                      onToggleVisibility(module.id, !!module.isVisible);
                    }
                  }}
                >
                  <EyeOff className="h-4 w-4 mr-2" />
                  {module.isVisible ? "Ocultar módulo" : "Mostrar módulo"}
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onEdit) {
                      onEdit(module.id);
                    }
                  }}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar módulo
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onDelete) {
                      onDelete(module.id);
                    }
                  }}
                >
                  <Trash className="h-4 w-4 mr-2" />
                  Eliminar módulo
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </TableCell>
    </TableRow>
  );
}
