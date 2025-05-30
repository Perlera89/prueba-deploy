import { toast } from "sonner";
import { InstructorProfile, Student } from "@/types";
import {
  findInstructorProfileById,
  updateProfile,
  changePassword,
  updateImage,
  deleteImageProfile,
  updateStudentImage,
  findStudentProfileById,
  deleteImageStudent,
} from "@/route/profile";
import { useDeleteData, useFindData, useSaveData } from "./use-generic";
import { useAuthStore } from "@/store/auth";

const PROFILE_KEY = "profile";

export function useFindProfile(profileId: string) {
  const { token } = useAuthStore();
  return useFindData<InstructorProfile>(
    [PROFILE_KEY, token],
    async () =>
      await findInstructorProfileById(profileId, token)
        .then((res) => res.data)
        .catch((error) => {
          toast.error("Error al obtener el perfil");
        }),
    !!profileId
  );
}

export function useUpdateProfile() {
  const { token } = useAuthStore();
  return useSaveData(
    async ({ profile }: { profile: Partial<InstructorProfile> }) => {
      await updateProfile(profile, token);
    },
    [PROFILE_KEY, token],
    "Perfil actualizado exitosamente",
    "Error al actualizar el perfil"
  );
}
interface UpdatePassword {
  currentPassword: string;
  newPassword: string;
}

export function useChangePassword() {
  const { token } = useAuthStore();
  return useSaveData(
    async (data: UpdatePassword) => {
      await changePassword(data, token);
    },
    [],
    "Contraseña actualizada exitosamente",
    "No se pudo actualizar la contraseña"
  );
}

interface UpdateImage {
  profileId: string;
  imagePerfil: string;
}
export function useUpdateImage() {
  const { token } = useAuthStore();
  return useSaveData(
    async (data: UpdateImage) => {
      await updateImage(data, token);
    },
    [PROFILE_KEY, token],
    "Imagen actualizada exitosamente",
    "No se pudo actualizar la imagen"
  );
}

export function useUpdateStudentImage() {
  const { token } = useAuthStore();
  return useSaveData(
    async (data: { studentProfileId: string, imagePerfil: string }) => {
      await updateStudentImage(data, token);
    },
    [PROFILE_KEY, token],
    "Imagen actualizada exitosamente",
    "No se pudo actualizar la imagen"
  );
}

export function useDeleteImage() {
  const { token } = useAuthStore();
  return useDeleteData(
    async ({ profileId }: { profileId: string }) =>
      await deleteImageProfile(profileId, token),
    [PROFILE_KEY, token],
    "Imagen eliminada exitosamente",
    "No se pudo eliminar la imagen"
  );
}

export function useFindStudent(profileId: string, isStudent: boolean) {
  const { token } = useAuthStore();
  return useFindData<Student>(
    [PROFILE_KEY, token],
    async () =>
      await findStudentProfileById(profileId, token)
        .then((res) => res.data)
        .catch((error) => {
          toast.error("Error al obtener el perfil");
        }),
    !!isStudent
  );
}

export function useDeleteImageStudent() {
  const { token } = useAuthStore();
  return useDeleteData(
    async ({ profileId }: { profileId: string }) =>
      await deleteImageStudent(profileId, token),
    [PROFILE_KEY, token],
    "Imagen eliminada exitosamente",
    "No se pudo eliminar la imagen"
  );
}