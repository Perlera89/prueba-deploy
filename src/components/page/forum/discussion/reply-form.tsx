"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Form, FormControl, FormField, FormItem } from "../../../ui/form";
import { RichTextEditor } from "../../../entry/rich-text-editor";
import { Button } from "../../../ui/button";
import { Loader2, Send } from "lucide-react";
import { getInitials } from "@/utils/initials";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostReply, postSchemaReply } from "@/schema/post";
import { useAuthStore } from "@/store/auth";
import { usePostStore } from "@/store/post";

interface ReplyFormProps {
  initialValue?: string; // Valor inicial para edición
  onSubmit: (data: PostReply) => Promise<void>;
  isLoading: boolean;
  isEditing?: boolean;
  isVisible?: boolean;
}

export function ReplyForm({
  initialValue = "",
  onSubmit,
  isLoading,
  isEditing = false,
}: ReplyFormProps) {
  const form = useForm<PostReply>({
    resolver: zodResolver(postSchemaReply),
    defaultValues: {
      reply: initialValue,
    },
  });
  const user = useAuthStore((state) => state.user);
  const { setReply } = usePostStore();

  useEffect(() => {
    form.reset({ reply: initialValue });
  }, [initialValue, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    setReply({
      reply: data.reply,
      author: {
        profileImage: user?.profileImage,
        name: user?.fullName,
        role: user?.role,
      },
    });
    try {
      await onSubmit(data);
      if (!isEditing) {
        form.reset({ reply: "" });
      }
    } catch (error) {
      console.error("Error al enviar la respuesta:", error);
    }
  });

  return (
    <div className={isEditing ? "" : "border-t bg-muted/30 p-3"}>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex items-start gap-3">
          {!isEditing && (
            <Avatar className="h-8 w-8 mt-1">
              <AvatarImage src={user?.profileImage} />
              <AvatarFallback>
                {getInitials(user?.fullName || "Usuario")}
              </AvatarFallback>
            </Avatar>
          )}

          <div className="flex-1 relative">
            <FormField
              control={form.control}
              name="reply"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={
                          isEditing
                            ? "Edita tu respuesta..."
                            : "Escribe tu respuesta..."
                        }
                        className="min-h-[100px] w-full overflow-visible break-words" // Cambio en las clases
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="absolute bottom-3 right-3 h-8 w-8 rounded-full shadow-sm hover:shadow"
                        disabled={isLoading || !form.formState.isValid}
                      >
                        {isLoading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Send className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
