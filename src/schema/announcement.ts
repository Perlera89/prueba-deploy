import { AnnouncementPriority } from "@/types";
import { z } from "zod";

export const announcementFormSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "El título es obligatorio" })
    .max(100, { message: "El título no puede exceder los 100 caracteres" }),
  description: z
    .string()
    .min(1, { message: "El contenido es obligatorio" })
    .max(1000, {
      message: "El contenido no puede exceder los 2000 caracteres",
    }),
  type: z.nativeEnum(AnnouncementPriority, {
    errorMap: () => ({ message: "La importancia proporcionado no es válida" }),
  }),
});

export type AnnouncementFormData = z.infer<typeof announcementFormSchema>;
