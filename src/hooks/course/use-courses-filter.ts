import { useMemo, useState } from "react";
import { Course } from "@/types";

export function useCoursesFilter(allCourses: Course[]) {

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const { courses, archivedCourses } = useMemo(() => {
    if (!allCourses || !Array.isArray(allCourses)) {
      return {
        courses: [],
        archivedCourses: [],
      };
    }
    const active = allCourses.filter((course) => !course.isArchived);
    const archived = allCourses.filter((course) => course.isArchived);
    return {
      courses: active,
      archivedCourses: archived,
    };
  }, [allCourses]);
  const filterCourses = useMemo(() => {
    return (courseList: Course[], status?: string) => {
      if (!courseList || !Array.isArray(courseList)) {
        return [];
      }

      return courseList.filter((course) => {
        if (status && course.status !== status) return false;

        const matchesSearch =
          searchQuery === "" ||
          course.title.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategories.length === 0 ||
          (typeof course.courseCategory?.id === "number" &&
            selectedCategories.includes(course.courseCategory.id));

        return matchesSearch && matchesCategory;
      });
    };
  }, [searchQuery, selectedCategories]);

  const toggleCategory = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
  };

  return {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    clearFilters,
    filterCourses,
    courses,
    archivedCourses,
  };
}
