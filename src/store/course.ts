import { create } from "zustand";
import { Course, CourseStatus } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";

interface CourseState {
  course: Course;
  setCourse: (course: Course) => void;
  setSelectedCourse: (course: Course) => void;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set) => ({
      course: {
        id: "",
        courseCode: "",
        title: "",
        status: CourseStatus.COMING_SOON,
        isArchived: false,
        category: undefined,
        isVisible: false,
        price: 0,
        picture: undefined,
      },
      setSelectedCourse: (course: Course) => set({ course }),
      setCourse: (course: Course) => set({ course }),
    }),
    {
      name: "course-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
