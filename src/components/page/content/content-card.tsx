import {
  Album,
  ClipboardList,
  Clock,
  Edit,
  Eye,
  EyeOff,
  FileText,
  MoreVertical,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Content, ContentType } from "@/types";
import { useState } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { getFileIcon } from "@/utils/material";
import { truncateText } from "@/utils/truncate-text";
import { MarkdownRenderer } from "@/components/display/markdown-renderer";
import {
  useUpdateVisibilityContent,
  useDeleteContent,
} from "@/hooks/use-content";
import { useCourseStore } from "@/store/course";
import { useModuleStore } from "@/store/module";
import AlertDialogComponent from "@/components/display/alert-dialog";
import { useAuthStore } from "@/store/auth";
import { useContentStore } from "@/store/content";
import { useRouter } from "next/navigation";

interface ContentCardProps {
  content: Content;
}

export default function ContentCard({ content }: ContentCardProps) {
  const router = useRouter();
  const [expandedResourceId, setExpandedResourceId] = useState<string | null>(
    null
  );
  const [openDeleteAlertDialog, setOpenDeleteAlertDialog] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const courseId = useCourseStore((state) => state.course.id);
  const moduleId = useModuleStore((state) => state.module.id);
  const isInstructor = useModuleStore((state) => state.module.isInstructor);
  const role = useAuthStore((state) => state.user?.role);
  const { setContentType } = useContentStore();

  const updateVisibilityContentMutation = useUpdateVisibilityContent();
  const deleteContentMutation = useDeleteContent();

  const toggleResourcePreview = (materialId: string) => {
    setExpandedResourceId(
      expandedResourceId === materialId ? null : materialId
    );
  };

  const renderContentTypeIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <ClipboardList className="h-4 w-4 text-orange-500" />;
      case "material":
        return <Album className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleVisibilityToggle = async (
    contentId: string,
    contentType: ContentType
  ) => {
    setOpenPopover(false);
    await updateVisibilityContentMutation.mutateAsync({
      contentId,
      contentType,
    });
  };

  const handleDeleteContent = async (
    materialId: string,
    contentType: ContentType
  ) => {
    setOpenPopover(false);
    await deleteContentMutation.mutateAsync({
      contentId: materialId,
      contentType,
    });
  };

  const handleEditContent = () => {
    setContentType(content.contentType);
    router.push(`/courses/${courseId}/${moduleId}/edit-content/${content.id}`);
  };

  const handleViewContent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setContentType(content.contentType);
    router.push(`/courses/${courseId}/${moduleId}/${content.id}`);
  };

  return (
    <div
      className={`p-4 flex flex-col hover:bg-muted/30 transition-colors cursor-pointer group ${content.isVisible ? "" : "opacity-75"}`}
      onClick={() => toggleResourcePreview(content.id)}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {(() => {
            const iconElement = renderContentTypeIcon(content.contentType);
            const colorMatch =
              iconElement.props.className.match(/text-(\w+)-500/);
            const color = colorMatch ? colorMatch[1] : "gray";

            return (
              <div className={`bg-${color}-500/20 p-1.5 rounded-md`}>
                {iconElement}
              </div>
            );
          })()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex gap-2 items-center">
                <div
                  className="font-medium text-sm hover:underline"
                  onClick={(e) => handleViewContent(e)}
                >
                  {content.title}
                </div>
                {!content.isVisible && (
                  <Badge variant="outline">
                    <EyeOff className="h-4 w-4" />
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {content.contentType === "assignment" ? (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      Entrega:&nbsp;
                      {dayjs(content.assignment?.dueDate).format("D [de] MMMM")}
                      &nbsp;•&nbsp;
                      {dayjs(content.assignment?.dueDate).format("HH:mm")}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>
                      Publicado:&nbsp;
                      {dayjs(content.createdAt)
                        .locale("es")
                        .format("D [de] MMMM YYYY")}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center gap-1">
                {content.assignment?.score !== undefined &&
                  (content.assignment?.score > 0 ? (
                    <Badge
                      variant="outline"
                      className="bg-blue-500/10 text-blue-500 border-blue-500/20"
                    >
                      {content.assignment?.score} pts
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="bg-gray-500/10 text-gray-500 border-gray-500/20"
                    >
                      Sin evaluación
                    </Badge>
                  ))}
              </div>
              <div
                className="flex items-center gap-2 ml-2"
                onClick={(e) => e.stopPropagation()}
              >
                {(isInstructor || role === "manager") && (
                  <DropdownMenu
                    open={openPopover}
                    onOpenChange={setOpenPopover}
                    modal={false}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleVisibilityToggle(
                            content.id,
                            content.contentType
                          )
                        }
                      >
                        {content.isVisible ? (
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
                      <DropdownMenuItem onClick={handleEditContent}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Contenido
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setOpenDeleteAlertDialog(true)}
                        variant="destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar Contenido
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {expandedResourceId === content.id && (
        <div className="mt-2 ml-8 p-3 rounded-md text-muted-foreground border">
          <div className="text-sm">
            <MarkdownRenderer>{content.description}</MarkdownRenderer>
          </div>

          {content.resources && content.resources.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 my-2">
              {content.resources.map((resource, idx) => (
                <div
                  key={idx}
                  className="bg-muted rounded-md p-2 gap-1 flex items-center text-xs"
                >
                  {getFileIcon(resource.fileExtension)}
                  <span>{truncateText(resource.title, 15)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {openDeleteAlertDialog && (
        <AlertDialogComponent
          openAlertDialog={openDeleteAlertDialog}
          setOpenAlertDialog={setOpenDeleteAlertDialog}
          title="Eliminar Material"
          description="¿Estás seguro de que deseas eliminar este material? Esta acción no se puede deshacer."
          onConfirm={() => handleDeleteContent(content.id, content.contentType)}
        />
      )}
    </div>
  );
}
