import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

// Esquema para el formulario de login
export const loginSchema = z.object({
  identifier: z.string().min(1, { message: "Ingrese su correo o código" }),
  password: z.string().min(1, { message: "Ingrese su contraseña" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// Esquema para el formulario de registro
export const registerSchema = z
  .object({
    names: z
      .string()
      .min(2, { message: "Los nombres debe tener al menos 2 caracteres" }),
    surnames: z
      .string()
      .min(2, { message: "Los apellidos debe tener al menos 2 caracteres" }),
    email: z
      .string()
      .email({ message: "Ingrese un correo electrónico válido" }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string(),
    profileImage: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: `El tamaño máximo del archivo es 20MB`,
      })
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Solo se aceptan archivos .jpg, .jpeg, .png y .webp",
      })
      .optional(),
    instructorRequest: z.boolean().default(false),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// Esquema para la verificación de correo
export const verifyEmailSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, { message: "El código debe tener 6 dígitos" }),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Ingrese un correo electrónico válido" }),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Esquema para restablecer contraseña
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
    confirmPassword: z.string(),
    token: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

// Esquema para el cambio de contraseña
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "La contraseña actual debe tener al menos 8 caracteres",
    }),
    newPassword: z
      .string()
      .min(8, {
        message: "La nueva contraseña debe tener al menos 8 caracteres",
      })
      .regex(/^\S*$/, {
        message: "La contraseña no puede contener espacios en blanco",
      })
      .regex(/[A-Z]/, {
        message: "La contraseña debe contener al menos una letra mayúscula",
      })
      .regex(/[0-9]/, {
        message: "La contraseña debe contener al menos un número",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "La contraseña debe contener al menos un carácter especial",
      }),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "La nueva contraseña no puede ser igual a la actual",
    path: ["newPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
