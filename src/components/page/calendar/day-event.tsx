import {
  CalendarEvent,
  DayViewProps,
} from "@/types";
import dayjs from "dayjs";
import { useState } from "react";
import { X } from "lucide-react"; // Importa el icono de X para cerrar
import { EventItem } from "./event-Item";

export function DayView({
  currentDate,
  currentTime,
  onEventClick,
  CalEvent,
}: DayViewProps) {
  const hours: number[] = Array.from({ length: 24 }, (_, i) => i);
  const MAX_VISIBLE_EVENTS = 1;
  const [activeHour, setActiveHour] = useState<number | null>(null);

  const currentDayjs = dayjs(currentDate);
  const todayDayjs = dayjs();
  const isToday = currentDayjs.isSame(todayDayjs, "day");

  const dayEvents: CalendarEvent[] = getDayEvents(currentDayjs, CalEvent);

  const eventsByHour = organizeEventsByHour(dayEvents);

  const handleHourClick = (hour: number) => {
    if (eventsByHour[hour]?.length > MAX_VISIBLE_EVENTS) {
      setActiveHour(activeHour === hour ? null : hour);
    }
  };

  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHour(null);
  };

  return (
    <div className="min-w-[600px]">
      <div className="grid grid-cols-1 border-b p-3 bg-muted/10">
        <div className="text-center">
          <div className="text-lg font-medium">{currentDayjs.date()}</div>
          <div className="text-xs text-muted-foreground">
            {currentDayjs.format("dddd")}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[60px_1fr]">
        <div className="relative" style={{ height: "960px" }}>
          {hours.map((hour) => (
            <div
              key={hour}
              className="absolute w-full border-r border-b"
              style={{ top: `${hour * 40}px`, height: "40px" }}
            >
              <div className="flex h-full items-center justify-end pr-2">
                <span className="text-xs text-muted-foreground">
                  {dayjs().hour(hour).minute(0).format("HH:mm")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative" style={{ height: "960px" }}>
          {hours.map((hour) => (
            <div
              key={hour}
              className="absolute w-full border-b"
              style={{ top: `${hour * 40}px`, height: "40px" }}
              onClick={() => handleHourClick(hour)}
            >
              <div
                className="absolute w-full border-t border-dashed border-muted/30"
                style={{ top: "20px" }}
              ></div>

              <div className="relative h-full px-2 py-1">
                <div className="space-y-1">
                  {(activeHour !== hour
                    ? (eventsByHour[hour] || []).slice(0, MAX_VISIBLE_EVENTS)
                    : []
                  ).map((event, index) => (
                    <EventItem
                      key={index}
                      event={event}
                      onEventClick={onEventClick}
                      showMoreIndicator={(eventsByHour[hour] || []).length > MAX_VISIBLE_EVENTS}
                      moreCount={(eventsByHour[hour] || []).length - MAX_VISIBLE_EVENTS}
                      onClick={() => {
                        if ((eventsByHour[hour] || []).length <= MAX_VISIBLE_EVENTS) {
                          onEventClick(event);
                        } else {
                          handleHourClick(hour);
                        }
                      }}
                    />
                  ))}

                  {activeHour === hour &&
                    (eventsByHour[hour] || []).length > MAX_VISIBLE_EVENTS && (
                      <div
                        className="absolute left-0 z-50 bg-background border rounded-md shadow-lg p-2 min-w-[220px] max-h-[180px] overflow-y-auto mb-1 bottom-full"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="absolute right-1 top-1 p-1 rounded-full hover:bg-muted/50"
                          onClick={handleClosePopup}
                        >
                          <X className="h-3 w-3" />
                        </button>

                        <div className="space-y-1 mt-1 pt-2">
                          <h4 className="text-xs font-medium mb-2 px-2">
                            Eventos a las {hour}:00
                          </h4>
                          {(eventsByHour[hour] || []).map((event, eventIndex) => (
                            <EventItem
                              key={eventIndex}
                              event={event}
                              onEventClick={onEventClick}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))}

          {isToday && (
            <div
              className="absolute z-10 left-0 right-0 flex items-center pointer-events-none"
              style={{
                top: `${(dayjs(currentTime).hour() * 60 + dayjs(currentTime).minute()) * (40 / 60)}px`,
              }}
            >
              <div className="h-px bg-red-500 w-full"></div>
              <div className="h-2 w-2 rounded-full bg-red-500 absolute -left-1"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function organizeEventsByHour(events: CalendarEvent[]) {
  const organized: Record<number, CalendarEvent[]> = {};

  events.forEach(event => {
    const eventHour = dayjs(event.end).hour();

    if (!organized[eventHour]) {
      organized[eventHour] = [];
    }

    organized[eventHour].push(event);
  });

  return organized;
}

function getDayEvents(
  date: dayjs.Dayjs,
  calEvent: CalendarEvent[] | undefined
) {
  if (!calEvent || !Array.isArray(calEvent)) return [];

  return calEvent.filter((event) => {
    if (!event.end) return false;

    const eventEnd = dayjs(event.end);
    return eventEnd.isSame(date, "day");
  });
}
