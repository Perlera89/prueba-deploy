import { ContentType } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ContentState {
  contentType: ContentType;
  setContentType: (contentType: ContentType) => void;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      contentType: ContentType.MATERIAL,
      setContentType: (contentType: ContentType) => set({ contentType }),
    }),
    {
      name: "module-storage",
      partialize: (state) => ({ contentType: state.contentType }),
    }
  )
);
