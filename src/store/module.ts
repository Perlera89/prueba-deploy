import { Module } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModuleState {
  module: Module;
  setModule: (module: Module) => void;
  refetchModule?: boolean;
  refetchedModule?: (refecth: boolean) => void;
}

export const useModuleStore = create<ModuleState>()(
  persist(
    (set) => ({
      module: {
        id: "",
        courseId: "",
        title: "",
        description: "",
        sectionsCount: 0,
        meetingLink: "",
        progress: 0,
        picture: "" as any,
        isVisible: true,
      },
      setModule: (module) => set({ module }),
      refetchModule: false,
      refetchedModule: (refetch) => set({ refetchModule: refetch }),
    }),
    {
      name: "module-storage",
      partialize: (state) => ({ module: state.module }),
    }
  )
);
