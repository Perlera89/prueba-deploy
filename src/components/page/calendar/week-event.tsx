import dayjs from "dayjs";
import { useState } from "react";
import { CalendarEvent, WeekViewProps } from "@/types";
import { X } from "lucide-react"; // Importar icono X para cerrar
import { EventItem } from "./event-Item";

export function WeekView({
  currentDate,
  onEventClick,
  calEvent,
}: WeekViewProps) {
  const [activeTimeSlot, setActiveTimeSlot] = useState<string | null>(null);

  const MAX_VISIBLE_EVENTS = 1;
  const weekDays = generateWeekDays(currentDate);
  const timeSlots = generateTimeSlots();

  const eventsByDayAndTime = organizeEventsByDayAndTime(
    weekDays,
    timeSlots,
    calEvent
  );

  // Cambio a handleMouseEnter/handleMouseLeave por onClick
  const handleTimeSlotClick = (dayIndex: number, hour: string) => {
    const key = `${dayIndex}-${hour}`;
    const eventsCount = eventsByDayAndTime[key]?.length || 0;

    if (eventsCount > MAX_VISIBLE_EVENTS) {
      // Toggle activo/inactivo
      setActiveTimeSlot(activeTimeSlot === key ? null : key);
    }
  };

  // Función para cerrar el popup
  const handleClosePopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTimeSlot(null);
  };

  return (
    <div className="min-w-[800px] flex flex-col h-full">
      <div className="grid grid-cols-8 bg-muted/20 sticky top-0 z-10">
        <div className="text-center text-xs font-medium py-2 text-muted-foreground">
          Hora
        </div>
        {weekDays.map((day) => (
          <div
            key={day.date.toString()}
            className={`text-center py-2 ${day.isToday ? "bg-primary/5" : ""}`}
          >
            <div className="text-xs font-medium text-muted-foreground">
              {dayjs(day.date).format("ddd")}
            </div>
            <div
              className={`text-sm font-semibold ${day.isToday ? "text-primary" : ""}`}
            >
              {dayjs(day.date).format("D")}
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
        <div className="divide-y">
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 min-h-[80px]">
              <div className="text-xs font-medium text-muted-foreground p-2 text-center">
                {time}
              </div>

              {weekDays.map((day, dayIndex) => {
                const slotKey = `${dayIndex}-${time}`;
                const eventsInSlot = eventsByDayAndTime[slotKey] || [];

                return (
                  <div
                    key={`${day.date}-${time}`}
                    className={`border-l p-1 relative ${day.isToday ? "bg-primary/5" : ""}`}
                    onClick={() => handleTimeSlotClick(dayIndex, time)}
                  >
                    <div className="space-y-1">
                      {(activeTimeSlot !== slotKey
                        ? eventsInSlot.slice(0, MAX_VISIBLE_EVENTS)
                        : []
                      ).map((event: CalendarEvent, eventIndex: number) => (
                        <EventItem
                          key={eventIndex}
                          event={event}
                          onEventClick={onEventClick}
                          onClick={
                            eventsInSlot.length > MAX_VISIBLE_EVENTS
                              ? () => handleTimeSlotClick(dayIndex, time)
                              : undefined
                          }
                        />
                      ))}
                      {/* Mostrar indicador "+X más" si hay eventos adicionales y no está activo */}
                      {activeTimeSlot !== slotKey &&
                        eventsInSlot.length > MAX_VISIBLE_EVENTS && (
                          <div
                            className="text-xs text-muted-foreground font-medium py-1 text-center cursor-pointer hover:bg-muted/50 rounded"
                            onClick={() => handleTimeSlotClick(dayIndex, time)}
                          >
                            +{eventsInSlot.length - MAX_VISIBLE_EVENTS} más
                          </div>
                        )}
                      {activeTimeSlot === slotKey &&
                        eventsInSlot.length > MAX_VISIBLE_EVENTS && (
                          <div
                            className={`absolute left-0 z-50 bg-background border rounded-md shadow-lg 
                            p-2 min-w-[220px] max-h-[180px] overflow-y-auto mb-1
                            ${parseInt(time.split(":")[0]) >= 20 ? "bottom-full" : "top-full"}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Botón para cerrar */}
                            <button
                              className="absolute right-1 top-1 p-1 rounded-full hover:bg-muted/50"
                              onClick={handleClosePopup}
                            >
                              <X className="h-3 w-3" />
                            </button>

                            <div className="space-y-1 mt-1 pt-2">
                              <h4 className="text-xs font-medium mb-2 px-2">
                                Eventos a las {time} -{" "}
                                {dayjs(day.date).format("ddd D")}
                              </h4>
                              {eventsInSlot.map(
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
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function generateWeekDays(currentDate: Date) {
  const startOfWeek = dayjs(currentDate).startOf("week");
  const today = dayjs();

  return Array.from({ length: 7 }).map((_, index) => {
    const date = startOfWeek.add(index, "day").toDate();
    const isToday = dayjs(date).isSame(today, "day");

    return {
      date,
      isToday,
    };
  });
}

function generateTimeSlots() {
  return Array.from({ length: 24 }).map((_, index) => {
    const hour = index + 0;
    return `${hour}:00`;
  });
}

function organizeEventsByDayAndTime(
  weekDays: any[],
  timeSlots: string[],
  events: CalendarEvent[]
) {
  const organized: Record<string, CalendarEvent[]> = {};

  events.forEach((event) => {
    const eventDate = dayjs(event.start);
    const eventHour = eventDate.hour();

    const dayIndex = weekDays.findIndex((day) =>
      dayjs(day.date).isSame(eventDate, "day")
    );

    if (dayIndex !== -1) {
      const closestTimeSlot = timeSlots.find((slot) => {
        const slotHour = parseInt(slot.split(":")[0]);
        return slotHour === eventHour;
      });

      if (closestTimeSlot) {
        const key = `${dayIndex}-${closestTimeSlot}`;

        if (!organized[key]) {
          organized[key] = [];
        }

        organized[key].push(event);
      }
    }
  });

  return organized;
}
