import {
  getAnnouncements,
  findAnnouncement,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from "@/route/announcement";
import { Announcement } from "@/types";
import {
  useFetchData,
  useFindData,
  useSaveData,
  useDeleteData,
} from "./use-generic";
import { useSession } from "./use-session";
import { AnnouncementFormData } from "@/schema/announcement";

const KEY_ANNOUNCEMENTS = "announcements";

export function useFetchAnnouncements(
  moduleId: string,
  page: number = 1,
  limit: number = 10
) {
  const { token } = useSession();
  return useFetchData<Announcement[]>(
    [KEY_ANNOUNCEMENTS, moduleId, String(page), String(limit)],
    async () => await getAnnouncements(moduleId, token, page, limit),
    !!moduleId
  );
}

export function useFindAnnouncement(moduleId: string, announcementId: string) {
  const { token } = useSession();
  return useFindData(
    [KEY_ANNOUNCEMENTS, moduleId],
    async () => findAnnouncement(moduleId, announcementId, token),
    !!moduleId
  );
}

export function useSaveAnnouncement(
  moduleId: string,
  page: number,
  limit: number
) {
  const { token } = useSession();
  return useSaveData(
    async ({ announcement }: { announcement: AnnouncementFormData }) => {
      const announcementData: Partial<Announcement> = {
        title: announcement.title,
        description: announcement.description,
        type: announcement.type,
      };

      if (announcement.id) {
        await updateAnnouncement(announcement?.id, announcementData, token);
      } else {
        await addAnnouncement(moduleId ?? "", announcementData, token);
      }
    },
    [KEY_ANNOUNCEMENTS, moduleId, page.toString(), limit.toString()],
    "Anuncio guardado exitosamente",
    "Error al guardar el anuncio"
  );
}

export function useDeleteAnnouncement(
  materialId: string,
  page: number,
  limit: number
) {
  const { token } = useSession();

  return useDeleteData(
    async ({ announcementId }: { announcementId: string }) =>
      await deleteAnnouncement(announcementId, token),
    [KEY_ANNOUNCEMENTS, materialId, page.toString(), limit.toString()],
    "Anuncio eliminado exitosamente",
    "Error al eliminar el Anuncio"
  );
}
