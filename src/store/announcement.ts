import { create } from "zustand";
import { AnnouncementPriority } from "@/types";
import { AnnouncementFormData } from "@/schema/announcement";

interface AnnouncementState {
  isAddAnnouncementDialogOpen: boolean;
  announcement: AnnouncementFormData;
  setAnnouncement: (section: AnnouncementFormData) => void;
  setIsAddAnnouncementDialogOpen: (isOpen: boolean) => void;
}

export const useAnnouncementStore = create<AnnouncementState>((set) => ({
  isAddAnnouncementDialogOpen: false,
  announcement: {
    id: "",
    title: "",
    description: "",
    type: AnnouncementPriority.INFORMATION,
  },
  sections: [],
  pageNumber: 1,
  pageLimit: 10,
  setAnnouncement: (announcement: AnnouncementFormData) =>
    set({ announcement }),
  setIsAddAnnouncementDialogOpen: (isOpen) =>
    set({ isAddAnnouncementDialogOpen: isOpen }),
}));
