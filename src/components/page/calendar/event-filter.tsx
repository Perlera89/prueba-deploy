import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, LibraryBig, Funnel, Bell } from "lucide-react";
import { Course } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import SelectorChip from "@/components/entry/selector-chip";

interface EventFiltersProps {
  eventTypeFilters: Record<string, boolean>;
  courseFilters: Record<string, boolean>;
  handleEventTypeFilterChange: (type: string) => void;
  handleCourseFilterChange: (courseCode: string) => void;
  courses: Course[];
  isLoading: boolean;
}

export function EventFilters({
  eventTypeFilters,
  courseFilters,
  handleEventTypeFilterChange,
  handleCourseFilterChange,
  courses,
  isLoading,
}: EventFiltersProps) {
  return (
    <Card>
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center">
          <Funnel className="h-4 w-4 mr-2 text-primary" />
          <CardTitle className="text-base">Filtros</CardTitle>
        </div>
      </CardHeader>{" "}
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <EventTypeFiltersSkeleton />
            <CourseFiltersSkeleton />
          </div>
        ) : courses.length > 0 ? (
          <div className="space-y-4">
            <EventTypeFilters
              filters={eventTypeFilters}
              onChange={handleEventTypeFilterChange}
            />
            <CourseFilters
              filters={courseFilters}
              onChange={handleCourseFilterChange}
              courses={courses}
            />
          </div>
        ) : (
          <div className="text-center py-6">
            <LibraryBig className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="mt-3 text-sm font-medium">No tienes cursos</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Las cursos a los que te has inscrito aparecerán aquí.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CourseFiltersSkeleton() {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Cursos</p>
      <div className="max-h-[200px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-md animate-pulse"
            >
              <Skeleton className="h-4 w-4 rounded mr-2" />
              <Skeleton className="w-2 h-2 rounded-full mr-2" />
              <Skeleton className="h-4 w-full max-w-[150px]" />
            </div>
          ))}
      </div>
    </div>
  );
}

function EventTypeFilters({
  filters,
  onChange,

}: {
  filters: Record<string, boolean>;
  onChange: (type: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Tipo de Evento</p>
      <div className="grid grid-cols-2 gap-2">
        <SelectorChip
          title="Actividades"
          icon={ClipboardList}
          colorName="orange"
          selected={filters.assignment}
          onClick={() => onChange("assignment")}
        />
        <SelectorChip
          title="Anuncios"
          icon={Bell}
          colorName="blue"
          selected={filters.announcements}
          onClick={() => onChange("announcements")}
        />
      </div>
    </div>
  );
}

function EventTypeFiltersSkeleton() {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Tipo de Evento</p>
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center justify-center h-10 p-2 rounded-md animate-pulse bg-muted">
          <Skeleton className="h-4 w-full max-w-[80px]" />
        </div>
        <div className="flex items-center justify-center h-10 p-2 rounded-md animate-pulse bg-muted">
          <Skeleton className="h-4 w-full max-w-[80px]" />
        </div>
      </div>
    </div>
  );
}

function CourseFilters({
  filters,
  courses,
  onChange,
}: {
  filters: Record<string, boolean>;
  courses: Course[];
  onChange: (courseTitle: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-medium mb-2">Cursos</p>
      <div className="max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30">
        {courses.map((course) => (
          <div
            key={course.title}
            className="flex items-center p-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            <input
              type="checkbox"
              id={course.title}
              className="rounded mr-2"
              checked={filters?.[course.title] || false}
              onChange={() => onChange(course.title)}
            />

            <label
              htmlFor={course.title}
              className="text-sm cursor-pointer"
            >
              {course.title}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
