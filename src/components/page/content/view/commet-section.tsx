"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MessageSquare, MoreVertical, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  useAddComment,
  useComment,
  useDeleteComment,
} from "@/hooks/use-comment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertDialogComponent from "@/components/display/alert-dialog";
import dayjs from "dayjs";
import { useAuthStore } from "@/store/auth";

const commentSchema = z.object({
  content: z
    .string()
    .min(1, "El comentario no puede estar vacío")
    .max(500, "El comentario es demasiado largo"),
});

type CommentFormValues = z.infer<typeof commentSchema>;
interface CommentSectionProps {
  contentId: string;
  contentType: string;
}

export function CommentSection({ contentId, contentType }: CommentSectionProps) {
  // Estados existentes
  const [activeDeleteComment, setActiveDeleteComment] = useState<boolean>(false);
  const [commentToDelete, setCommentToDelete] = useState<string | null>(null);
  const { data: comments = [] } = useComment(contentId, contentType);
  const AddMutationComment = useAddComment(contentId);
  const DeleteMutationComment = useDeleteComment(contentId);
  const userId = useAuthStore((state) => state.user?.profileId);

  const [visibleComments, setVisibleComments] = useState(5);

  const sortedComments = [...comments].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  const displayedComments = sortedComments.slice(0, visibleComments);

  const hasMoreComments = visibleComments < comments.length;

  const loadMoreComments = () => {
    setVisibleComments(prev => Math.min(prev + 5, comments.length));
  };

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    AddMutationComment.mutateAsync({ content: values.content, contentType });

    form.reset();
  };

  const handleDeleteComment = (value: string) => {
    DeleteMutationComment.mutateAsync({ commentId: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Comentarios y Discusión</h2>
      </div>

      <Separator />

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-3 transition-all">
            <div className="p-3 rounded-full bg-muted">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="font-medium text-base mb-1">No hay comentarios aún</h3>
              <p className="text-muted-foreground">
                Sé el primero en iniciar la conversación
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Contenedor con scroll para los comentarios */}
            <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30">
              <div className="space-y-6">
                {displayedComments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`flex gap-3 ${comment.author.role === "teacher"
                      ? "bg-muted/70 p-4 rounded-lg"
                      : ""
                      }`}
                  >
                    <Avatar className="h-10 w-10 bg-primary">
                      <AvatarImage
                        src={comment.author.profileImage || "/avatar-fallback.png"}
                        alt={comment.author.name}
                      />
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{`${comment.author.name} ${comment.author.lastName}`}</h4>
                        {comment.author.role === "teacher" && <Badge>Profesor</Badge>}
                        {comment.author.role === "student" && <Badge className="bg-secondary text-secondary-foreground">Estudiante</Badge>}
                        <span className="text-xs text-muted-foreground ml-auto">
                          {dayjs(comment.createdAt).format('dddd D [de] MMM HH:mm')}
                        </span>
                        {userId === comment.author.id &&
                          <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setCommentToDelete(comment.id);
                                  setActiveDeleteComment(true);
                                }}
                                className="text-destructive flex items-center gap-2 cursor-pointer"
                              >
                                <Trash className="h-4 w-4" />
                                Eliminar comentario
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        }
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {comment.comment}
                      </p>
                    </div>
                    <AlertDialogComponent
                      openAlertDialog={activeDeleteComment}
                      setOpenAlertDialog={setActiveDeleteComment}
                      title="Eliminar comentario"
                      description="¿Estás seguro de que deseas eliminar este comentario? Esta acción no se puede deshacer."
                      onConfirm={() => handleDeleteComment(commentToDelete || '')}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Botón "Ver más" fuera del área de scroll */}
            {hasMoreComments && (
              <div className="flex justify-center pt-2">
                <Button
                  variant="outline"
                  onClick={loadMoreComments}
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ver más comentarios ({comments.length - visibleComments} restantes)
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Formulario para agregar comentario */}
      <div className="pt-4 border-t mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-10 w-10 bg-primary">
                <AvatarImage src="/avatar-fallback.png" alt="Tu avatar" />
                <AvatarFallback>TÚ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="Escribe un comentario o pregunta..."
                          className="min-h-[80px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Enviar comentario
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
