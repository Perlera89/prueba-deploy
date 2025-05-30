
import z from "zod";

export const postSchema = z.object({
    title: z.string().min(5, "El título debe tener al menos 5 caracteres"),
    description: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
    categoryId: z.string().min(1, "Debes seleccionar una categoría"),

});

export const postSchemaReply = z.object({
    reply: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
});
export type PostReply = z.infer<typeof postSchemaReply>;
export type PostForm = z.infer<typeof postSchema>;