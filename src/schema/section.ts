import { z } from "zod";

export const sectionSchema = z.object({
  id: z.string().optional(),
  sectionNumber: z.string().refine(
    (value) => {
      const num = Number(value);
      return !isNaN(num) && num > 0;
    },
    { message: "El número de semana debe ser un número mayor a 0" }
  ),
  title: z.string().min(1, { message: "El título es obligatorio" }),
  dateRange: z.object({
    startDate: z
      .string()
      .min(1, { message: "La fecha de inicio es obligatoria" }),
    endDate: z.string().min(1, { message: "La fecha de fin es obligatoria" }),
  }),
  isVisible: z.boolean(),
});

export type SectionFormData = z.infer<typeof sectionSchema>;
