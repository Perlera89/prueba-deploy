import Link from "next/link";
import {
  ArrowLeft,
  Edit,
  Plus,
  Trash,
  Users,
  Video,
  Info,
  FileText,
  MessageSquare,
  Calendar,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ContentTab from "@/components/page/module/tabs/content-tab";
import ForumTab from "@/components/page/module/tabs/forum-tab";
import GradesTab from "@/components/page/module/tabs/grades-tab";
import MembersTab from "@/components/page/module/tabs/members-tab";
import { useState } from "react";
import AlertDialogComponent from "../../display/alert-dialog";
import { useRouter } from "next/navigation";
import { getDayValue } from "@/utils/date";
import { ScheduleFormDialog } from "../courses/schedule-form-dialog";
import { MeetingLinkFormDialog } from "../courses/meeting-link-form";
import InfoTab from "./tabs/info-tab";
import { useModuleStore } from "@/store/module";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useAuthStore } from "@/store/auth";
import { useDeleteModule, useUpdateModule, useUpdateVisibilityModule } from "@/hooks/use-module";
import { ModuleDialog } from "./module-form";
import { ModuleFormValues } from "@/schema/module";
import { useUploadImage } from "@/hooks/use-updoad-image";



export default function ModuleContainer() {
  const router = useRouter();

  const { module, refetchedModule } = useModuleStore();
  const role = useAuthStore((state) => state.user?.role);
  const updateVisibilityModuleMutation = useUpdateVisibilityModule(module.id);
  const updateModuleMutation = useUpdateModule(module.id)
  const deleteModuleMutation = useDeleteModule(module.id)
  const [isOpenModuleDialog, setIsOpenModuleDialog] = useState(false);

  const [isOpenAddSheduleDialog, setIsOpenAddScheduleDialog] = useState(false);
  const [isOpenAddMeetingLinkDialog, setIsOpenAddMeetingLinkDialog] = useState(false);
  const [isOpenAlertDialog, setIsOpenAlertDialog] = useState(false);

  const handleEditModule = () => {
    setIsOpenModuleDialog(true);
  };
  const handleDeleteModule = async () => {
    await deleteModuleMutation
      .mutateAsync({ moduleId: module.id })
      .then(() => {
        setIsOpenAlertDialog(false);
        router.back();
      });
  };

  const handleVisibilitytoggle = async () => {
    await updateVisibilityModuleMutation.mutateAsync({ moduleId: module.id })
      .then(() => refetchedModule?.(true))
      .finally(() => refetchedModule?.(false));
  };

  const handleSaveUpdateModule = async (data: ModuleFormValues) => {
    const saveImage = await useUploadImage(data.picture as File)
      .then((res) => res)
      .catch(() => (typeof data.picture === "string" ? "" : data.picture));

    await updateModuleMutation
      .mutateAsync({
        module: {
          ...data,
          picture: saveImage,
        },
      })
      .then(() => {
        refetchedModule?.(true);
        setIsOpenModuleDialog(false);
      }).finally(() => refetchedModule?.(false));


  };

  return (
    <>
      <div className="w-full px-6">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Volver a Módulos
          </Button>
          <div className="flex items-center gap-2">
            {(module.isInstructor || role === "manager") && (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Acciones
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleVisibilitytoggle}>
                    {module.isVisible ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Ocultar
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Mostrar
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEditModule}>
                    <Edit className="h-4 w-4 mr-2" />
                    Editar Curso
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {!module.isInstructor && (
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setIsOpenAlertDialog(true)}
                    >
                      <Trash className="h-4 w-4 mr-2" />
                      Eliminar Módulo
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <Card className="mb-6 pt-0">
          <CardContent className="p-0">
            <div className="relative h-48 w-full  ">
              <Image
                src={module.picture.url || "/placeholder.svg"}
                alt={module.picture.title || "sin imagen"}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>

            <div className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2 justify-between">
                  <h2 className="text-xl font-bold">{module?.title}</h2>

                  <Badge variant={module.isVisible ? "secondary" : "destructive"}>
                    {module.isVisible ? (
                      <>
                        <Eye className="h-4 w-4" />
                        Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="h-4 w-4" />
                        Oculto
                      </>
                    )}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {module.meetingLink ? (
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" asChild>
                        <Link
                          href={module.meetingLink}
                          className="flex items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Video className="h-4 w-4 mr-2" />
                          Unirse a Clase Virtual
                        </Link>
                      </Button>
                      {module.isInstructor ||
                        (role === "manager" && (
                          <Button
                            onClick={() => setIsOpenAddMeetingLinkDialog(true)}
                            size="icon"
                            variant="ghost"
                          >
                            <Edit />
                          </Button>
                        ))}
                    </div>
                  ) : (
                    module.isInstructor ||
                    (role === "manager" && (
                      <Button
                        onClick={() => setIsOpenAddMeetingLinkDialog(true)}
                        size="sm"
                        variant="outline"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Crear Clase Virtual
                      </Button>
                    ))
                  )}
                </div>
              </div>
              <div className="mt-2 mb-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {module.description ? module.description : "No hay descripción disponible."}
                </p>
              </div>
              <Separator className="my-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="grid items-center">
                  <p className="font-medium">Instructor</p>
                  <p className="text-muted-foreground">
                    {module?.instructor?.title}&nbsp;
                    {module?.instructor?.names}&nbsp;
                    {module?.instructor?.surnames}&nbsp;
                  </p>
                </div>
                <div>
                  {(module.moduleSchedules?.length ?? 0) > 0 ? (
                    <>
                      <p className="flex gap-1 items-center transition-colors">
                        Horarios
                        {(module.isInstructor || role === "manager") && (
                          <Button
                            onClick={() => setIsOpenAddScheduleDialog(true)}
                            size="sm"
                            variant="ghost"
                          >
                            <Edit />
                          </Button>
                        )}
                      </p>
                      {module.moduleSchedules?.map((schedule) => (
                        <p
                          key={schedule.id}
                          className="text-muted-foreground flex gap-1 items-center"
                        >
                          <Calendar className="h-3 w-3 mr-2" />
                          {getDayValue(schedule.day)}&nbsp;
                          {schedule.startTime} - {schedule.endTime}
                        </p>
                      ))}
                    </>
                  ) : module.isInstructor || role === "manager" ? (
                    <Button
                      variant="ghost"
                      onClick={() => setIsOpenAddScheduleDialog(true)}
                    >
                      <Plus />
                      Agregar horario
                    </Button>
                  ) : (
                    "No hay horarios"
                  )}
                </div>
                <div>
                  <p className="text-muted-foreground">Progreso</p>
                  <div className="flex items-center gap-2">
                    <Progress value={module.progress} className="h-2 flex-1" />
                    <span className="font-medium">{module.progress}%</span>
                  </div>
                </div>
              </div>
            </div>
            <CardFooter>
              {isOpenAddSheduleDialog && (
                <ScheduleFormDialog
                  open={isOpenAddSheduleDialog}
                  onOpenChange={setIsOpenAddScheduleDialog}
                  initialData={{
                    schedules:
                      module.moduleSchedules?.map((schedule) => ({
                        day: schedule.day || "",
                        startTime: schedule.startTime || "",
                        endTime: schedule.endTime || "",
                      })) || [],
                  }}
                />
              )}
              {isOpenAlertDialog && (
                <AlertDialogComponent
                  title="Archivar Curso"
                  description="¿Estás seguro de que deseas archivar este curso? Esta acción no se puede deshacer."
                  onConfirm={handleDeleteModule}
                  openAlertDialog={isOpenAlertDialog}
                  setOpenAlertDialog={setIsOpenAlertDialog}
                />
              )}
              {isOpenAddMeetingLinkDialog && (
                <MeetingLinkFormDialog
                  open={isOpenAddMeetingLinkDialog}
                  onOpenChange={setIsOpenAddMeetingLinkDialog}
                  initialData={{
                    meetingLink: module.meetingLink || "",
                  }}
                />
              )}
            </CardFooter>
          </CardContent>
        </Card>

        <ModuleDialog
          isOpen={isOpenModuleDialog}
          setIsOpen={setIsOpenModuleDialog}
          module={module}
          onAction={handleSaveUpdateModule}
          mode="edit"
        />

        <Tabs defaultValue="content" className="mb-6">
          <div className="overflow-x-auto">
            <TabsList className="mb-1">
              <TabsTrigger value="content">
                <FileText />
                Contenido
              </TabsTrigger>
              {/* <TabsTrigger value="rating">
                <SquareCheckBig />
                Calificaciones
              </TabsTrigger> */}
              <TabsTrigger value="forum">
                <MessageSquare />
                Foro
              </TabsTrigger>
              <TabsTrigger value="members">
                <Users />
                Estudiantes
              </TabsTrigger>
              <TabsTrigger value="info">
                <Info />
                Información
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="content" className="space-y-6">
            <ContentTab />
          </TabsContent>

          <TabsContent value="rating">
            <GradesTab />
          </TabsContent>

          <TabsContent value="forum">
            <ForumTab />
          </TabsContent>

          <TabsContent value="members">
            <MembersTab />
          </TabsContent>

          <TabsContent value="info">
            <InfoTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
