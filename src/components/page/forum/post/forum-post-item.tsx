// components/forum/ForumPostItem.tsx
import { Post } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Edit2,
  Trash2,
  MoreVertical,
  EyeOff,
  Eye,
  CalendarDays,
  Lock,
  Unlock,
} from "lucide-react";
import { getInitials } from "@/utils/initials";
import dayjs from "dayjs";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NewDiscussionDialog } from "./forum-form";
import { useAuthStore } from "@/store/auth";
import AlertDialogComponent from "@/components/display/alert-dialog";

interface ForumPostItemProps {
  post: Post;
  onViewDiscussion: (post: Post) => void;
  onDelete: (postId: string) => void;
  onEdited: (value: Partial<Post>) => void;
  onClosed: (value: string) => void;
  onVisible: (value: string) => void;
}

export function ForumPostItem({
  post,
  onViewDiscussion,
  onDelete,
  onEdited,
  onClosed,
  onVisible,
}: ForumPostItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const user = useAuthStore((state) => state.user);
  const isAuthorOrTeacher = user?.profileId === post.author.id;

  if (user?.role === "student" && post.isVisible === false) {
    return null;
  }

  const handleEdit = () => {
    setIsMenuOpen(false);

    setTimeout(() => {
      setIsEditing(true);
    }, 300);
  };

  const handleUpdateVisibility = async () => {
    setIsMenuOpen(false);
    onVisible(post.id);
  };

  const handleToggleClosedStatus = async () => {
    setIsMenuOpen(false);
    onClosed(post.id);
  };

  const handleDeletePost = () => {
    setIsMenuOpen(false);
    onDelete(post.id);
    setIsOpenConfirm(false);
  };

  const handleDelete = async () => {
    setIsMenuOpen(false);
    setIsOpenConfirm(true);
  };

  return (
    <div
      className={`p-3 border border-border rounded-lg transition-colors group hover:border-primary/20 hover:bg-muted/5 
      ${post.isVisible === false ? "bg-muted/10 border-muted" : ""}`}
    >
      <NewDiscussionDialog
        open={isEditing}
        onOpenChange={setIsEditing}
        initialValues={{
          title: post.title,
          description: post.description,
          categoryId: post.category.id || "",
        }}
        onSubmit={async (updatedValues) => {
          onEdited({
            ...updatedValues,
            id: post.id,
            category: {
              id: updatedValues.categoryId,
            },
          });
          setIsEditing(false);
        }}
      />

      <AlertDialogComponent
        title="Eliminar publicación"
        description="¿Estás seguro de que deseas eliminar esta publicación? Esta acción no se puede deshacer."
        openAlertDialog={isOpenConfirm}
        setOpenAlertDialog={setIsOpenConfirm}
        onConfirm={handleDeletePost}
      />

      <div className="flex items-center justify-between mb-2">
        <h3
          className="text-base font-medium cursor-pointer hover:text-primary transition-colors"
          onClick={() => onViewDiscussion(post)}
        >
          {post.title}
        </h3>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs px-2">
            {post.category.name}
          </Badge>

          {isAuthorOrTeacher && (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-6 w-6 transition-opacity ${isMenuOpen
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                    }`}
                >
                  <MoreVertical className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleUpdateVisibility}>
                  {post?.isVisible ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Ocultar publicación
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Mostrar publicación
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleToggleClosedStatus}>
                  {post?.isClosed ? (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      Reabrir discusión
                    </>
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Cerrar discusión
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Avatar className="h-7 w-7 rounded-full shrink-0 mt-0.5">
          <AvatarImage
            src={
              post.author.profileImage || "/placeholder.svg?height=28&width=28"
            }
            alt={`${post.author.name} ${post.author.lastName}`}
          />
          <AvatarFallback className="text-xs">
            {getInitials(`${post.author.name} ${post.author.lastName}`)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center text-xs text-muted-foreground mb-1.5">
            <span className="font-medium text-foreground">
              {`${post.author.name} ${post.author.lastName}`}
            </span>
            <span className="mx-1.5">•</span>
            <span className="flex items-center">
              <CalendarDays className="h-3 w-3 mr-1" />
              {dayjs(post.createdAt).format("DD MMM YYYY hh:mm")}
            </span>

            {!post.isVisible && (
              <>
                <span className="mx-1.5">•</span>
                <span className="text-amber-600 flex items-center">
                  <EyeOff className="h-3 w-3 mr-1" />
                  Oculta
                </span>
              </>
            )}

            {post.isClosed && (
              <>
                <span className="mx-1.5">•</span>
                <span className="text-red-500 flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Cerrada
                </span>
              </>
            )}
          </div>

          <div
            className={`prose prose-sm max-w-none mb-2 line-clamp-2 text-sm ${post.isVisible === false ? "text-foreground/90" : ""
              }`}
          >
            <ReactMarkdown>{post.description}</ReactMarkdown>
          </div>

          <div className="flex items-center justify-between mt-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs py-0 px-2.5"
              onClick={() => onViewDiscussion(post)}
            >
              Ver Discusión
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
