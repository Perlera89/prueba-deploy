import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddAnnouncementDialog from "./announcement-form";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Info,
  MoreHorizontal,
  Plus,
  Trash,
} from "lucide-react";
import {
  useFetchAnnouncements,
  useDeleteAnnouncement,
  useSaveAnnouncement,
} from "@/hooks/use-announcement";
import { useModuleStore } from "@/store/module";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Announcement, AnnouncementPriority } from "@/types";
import dayjs from "dayjs";
import { useAnnouncementStore } from "@/store/announcement";
import AlertDialogComponent from "@/components/display/alert-dialog";
import { truncateText } from "@/utils/truncate-text";
import AnnouncementSkeleton from "../courses/skeleton/announcement-skeleton";
import LoaderSpin from "@/components/display/loader-spin";
import { AnnouncementFormData } from "@/schema/announcement";
import { useAuthStore } from "@/store/auth";

export default function AnnouncementCard() {
  const moduleId = useModuleStore((state) => state.module.id);
  const isInstructor = useModuleStore((state) => state.module.isInstructor);
  const role = useAuthStore((state) => state.user?.role);

  const {
    isAddAnnouncementDialogOpen,
    setIsAddAnnouncementDialogOpen,
    setAnnouncement,
  } = useAnnouncementStore();
  const [expandedAnnouncements, setExpandedAnnouncements] = useState<string[]>(
    []
  );
  const [isOpenAlertDialogOpen, setIsOpenAlertDialogOpen] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [announcementId, setAnnouncementId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const LIMIT = 10;

  const { data: fetchedAnnouncements = [], isLoading } = useFetchAnnouncements(
    moduleId,
    currentPage,
    LIMIT
  );

  const saveAnnouncementMutation = useSaveAnnouncement(
    moduleId,
    currentPage,
    LIMIT
  );
  useEffect(() => {
    if (fetchedAnnouncements.length > 0) {
      if (currentPage === 1) {
        setAllAnnouncements(fetchedAnnouncements);
      } else {
        setAllAnnouncements((prev) => [...prev, ...fetchedAnnouncements]);
      }

      setHasMore(fetchedAnnouncements.length === LIMIT);
    } else if (fetchedAnnouncements.length === 0 && currentPage > 1) {
      setHasMore(false);
    }
  }, [fetchedAnnouncements, currentPage, LIMIT]);

  const handleSaveAnnouncement = async (data: AnnouncementFormData) => {
    setCurrentPage(1);
    await saveAnnouncementMutation
      .mutateAsync({
        announcement: data,
      })
      .then(() => {
        setIsAddAnnouncementDialogOpen(false);
      });
  };

  const deleteAnnouncementMutation = useDeleteAnnouncement(
    moduleId,
    currentPage,
    LIMIT
  );

  const toggleAnnouncementExpansion = (announcementId: string) => {
    setExpandedAnnouncements((prev) =>
      prev.includes(announcementId)
        ? prev.filter((id) => id !== announcementId)
        : [...prev, announcementId]
    );
  };

  const handleEditAnnouncement = (announcement: any) => {
    setAnnouncement(announcement);
    setIsAddAnnouncementDialogOpen(true);
    setIsOpenMenu(false);
  };

  const handleDeleteAnnouncement = (id: any) => {
    setCurrentPage(1);
    deleteAnnouncementMutation.mutateAsync({
      announcementId: id,
    });
    setIsAddAnnouncementDialogOpen(false);
  };

  const loadMoreAnnouncements = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <>
      {isLoading && currentPage === 1 ? (
        <AnnouncementSkeleton />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Anuncios del Módulo</CardTitle>
          </CardHeader>
          <CardContent>
            {allAnnouncements.length > 0 ? (
              <>
                <div className="space-y-4">
                  {allAnnouncements.map((announcement) => (
                    <div
                      key={announcement.id}
                      className="border-b border-border pb-3 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {announcement.type ===
                            AnnouncementPriority.INFORMATION && (
                            <div
                              className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0"
                              title="Información"
                            />
                          )}
                          {announcement.type === AnnouncementPriority.LOW && (
                            <div
                              className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"
                              title="Bajo"
                            />
                          )}
                          {announcement.type ===
                            AnnouncementPriority.MEDIUM && (
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0"
                              title="Normal"
                            />
                          )}
                          {announcement.type === AnnouncementPriority.HIGH && (
                            <div
                              className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"
                              title="Alto"
                            />
                          )}
                          {announcement.type ===
                            AnnouncementPriority.URGENT && (
                            <div
                              className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0"
                              title="Urgente"
                            />
                          )}
                          <p className="font-medium text-sm">
                            {announcement.title}
                          </p>
                        </div>
                        {(isInstructor || "manager") && (
                          <DropdownMenu
                            open={
                              isOpenMenu && announcementId === announcement.id
                            }
                            onOpenChange={(open) => {
                              setIsOpenMenu(open);
                              if (open) setAnnouncementId(announcement.id);
                            }}
                          >
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEditAnnouncement(announcement)
                                }
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                variant="destructive"
                                onClick={() => {
                                  setAnnouncementId(announcement.id);
                                  setIsOpenMenu(false);

                                  setIsOpenAlertDialogOpen(true);
                                }}
                              >
                                <Trash className="h-4 w-4 mr-2" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                      <div className="mt-1">
                        <p className="text-xs text-muted-foreground">
                          {expandedAnnouncements.includes(announcement.id)
                            ? announcement.description
                            : truncateText(announcement.description, 100)}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>
                            {dayjs(announcement.updatedAt).format(
                              "DD MMM, HH:mm"
                            )}
                          </span>
                        </div>
                        {announcement.description.length > 100 && (
                          <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 flex items-center gap-1"
                            onClick={() =>
                              toggleAnnouncementExpansion(announcement.id)
                            }
                          >
                            {expandedAnnouncements.includes(announcement.id) ? (
                              <>
                                <span>Ver menos</span>
                                <ChevronUp className="h-3 w-3" />
                              </>
                            ) : (
                              <>
                                <span>Leer más</span>
                                <ChevronDown className="h-3 w-3" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {hasMore && (
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={loadMoreAnnouncements}
                      disabled={isLoading}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {isLoading && currentPage > 1 ? (
                        <LoaderSpin title="Cargando" />
                      ) : (
                        "Ver 5 más"
                      )}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
                <Info className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <h3 className="mt-3 text-sm font-medium">No hay anuncios</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Los anuncios importantes del curso aparecerán aquí.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            {(isInstructor || role === "manager") && (
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setIsAddAnnouncementDialogOpen(true)}
              >
                <Plus />
                Crear Anuncio
              </Button>
            )}
            {isAddAnnouncementDialogOpen && (
              <AddAnnouncementDialog onSubmit={handleSaveAnnouncement} />
            )}{" "}
            {isOpenAlertDialogOpen && (
              <AlertDialogComponent
                openAlertDialog={isOpenAlertDialogOpen}
                setOpenAlertDialog={setIsOpenAlertDialogOpen}
                title="Eliminar Anuncio"
                description="¿Estás seguro de que deseas eliminar este anuncio? Esta acción no se puede deshacer."
                onConfirm={() => handleDeleteAnnouncement(announcementId)}
              />
            )}
          </CardFooter>
        </Card>
      )}
    </>
  );
}
