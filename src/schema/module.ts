import { z } from "zod";

export const moduleInfoSchema = z.object({
  credits: z.string().optional(),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
  preRequisite: z.string().optional(),
  methodology: z.string().optional(),
  weekDuration: z.string().optional(),
  objectives: z
    .object({
      general: z.string(),
      specific: z.array(z.string()),
    })
    .optional(),
});

export const moduleSchema = z.object({
  id: z.string().optional(),
  courseId: z.string().optional(),
  instructorId: z.string().optional(),
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  isVisible: z.boolean().optional(),
  picture: z
    .union([z.instanceof(File), z.string(), z.record(z.string(), z.any())])
    .optional(),
});

export type ModuleFormValues = z.infer<typeof moduleSchema>;
export type ModuleInfoFormData = z.infer<typeof moduleInfoSchema>;
