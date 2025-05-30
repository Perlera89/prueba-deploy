import { z } from "zod";
import { categorySchema } from "./category";
import { CourseStatus } from "@/types";

/*const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];*/

export const meetingLinkSchema = z.object({
  meetingLink: z
    .string()
    .url({ message: "El enlace de la reunión no es válido" }),
});

const schedulesSchema = z.object({
  day: z.string().min(1, { message: "El día es obligatorio" }),
  startTime: z
    .string()
    .min(1, { message: "La hora de inicio es obligatoria" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "El formato debe ser HH:MM",
    })
    .refine(
      (val) => {
        const [hh, mm] = val.split(":").map(Number);
        return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
      },
      { message: "La hora debe estar en formato 24 horas y minutos válidos" }
    ),
  endTime: z
    .string()
    .min(1, { message: "La hora de fin es obligatoria" })
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "El formato debe ser HH:MM",
    })
    .refine(
      (val) => {
        const [hh, mm] = val.split(":").map(Number);
        return hh >= 0 && hh <= 23 && mm >= 0 && mm <= 59;
      },
      { message: "La hora debe estar en formato 24 horas y minutos válidos" }
    ),
});

export const courseScheduleSchema = z.object({
  schedules: z.array(schedulesSchema).min(1, {
    message: "Debe agregar al menos un horario",
  }),
});
/*const InstructorSchema = z.object({
  names: z
    .string()
    .min(1, { message: "El nombre del instructor es obligatorio" }),
  surnames: z
    .string()
    .min(1, { message: "El apellido del instructor es obligatorio" }),
  title: z
    .string()
    .min(1, { message: "El título del instructor es obligatorio" }),
});*/

export const courseSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, { message: "El título del curso es obligatorio" }),
  courseCode: z
    .string()
    .min(1, { message: "El código del curso es obligatorio" }),
  status: z
    .nativeEnum(CourseStatus, {
      errorMap: () => ({ message: "El estado proporcionado no es válido" }),
    })
    .optional(),
  categoryId: z.string(),
  isVisible: z.boolean(),
  description: z.string().optional(),
  picture: z
    .union([z.instanceof(File), z.string(), z.record(z.string(), z.any())])
    .optional(),
  price: z.string().min(1, "El precio es obligatorio"),
  category: categorySchema.optional(),
});

export type CourseFormData = z.infer<typeof courseSchema>;
export type MeetingLinkFormData = z.infer<typeof meetingLinkSchema>;
export type CourseScheduleFormData = z.infer<typeof courseScheduleSchema>;
