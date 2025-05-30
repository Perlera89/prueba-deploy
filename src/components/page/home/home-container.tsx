"use client";

import { useState, useMemo, useEffect } from "react";
import { AlignJustify, Grid2X2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyPlaceholder } from "@/components/page/courses/empty";
import { useFetchCourses } from "@/hooks/course/use-course";
import { useFetchCategories } from "@/hooks/course/use-category";

import { CourseCard } from "./course-card";
import { CourseListItem } from "./course-list-item";
import { FilterDropdown } from "./filter-dropdown";
import { SearchBar } from "./search-bar";
import { CourseCardSkeleton, CourseListItemSkeleton } from "./course-skeleton";
import { CustomPagination } from "./custom-pagination";
import { useCourseEnrollment } from "@/hooks/course/use-enrollment";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";

interface InstructorProfile {
  id: string;
  names: string;
  surnames: string;
  title: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  instructor: InstructorProfile;
}

export interface Course {
  id: string | number;
  title: string;
  description: string;
  price?: string;
  enrolled?: boolean;
  category?: {
    id: string | number;
    name: string;
  };
  courseModules: CourseModule[];
  courseCode?: string;
  progress?: number;
  status?: "coming_soon" | "open_inscription" | "in_progress" | "completed";
  modulesCount?: number;
  picture?: {
    url: string;
    title: string;
    fileExtension: string;
  };
}

const DEFAULT_CATEGORY = "Todas";
const DEFAULT_PRICE_RANGE = "all";
const DEFAULT_ENROLLMENT_STATUS = "all";
const DEFAULT_COURSE_STATUS = "all";

export default function HomeContainer() {
  const role = useAuthStore((state) => state.user?.role);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [processingCourseId, setProcessingCourseId] = useState<
    string | number | null
  >(null);

  const router = useRouter();
  const {
    data: coursesData = {
      courses: [],
      meta: { total: 0, totalPages: 1 },
    },
    isLoading,
    refetch,
    isError,
  } = useFetchCourses(currentPage, itemsPerPage);
  const { data: allCategories = [] } = useFetchCategories();

  useEffect(() => {
    if (
      !isLoading &&
      !isError &&
      (!coursesData.courses || coursesData.courses.length === 0)
    ) {
      refetch();
    }
  }, [coursesData, isLoading, isError, refetch]);

  const allCourses = coursesData.courses || [];
  const pagination = coursesData.meta || {
    total: 0,
    totalPages: 1,
    page: 1,
  };
  const availableCourses: Course[] = useMemo(() => {
    return (allCourses as any[]).map((course) => {
      return {
        id: course.id,
        title: course.title || "Sin título",
        description: course.description || "Sin descripción",
        price: course.price || "0.00",
        enrolled: course.isEnrolled || false,
        courseModules: course.courseModules || [],
        category: course.courseCategory
          ? {
            id: course.courseCategory.id,
            name: course.courseCategory.name,
          }
          : undefined,
        courseCode: course.courseCode,
        status: course.status,
        modulesCount: course.modulesCount || 0,
        picture: course.picture || "",
      };
    });
  }, [allCourses]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_CATEGORY);
  const [priceRange, setPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [enrollmentStatus, setEnrollmentStatus] = useState(
    DEFAULT_ENROLLMENT_STATUS
  );
  const [courseStatus, setCourseStatus] = useState(DEFAULT_COURSE_STATUS);

  const [tempCategory, setTempCategory] = useState(DEFAULT_CATEGORY);
  const [tempPriceRange, setTempPriceRange] = useState(DEFAULT_PRICE_RANGE);
  const [tempEnrollmentStatus, setTempEnrollmentStatus] = useState(
    DEFAULT_ENROLLMENT_STATUS
  );
  const [tempCourseStatus, setTempCourseStatus] = useState(
    DEFAULT_COURSE_STATUS
  );

  const useEnrollment = useCourseEnrollment();

  const hasAppliedFilters = useMemo(() => {
    return (
      selectedCategory !== DEFAULT_CATEGORY ||
      priceRange !== DEFAULT_PRICE_RANGE ||
      enrollmentStatus !== DEFAULT_ENROLLMENT_STATUS ||
      courseStatus !== DEFAULT_COURSE_STATUS
    );
  }, [selectedCategory, priceRange, enrollmentStatus, courseStatus]);
  const applyFilters = () => {
    setSelectedCategory(tempCategory);
    setPriceRange(tempPriceRange);
    setEnrollmentStatus(tempEnrollmentStatus);
    setCourseStatus(tempCourseStatus);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setTempCategory(DEFAULT_CATEGORY);
    setTempPriceRange(DEFAULT_PRICE_RANGE);
    setTempEnrollmentStatus(DEFAULT_ENROLLMENT_STATUS);
    setTempCourseStatus(DEFAULT_COURSE_STATUS);

    setSelectedCategory(DEFAULT_CATEGORY);
    setPriceRange(DEFAULT_PRICE_RANGE);
    setEnrollmentStatus(DEFAULT_ENROLLMENT_STATUS);
    setCourseStatus(DEFAULT_COURSE_STATUS);
    setCurrentPage(1);
  };

  const filteredCourses = useMemo(() => {
    return availableCourses.filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === DEFAULT_CATEGORY ||
        course.category?.name === selectedCategory;
      let matchesPrice = true;
      if (priceRange === "free") {
        matchesPrice = course.price === "0.00" || course.price === "0";
      } else if (priceRange === "paid") {
        matchesPrice =
          course.price !== undefined && parseFloat(course.price) > 0;
      } else if (priceRange === "under30") {
        matchesPrice =
          course.price !== undefined && parseFloat(course.price) < 30;
      } else if (priceRange === "30to50") {
        matchesPrice =
          course.price !== undefined &&
          parseFloat(course.price) >= 30 &&
          parseFloat(course.price) <= 50;
      } else if (priceRange === "over50") {
        matchesPrice =
          course.price !== undefined && parseFloat(course.price) > 50;
      }

      let matchesEnrollment = true;
      if (enrollmentStatus === "enrolled") {
        matchesEnrollment = course.enrolled === true;
      } else if (enrollmentStatus === "not-enrolled") {
        matchesEnrollment = course.enrolled !== true;
      }

      let matchesStatus = true;
      if (courseStatus !== DEFAULT_COURSE_STATUS) {
        matchesStatus = course.status === courseStatus;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesEnrollment &&
        matchesStatus
      );
    });
  }, [
    searchQuery,
    selectedCategory,
    priceRange,
    enrollmentStatus,
    courseStatus,
    availableCourses,
  ]);
  const handleEnroll = async (courseId: string | number) => {
    setProcessingCourseId(courseId);
    try {
      const response = await useEnrollment.mutateAsync({
        courseId: courseId as string,
      });

      if (response && response.paymentUrl) {
        router.push(response.paymentUrl);
      } else {
        refetch();
        setProcessingCourseId(null);
      }
    } catch (error) {
      console.error("Error en la inscripción:", error);
      setProcessingCourseId(null);
    }
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const totalPages =
    pagination.totalPages || Math.ceil(filteredCourses.length / itemsPerPage);
  const areFiltersActive = searchQuery !== "" || hasAppliedFilters;

  const currentCourses = useMemo(() => {
    if (areFiltersActive) {
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      return filteredCourses.slice(indexOfFirstItem, indexOfLastItem);
    } else {
      return filteredCourses;
    }
  }, [filteredCourses, currentPage, itemsPerPage, areFiltersActive]);

  return (
    <>
      <div className="w-full px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">Cursos Disponibles</h2>
            <p className="text-muted-foreground">
              Explora nuestra amplia selección de cursos y comienza tu
              aprendizaje
            </p>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              resetPage={() => setCurrentPage(1)}
            />

            <FilterDropdown
              tempCategory={tempCategory}
              setTempCategory={setTempCategory}
              tempPriceRange={tempPriceRange}
              setTempPriceRange={setTempPriceRange}
              tempEnrollmentStatus={tempEnrollmentStatus}
              setTempEnrollmentStatus={setTempEnrollmentStatus}
              tempCourseStatus={tempCourseStatus}
              setTempCourseStatus={setTempCourseStatus}
              selectedCategory={selectedCategory}
              priceRange={priceRange}
              enrollmentStatus={enrollmentStatus}
              courseStatus={courseStatus}
              hasAppliedFilters={hasAppliedFilters}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              categories={allCategories}
            />
          </div>
        </div>

        <div>
          <Tabs
            defaultValue="grid"
            className="mb-6"
            onValueChange={() => setCurrentPage(1)}
          >
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Mostrando {currentCourses.length} de{" "}
                {areFiltersActive ? filteredCourses.length : pagination.total}
                &nbsp; cursos
              </div>
              <TabsList>
                <TabsTrigger value="grid">
                  <Grid2X2 className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list">
                  <AlignJustify className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="grid" className="mt-6">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {[...Array(8)].map((_, index) => (
                    <CourseCardSkeleton key={index} />
                  ))}
                </div>
              ) : filteredCourses.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {" "}
                    {currentCourses.map((course) => (
                      <CourseCard
                        key={course.id}
                        course={course}
                        processingCourseId={processingCourseId}
                        onEnroll={handleEnroll}
                        userRole={role}
                      />
                    ))}
                  </div>
                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                </>
              ) : (
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon name="book" />
                  <EmptyPlaceholder.Title>
                    No se encontraron cursos
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                    No hay cursos que coincidan con los criterios de búsqueda.
                    Intenta con otros filtros.
                  </EmptyPlaceholder.Description>
                  {hasAppliedFilters && (
                    <Button onClick={resetFilters}>Restablecer filtros</Button>
                  )}
                </EmptyPlaceholder>
              )}
            </TabsContent>
            <TabsContent value="list" className="mt-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(4)].map((_, index) => (
                    <CourseListItemSkeleton key={index} />
                  ))}
                </div>
              ) : filteredCourses.length > 0 ? (
                <>
                  <div className="space-y-4">
                    {" "}
                    {currentCourses.map((course) => (
                      <CourseListItem
                        key={course.id}
                        course={course}
                        onEnroll={handleEnroll}
                        processingCourseId={processingCourseId}
                        userRole={role}
                      />
                    ))}
                  </div>
                  <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={goToPage}
                  />
                </>
              ) : (
                <EmptyPlaceholder>
                  <EmptyPlaceholder.Icon name="book" />
                  <EmptyPlaceholder.Title>
                    No se encontraron cursos
                  </EmptyPlaceholder.Title>
                  <EmptyPlaceholder.Description>
                    No hay cursos que coincidan con los criterios de búsqueda.
                    Intenta con otros filtros.
                  </EmptyPlaceholder.Description>
                  {hasAppliedFilters && (
                    <Button onClick={resetFilters}>Restablecer filtros</Button>
                  )}
                </EmptyPlaceholder>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
