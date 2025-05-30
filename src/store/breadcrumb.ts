import { create } from "zustand";

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

interface BreadcrumbState {
  items: BreadcrumbItemType[];
  setItems: (items: BreadcrumbItemType[]) => void;
  addItem: (item: BreadcrumbItemType) => void;
  removeLastItem: () => void;
  resetItems: () => void;
}

const defaultItems: BreadcrumbItemType[] = [
  { label: "Inicio", href: "/dashboard" },
];

export const useBreadcrumbStore = create<BreadcrumbState>((set) => ({
  items: [...defaultItems],

  setItems: (items) => set({ items }),

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeLastItem: () =>
    set((state) => ({
      items: state.items.slice(0, -1),
    })),

  resetItems: () => set({ items: [...defaultItems] }),
}));
