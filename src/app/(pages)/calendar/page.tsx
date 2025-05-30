"use client";
import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateInfo, useFetchAllEvents } from "@/hooks/use-event";
import { useFetchCoursesByProfile } from "@/hooks/course/use-course";
import { useCurrentTime } from "@/hooks/use-calendar";
import { getDateInfo } from "@/utils/date";
import { CalendarEvent } from "@/types";
import { useBreadcrumbStore } from "@/store/breadcrumb";
import { CalendarHeader } from "@/components/page/calendar/calendar-header";
import { MonthView } from "@/components/page/calendar/month-event";
import { WeekView } from "@/components/page/calendar/week-event";
import { DayView } from "@/components/page/calendar/day-event";
import { UpcomingEvents } from "@/components/page/calendar/upcoming-event";
import { EventFilters } from "@/components/page/calendar/event-filter";
import { EventDetail } from "@/components/page/calendar/event-detail";

type CalendarView = "month" | "week" | "day";

export default function CalendarPage() {
  const { setItems } = useBreadcrumbStore();
  const [view, setView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [eventTypeFilters, setEventTypeFilters] = useState({
    assignment: true,
    announcements: true
  });
  const { data: courses = [], isLoading: isLoadingCourses, refetch } =
    useFetchCoursesByProfile();
  const [courseFilters, setCourseFilters] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (courses.length > 0) {
      const initialFilters = courses.reduce((acc, course) => {
        acc[course.title] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setCourseFilters(initialFilters);
    }
  }, [courses]);



  const { data: upcomingEvents = [], isLoading: isLoadingEvent } =
    useFetchAllEvents();

  useEffect(() => {
    refetch()
  }, [])

  const [isOpenDetailEvent, setIsOpenDetailEvent] = useState(false);

  const currentTime = useCurrentTime();

  const navigate = (direction: number): void => {
    const newDate = new Date(currentDate);

    if (view === "day") {
      newDate.setDate(currentDate.getDate() + direction);
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + direction * 7);
    } else {
      newDate.setMonth(currentDate.getMonth() + direction);

    }

    setCurrentDate(newDate);
  };

  const handleEventClick = (event: CalendarEvent): void => {
    setSelectedEvent(event);
    setIsOpenDetailEvent(true);
  };

  const dateInfo: DateInfo = getDateInfo(currentDate, view);

  useEffect(() => {
    setItems([
      { label: "Inicio", href: "/home" },
      { label: "Calendario", href: "/calendar" },
    ]);

    return () => {
      useBreadcrumbStore.getState().resetItems();
    };
  }, []);

  const handleCourseFilterChange = (courseTitle: string): void => {
    setCourseFilters(prev => ({
      ...prev,
      [courseTitle]: !prev[courseTitle]
    }));
  }

  const handleEventTypeFilterChange = (type: string): void => {
    setEventTypeFilters(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  const filteredEvents = upcomingEvents.filter(event => {
    const typeMatches =
      (eventTypeFilters.assignment && event.type === "assignment") ||
      (eventTypeFilters.announcements && event.type === "announcement" as any);

    const courseMatches = !event.courseTitle || courseFilters[event.courseTitle] === true;

    return typeMatches && courseMatches;
  })

  return (
    <>
      <div className="w-full px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
            <h2 className="text-2xl font-bold">Calendario</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Tabs
              defaultValue={view}
              onValueChange={(value) => {
                setView(value as CalendarView);
              }}
              className="w-[300px]"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">Día</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mes</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="overflow-hidden !gap-0 pb-0">
              <CardHeader className="pb-2 border-b">
                <CalendarHeader
                  dateInfo={dateInfo}
                  navigate={navigate}
                  goToToday={() => setCurrentDate(new Date())}
                />
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-auto">
                  {view === "month" && (
                    <MonthView
                      currentDate={currentDate}
                      onEventClick={handleEventClick}
                      calEvent={filteredEvents}
                    />
                  )}
                  {view === "week" && (
                    <WeekView
                      currentDate={currentDate}
                      currentTime={currentTime}
                      onEventClick={handleEventClick}
                      calEvent={filteredEvents}
                    />
                  )}
                  {view === "day" && (
                    <DayView
                      currentDate={currentDate}
                      currentTime={currentTime}
                      onEventClick={handleEventClick}
                      CalEvent={filteredEvents}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <UpcomingEvents
              events={upcomingEvents}
              onEventClick={handleEventClick}
              isLoading={isLoadingEvent}
            />

            <EventFilters
              eventTypeFilters={eventTypeFilters}
              handleEventTypeFilterChange={handleEventTypeFilterChange}
              courseFilters={courseFilters}
              handleCourseFilterChange={handleCourseFilterChange}
              courses={courses}
              isLoading={isLoadingCourses}
            />
          </div>
        </div>

        {isOpenDetailEvent && (
          <EventDetail
            isOpen={isOpenDetailEvent}
            setIsOpen={setIsOpenDetailEvent}
            event={selectedEvent}
          />
        )}
      </div>
    </>
  );
}
