import { useState, useMemo, useEffect } from "react";
import { Archive, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "@/components/page/courses/course-card";
import { EmptyPlaceholder } from "@/components/page/courses/empty";
import Link from "next/link";
import { Course, CourseStatus } from "@/types";
import { SearchBar } from "@/components/entry/search";
import { CategoryFilter } from "@/components/entry/category-filter";
import CoursesCardSkeleton from "@/components/page/courses/courses-skeleton";
import { useAuthStore } from "@/store/auth";
import { useCoursesFilter } from "@/hooks/course/use-courses-filter";
import { CustomPagination } from "@/components/page/home/custom-pagination";
import { useFetchCoursesByProfile } from "@/hooks/course/use-course";
import { useFetchCategories } from "@/hooks/course/use-category";

export default function CoursesContainer() {
  const {
    data: allFetchedCourses = [],
    isLoading,
    isError,
    refetch: refetchCourses,
  } = useFetchCoursesByProfile();

  useEffect(() => {
    refetchCourses();
  }, [])

  const { data: categories = [] } = useFetchCategories();

  const [showArchived, setShowArchived] = useState(false);
  const [activeTab, setActiveTab] = useState("in-progress");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



  const role = useAuthStore((state) => state.user?.role);

  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    clearFilters,
    courses,
    filterCourses,
    archivedCourses,
  } = useCoursesFilter(allFetchedCourses);

  /*const LoadingSkeleton = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <CoursesCardSkeleton key={i} />
          ))}
      </div>
    );
  };*/

  const TabContent = ({
    courseList,
    status,
    emptyTitle = "No hay cursos",
    emptyIcon = "book",
  }: {
    courseList: Course[];
    status?: CourseStatus;
    emptyTitle?: string;
    emptyIcon?: "book" | "archive" | "file-text" | "check-circle";
  }) => {
    if (isLoading) {
      return (
        <>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <CoursesCardSkeleton key={i} />
            ))}
        </>
      );
    }

    const filteredCourses = filterCourses(courseList, status);


    if (filteredCourses.length === 0) {
      return (
        <EmptyPlaceholder className="mt-4 col-span-full w-full">
          <EmptyPlaceholder.Icon name={emptyIcon} />
          <EmptyPlaceholder.Title>{emptyTitle}</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            No hay cursos que coincidan con tu búsqueda o filtros.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      );
    }

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

    return (
      <>
        {paginatedCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isArchived={course.isArchived}
          />
        ))}
        {filteredCourses.length > itemsPerPage && (
          <div className="col-span-full">
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </>
    );
  };
  // Todos los cursos (activos + archivados)
  const allCoursesData = useMemo(() => {
    if (!courses || !Array.isArray(courses)) {
      return [];
    }
    return [...courses];
  }, [courses, showArchived]);

  return (
    <div className="w-full px-6">
      <div className="grid md:items-center justify-between mb-6 lg:flex">
        <h2 className="text-2xl font-bold">Mis Cursos</h2>
        <div className="flex items-center gap-2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <CategoryFilter
            selectedCategories={selectedCategories}
            allCategories={categories}
            toggleCategory={toggleCategory}
            clearFilters={clearFilters}
          />
          {role === "manager" && (
            <Link href="/courses/add" passHref>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Crear Curso
              </Button>
            </Link>
          )}
        </div>
      </div>

      <Tabs
        defaultValue="in-progress"
        className="mb-8"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center">
          <div className="overflow-x-auto">
            <TabsList className="mb-1">
              <TabsTrigger value="in-progress">En progreso</TabsTrigger>
              {role !== "student" && (
                <>
                  <TabsTrigger value="open-inscription">Publicados</TabsTrigger>
                  <TabsTrigger value="comming-soon">Proximamente</TabsTrigger>
                </>
              )}
              <TabsTrigger value="completed">Completados</TabsTrigger>
              <TabsTrigger value="all">Todos</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="in-progress">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
            <TabContent
              courseList={courses}
              status={CourseStatus.IN_PROGRESS}
              emptyTitle="No hay cursos en progreso"
              emptyIcon="file-text"
            />
          </div>
        </TabsContent>
        {role !== "student" && (
          <>
            <TabsContent value="open-inscription">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
                <TabContent
                  courseList={courses}
                  status={CourseStatus.OPEN_INSCRIPTION}
                  emptyTitle="No hay cursos con inscripción abierta"
                  emptyIcon="book"
                />
              </div>
            </TabsContent>
            <TabsContent value="comming-soon">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
                <TabContent
                  courseList={courses}
                  status={CourseStatus.COMING_SOON}
                  emptyTitle="No hay cursos sin publicar"
                  emptyIcon="book"
                />
              </div>
            </TabsContent>
          </>
        )}
        <TabsContent value="completed">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
            <TabContent
              courseList={courses}
              status={CourseStatus.COMPLETED}
              emptyTitle="No hay cursos completados"
              emptyIcon="check-circle"
            />
          </div>
        </TabsContent>
        <TabsContent value="all">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
            <TabContent
              courseList={allCoursesData}
              emptyTitle="No hay cursos disponibles"
              emptyIcon="book"
            />
          </div>
        </TabsContent>
      </Tabs>

      {archivedCourses.length > 0 && (
        <>
          <div className="flex justify-center mt-8">
            <Button
              variant="ghost"
              onClick={() => setShowArchived(!showArchived)}
            >
              <Archive className="h-4 w-4 mr-2" />
              {showArchived ? "Ocultar Archivados" : "Mostrar Archivados"}
            </Button>
          </div>

          {showArchived && (
            <>
              <div className="mt-8 mb-4">
                <p className="text-muted-foreground text-sm">
                  Cursos que han sido archivados y no están actualmente
                  disponibles para los estudiantes
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-4">
                {archivedCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isArchived={true}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
