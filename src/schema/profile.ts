import { z } from "zod";

export const personalFormSchema = z.object({
  // Información Básica
  names: z.string(),

  thelephone: z.string(),

  surnames: z.string(),

  title: z.string(),

  department: z
    .string()
    .min(2, "El departamento debe tener al menos 2 caracteres")
    .max(100, "El departamento no puede exceder los 100 caracteres")
    .optional(),

  contactInfo: z.object({
    email: z.string(),

    office: z.string(),

    office_hours: z.string(),
  }),

  aboutMe: z.string(),

  socialLinks: z
    .object({
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
      github: z.string().optional(),
    })
    .optional(),
});

export type PersonalFormValues = z.infer<typeof personalFormSchema>;
