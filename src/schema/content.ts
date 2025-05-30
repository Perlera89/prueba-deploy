import { z } from "zod";

export const assignmentSchema = z.object({
  rubric: z
    .array(
      z.object({
        id: z.string(),
        description: z.string(),
        points: z.number(),
      })
    )
    .optional(),
  score: z
    .string()
    .transform((val) => (val === "" ? undefined : Number(val)))
    .refine(
      (val) => val === undefined || (!isNaN(val) && val >= 0 && val <= 100),
      {
        message: "La puntuación debe ser un número entre 0 y 100",
      }
    )
    .optional(),
  dueDate: z
    .date({
      required_error: "La fecha límite es obligatoria",
    })
    .optional(),
  isGraded: z.boolean().default(true).optional(),
  allowLateSubmissions: z.boolean().default(false).optional(),
});

const fileSchema = z.object({
  title: z.string(),
  fileExtension: z.string(),
  url: z.string().url(),
});

export const contentSchema = z.object({
  id: z.string().optional(),
  sectionId: z.string().optional(),
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  isVisible: z.boolean().default(true),
  files: z.array(fileSchema).optional(),
  assignment: assignmentSchema.optional(),
});

export type ContentFormData = z.infer<typeof contentSchema>;
