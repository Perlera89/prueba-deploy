import { BookOpen, ClipboardList, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarEvent, ContentType } from "@/types";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface UpcomingEventsProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
  isLoading?: boolean;
}

export function UpcomingEvents({
  events,
  onEventClick,
  isLoading,
}: UpcomingEventsProps) {
  const upcomingEvents = events.filter((event) =>
    dayjs(event.end).isAfter(dayjs())
  );

  const sortedEvents = [...upcomingEvents].sort((a, b) =>
    dayjs(a.end).diff(dayjs(b.end))
  );

  const ActivitiesSkeleton = () => (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="p-3 hover:bg-muted/30 transition-colors cursor-pointer"
        >
          <div className="flex items-start">
            <div className="mr-3 mt-0.5">
              <Skeleton className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-3 w-full" />
            </div>

            <Skeleton className="h-4 w-16 ml-8" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-primary" />
          <CardTitle className="text-base">Próximos Eventos</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        <div className="divide-y max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/30">
          {sortedEvents.length > 0 ? (
            sortedEvents.map((event) => (
              <EventItem key={event.id} event={event} onClick={onEventClick} />
            ))
          ) : isLoading ? (
            <ActivitiesSkeleton />
          ) : (
            <div className="text-center py-6">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
              <h3 className="mt-3 text-sm font-medium">No hay eventos</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Las los eventos del calendario aparecerán aquí.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EventItem({
  event,
  onClick,
}: {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}) {
  return (
    <div
      className="p-3 hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={() => onClick(event)}
    >
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {event.type === ContentType.ASSIGNMENT ? (
            <div className="mt-0.5">
              <div className="bg-orange-500/20 p-1.5 rounded-md">
                <ClipboardList className="h-4 w-4 text-orange-500" />
              </div>
            </div>
          ) : (
            <BookOpen className="h-4 w-4 text-blue-500" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">{event.title}</p>
            <div className="flex items-end gap-1">
              <Badge
                variant="outline"
                className={`${event.type === ContentType.ASSIGNMENT ? "bg-orange-500/10 text-orange-500 border-orange-500/10" : "border-blue-500/10 bg-blue-500/10 text-blue-500"}`}
              >
                {event.type === ContentType.ASSIGNMENT
                  ? "Tarea"
                  : event.type === ContentType.MATERIAL
                    ? "Contenido"
                    : "Contenido"}
              </Badge>
            </div>
          </div>
          <div className="flex items-center mt-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            <span>
              {dayjs(event.end).format("DD/MM")} •{" "}
              {dayjs(event.end).format("HH:mm")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
