import {
  Book,
  MoreVertical,
  Calendar,
  EyeOff,
  Eye,
  Edit,
  Trash,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useCourseStore } from "@/store/course";
import { Module } from "@/types";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/auth";

interface ModuleCardProps {
  module: Module;
  isEditable?: boolean;
  role?: string;
  onEdit?: (moduleId: string) => void;
  onDelete?: (moduleId: string) => void;
  onToggleVisibility?: (moduleId: string) => void;
}

export function ModuleCard({
  module,
  onEdit,
  role = "manager",
  onDelete,
  onToggleVisibility,
}: ModuleCardProps) {
  const router = useRouter();
  const courseId = useCourseStore((state) => state.course.id);
  const profileId = useAuthStore((state) => state.user?.profileId);
  const myModule = module.instructor?.id === profileId;

  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-md cursor-pointer py-0"
      onClick={() => router.push(`/courses/${courseId}/${module.id}`)}
    >
      <CardContent className="px-0 mb-2">
        <div className="flex flex-col p-4 w-full">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Book className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center">
                  {module.title}
                </h3>
                <div
                  className="flex items-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mr-1">
                    <Badge
                      variant={module.isVisible ? "secondary" : "destructive"}
                    >
                      {module.isVisible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </Badge>
                  </div>
                  {(role === "manager" || myModule) && (
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
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
                          onClick={() => {
                            if (onToggleVisibility) {
                              onToggleVisibility(module.id);
                            }
                          }}
                        >
                          <EyeOff className="h-4 w-4 mr-2" />
                          {module.isVisible
                            ? "Ocultar módulo"
                            : "Mostrar módulo"}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => {
                            if (onEdit) {
                              onEdit(module.id);
                            }
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar módulo
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />
                        {
                          !module.isInstructor && (
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => {
                                if (onDelete) {
                                  onDelete(module.id);
                                }
                              }}
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Eliminar módulo
                            </DropdownMenuItem>
                          )
                        }
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              {module.moduleInfo?.description && (
                <p className="text-muted-foreground text-sm mt-1">
                  {module.moduleInfo.description}
                </p>
              )}
            </div>
          </div>

          <div className="h-px bg-border my-3"></div>

          <div className="flex flex-wrap items-center gap-4 justify-between">
            {module.instructor && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={
                      module.instructor.imagePerfil || "/avatar-fallback.png"
                    }
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
                      Instructor
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm px-3 py-1 rounded-md border">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{module.sectionsCount} secciones</span>
              </div>

              <div className="flex-1 min-w-[120px] max-w-[150px]">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    Progreso
                  </span>
                  <span className="text-xs font-medium">
                    {module.progress}%
                  </span>
                </div>
                <Progress value={module.progress} className="h-2" />
              </div>

              <div className="flex items-center">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
