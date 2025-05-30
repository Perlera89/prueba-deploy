import dayjs from "dayjs";
import { CalendarEvent, MonthViewProps } from "@/types";
import { useState } from "react";

export function MonthView({
  currentDate,
  onEventClick,
  calEvent,
}: MonthViewProps) {
  const [activeDay, setActiveDay] = useState<number | null>(null);

  const MAX_VISIBLE_EVENTS = 2;

  const handleMouseEnter = (index: number, eventsCount: number) => {
    if (eventsCount > MAX_VISIBLE_EVENTS) {
      setActiveDay(index);
    }
  };

  return (
    <div className="min-w-[800px]">
      <div className="grid grid-cols-7 bg-muted/20">
        {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium py-2 text-muted-foreground"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {generateCalendarDays(currentDate, calEvent).map((day, index) => (
          <div
            key={index}
            className={`min-h-[90px] border-b border-r p-1 relative
                ${day.isCurrentMonth ? "" : "bg-muted/10"}
                ${day.isToday ? "bg-primary/5" : ""}
              `}
            onMouseEnter={() => handleMouseEnter(index, day.events.length)}
            onMouseLeave={() => setActiveDay(null)}
          >
            <div
              className={`flex justify-end mb-1 ${day.isToday ? "font-bold" : ""}`}
            >
              <span
                className={`flex items-center justify-center h-6 w-6 rounded-full text-xs
                  ${day.isToday ? "bg-primary text-primary-foreground" : day.isCurrentMonth ? "" : "text-muted-foreground"}
                `}
              >
                {day.day}
              </span>
            </div>
            <div className="space-y-1">
              {(activeDay !== index
                ? day.events.slice(0, MAX_VISIBLE_EVENTS)
                : day.events.length <= MAX_VISIBLE_EVENTS
                  ? day.events
                  : []
              ).map((event: CalendarEvent, eventIndex: number) => (
                <EventItem
                  key={eventIndex}
                  event={event}
                  onEventClick={onEventClick}
                />
              ))}

              {activeDay !== index &&
                day.events.length > MAX_VISIBLE_EVENTS && (
                  <div className="text-xs text-muted-foreground font-medium py-1 text-center">
                    +{day.events.length - MAX_VISIBLE_EVENTS} más
                  </div>
                )}


              {activeDay === index &&
                day.events.length > MAX_VISIBLE_EVENTS && (
                  <div className="absolute left-0 top-8 z-50 bg-background border rounded-md shadow-lg p-2 min-w-[180px] max-w-[250px] max-h-[300px] overflow-y-auto">
                    <div className="space-y-1">
                      {day.events.map(
                        (event: CalendarEvent, eventIndex: number) => (
                          <EventItem
                            key={eventIndex}
                            event={event}
                            onEventClick={onEventClick}
                          />
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EventItem({
  event,
  onEventClick,
}: {
  event: CalendarEvent;
  onEventClick: (event: CalendarEvent) => void;
}) {
  return (
    <div
      className={`px-2 py-3 text-xs font-medium rounded cursor-pointer hover:opacity-80 transition-opacity ${event.type === "assignment" ? "bg-orange-500/10" : "bg-blue-500/10"} text-foreground border`}
      onClick={() => onEventClick(event)}
    >
      <div className="flex items-start">
        <div className="flex flex-col gap-1 truncate">
          <span>{event.title}</span>
          <span>{dayjs(event.end).format("HH:MM")}</span>
        </div>
      </div>
    </div>
  );
}

function generateCalendarDays(date: Date, calEvent: CalendarEvent[]) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const daysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const days = [];

  const prevMonthIndex = month === 0 ? 11 : month - 1;
  const prevMonthYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = new Date(prevMonthYear, prevMonthIndex + 1, 0).getDate();

  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNumber = daysInPrevMonth - i;
    days.push({
      day: dayNumber,
      isCurrentMonth: false,
      isToday: false,
      events: calEvent.filter(
        (event: CalendarEvent) => {
          const eventDate = dayjs(event.start);
          return eventDate.year() === prevMonthYear &&
            eventDate.date() === dayNumber &&
            eventDate.month() === prevMonthIndex;
        }
      ),
    });
  }
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      today.getDate() === i &&
      today.getMonth() === month &&
      today.getFullYear() === year;

    days.push({
      day: i,
      isCurrentMonth: true,
      isToday,
      events: calEvent.filter(
        (event: CalendarEvent) => {
          const eventDate = dayjs(event.start);
          return eventDate.year() === year &&
            eventDate.date() === i &&
            eventDate.month() === month;
        }
      ),
    });
  }
  const nextMonthIndex = month === 11 ? 0 : month + 1;
  const nextMonthYear = month === 11 ? year + 1 : year;

  const remainingDays = 35 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
      events: calEvent.filter(
        (event: CalendarEvent) => {
          const eventDate = dayjs(event.start);
          return eventDate.year() === nextMonthYear &&
            eventDate.date() === i &&
            eventDate.month() === nextMonthIndex;
        }
      ),
    });
  }

  return days;
}
