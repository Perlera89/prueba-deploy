import { z } from "zod";

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const instructorProfileSchema = z.object({
  id: z.string(),
  userId: z.string().optional(),
  code: z.string().min(5).max(15),
  title: z.string().min(1).optional(),
  suffix: z.string().max(20).optional(),
  names: z.string().min(2, { message: "Los nombres son requeridos" }).max(100),
  surnames: z
    .string()
    .min(2, { message: "Los apellidos son requeridos" })
    .max(100),
  aboutMe: z.string().max(1000).optional(),
  socialLinks: z.string().optional(),
  contactInfo: z.string().optional(),
  thumbnail: z.string().max(255).optional(),
});

export const instructorSchema = z.object({
  id: z.string().optional(),
  email: z.string().email({ message: "Correo no válido" }),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .optional(),
  instructorCode: z.string().optional(),
  names: z.string().min(2, { message: "Los nombres son requeridos" }).max(100),
  surnames: z
    .string()
    .min(1, { message: "Los apellidos son requeridos" })
    .max(100),
  title: z.string().optional(),
  imagePerfil: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "El archivo debe ser menor a 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Solo se aceptan imágenes en formato JPG, JPEG, PNG o WEBP",
    })
    .optional(),
});

export const createInstructorSchema = instructorSchema.extend({
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export const updateInstructorSchema = instructorSchema.extend({
  id: z.string(),
  password: z
    .string()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
    .optional()
    .or(z.literal("")),
});

export type InstructorProfileForm = z.infer<typeof instructorProfileSchema>;
export type InstructorFormData = z.infer<typeof instructorSchema>;
export type CreateInstructorFormData = z.infer<typeof createInstructorSchema>;
export type UpdateInstructorFormData = z.infer<typeof updateInstructorSchema>;
