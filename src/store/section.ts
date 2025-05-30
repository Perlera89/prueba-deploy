import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SectionFormData } from "@/schema/section";

interface SectionState {
  isAddSectionDialogOpen: boolean;
  action: "add" | "edit";
  selectedSectionId: string;
  setSelectedSectionId: (sectionId: string) => void;
  setAction: (action: "add" | "edit") => void;
  section: SectionFormData;
  setSection: (section: SectionFormData) => void;
  setIsAddSectionDialogOpen: (isOpen: boolean) => void;
}

export const useSectionStore = create<SectionState>()(
  persist(
    (set) => ({
      isAddSectionDialogOpen: false,
      action: "add",
      section: {
        id: "",
        sectionNumber: "",
        title: "",
        dateRange: {
          startDate: "",
          endDate: "",
        },
        isVisible: true,
      },
      selectedSectionId: "",
      setSelectedSectionId: (sectionId) =>
        set({ selectedSectionId: sectionId }),
      setSection: (section: SectionFormData) => set({ section }),
      setAction: (action) => set({ action }),
      setIsAddSectionDialogOpen: (isOpen) =>
        set({ isAddSectionDialogOpen: isOpen }),
    }),
    {
      name: "section-storage",
      partialize: (state) => ({ selectedSectionId: state.selectedSectionId }),
    }
  )
);
