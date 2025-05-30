import { z } from "zod";

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { message: "El nombre de la categoría es obligatorio" }),
  description: z
    .string()
    .min(1, { message: "La descripción de la categoría es obligatoria" }),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  isDisabled: z.boolean().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
