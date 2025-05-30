import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { getInitials } from "@/utils/initials";
import dayjs from "dayjs";
import { Reply } from "@/types";
import { Button } from "../../../ui/button";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";
import { useAuthStore } from "@/store/auth";
import { useDeleteReply } from "@/hooks/forum/use-reply";
import AlertDialogComponent from "../../../display/alert-dialog";
import { MarkdownRenderer } from "../../../display/markdown-renderer";

interface ReplyProps {
  forumId: string;
  reply?: Reply;
  onEdit?: (replyId: string, content: string) => void;
}

export function DiscussionReply({ onEdit, forumId, reply }: ReplyProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const user = useAuthStore((state) => state.user);

  const deleteReplyMutation = useDeleteReply();
  const isAuthor = user?.profileId === reply?.author.id;
  const isTeacher = reply?.author?.role === "teacher";
  const isCurrentUser = user?.profileId === reply?.author.id;

  const handleEdit = () => {
    if (reply?.id && reply?.reply && onEdit) {
      onEdit(reply.id, reply.reply);
    }
  };

  const handleDelete = async () => {
    await deleteReplyMutation.mutateAsync({
      replyId: reply?.id || "",
      forumId: forumId,
    });
    setIsOpenConfirm(false);
  };

  return (
    <div className="group border rounded-md mb-4 hover:shadow-sm transition-shadow">
      <div className="p-4">
        <div className="flex justify-between mb-3">
          {/* Información del autor y fecha */}
          <div className="flex items-center gap-2">
            <Avatar className="h-7 w-7">
              {reply?.author?.profileImage ? (
                <AvatarImage src={reply?.author?.profileImage} alt="" />
              ) : (
                <AvatarFallback>
                  {getInitials(
                    `${reply?.author?.name || ""} ${reply?.author?.lastName || ""}`
                  )}
                </AvatarFallback>
              )}
            </Avatar>

            <div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">
                  {isCurrentUser
                    ? `${reply?.author?.name || ""} ${reply?.author?.lastName || ""} (Tú)`
                    : `${reply?.author?.name || ""} ${reply?.author?.lastName || ""}`}
                </span>
                <span
                  className={`text-xs px-1.5 rounded ${isTeacher ? "bg-primary/10 text-primary" : "bg-muted"}`}
                >
                  {isTeacher ? "Profesor" : "Estudiante"}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                {reply?.createdAt
                  ? dayjs(reply?.createdAt).fromNow()
                  : "enviando..."}
                {reply?.wasEdited && (
                  <span className="ml-1 italic">· editado</span>
                )}
              </div>
            </div>
          </div>

          {/* Menú de opciones */}
          {isAuthor && !reply?.isDeleted && (
            <DropdownMenu
              open={isMenuOpen}
              onOpenChange={setIsMenuOpen}
              modal={false}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[120px]">
                <DropdownMenuItem
                  onClick={handleEdit}
                  className="cursor-pointer text-xs"
                >
                  <Edit2 className="h-3.5 w-3.5 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setIsOpenConfirm(true)}
                  className="text-destructive cursor-pointer text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Contenido */}
        {reply?.isDeleted ? (
          <p className="italic text-muted-foreground text-sm">
            Este mensaje ha sido eliminado.
          </p>
        ) : (
          <div className="prose prose-sm max-w-none">
            <MarkdownRenderer>{reply?.reply}</MarkdownRenderer>
          </div>
        )}
      </div>

      <AlertDialogComponent
        title="Eliminar respuesta"
        description="¿Estás seguro de que deseas eliminar esta respuesta? Esta acción no se puede deshacer."
        onConfirm={handleDelete}
        openAlertDialog={isOpenConfirm}
        setOpenAlertDialog={setIsOpenConfirm}
      />
    </div>
  );
}
