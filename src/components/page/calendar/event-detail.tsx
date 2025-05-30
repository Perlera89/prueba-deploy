import dayjs from "dayjs";
import { Clock, Users, ClipboardList, Calendar, Bell } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CalendarEvent, ContentType } from "@/types";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

interface EventDetailProps {
  event: CalendarEvent | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function EventDetail({ event, setIsOpen, isOpen }: EventDetailProps) {
  if (!event) return null;

  // Cálculos de fecha y estado
  const now = dayjs();
  const startDate = dayjs(event.start);
  const endDate = dayjs(event.end);

  // Valores memoizados para evitar cálculos repetidos
  const dateInfo = useMemo(() => {
    return {
      formattedDate: startDate.format("DD/MM/YYYY"),
      formattedStartTime: startDate.format("HH:mm"),
      formattedEndTime: endDate.format("HH:mm"),
      isPast: endDate.isBefore(now),
      isActive: endDate.isAfter(now) && startDate.isBefore(now),
      daysRemaining: endDate.diff(now, "day"),
      daysPassed: -endDate.diff(now, "day"),
    };
  }, [startDate, endDate, now]);

  const { formattedDate, formattedEndTime, isPast, isActive } = dateInfo;

  // Estado del evento
  const statusText = isPast
    ? "Finalizado"
    : isActive
      ? "En curso"
      : `Termina en ${endDate.diff(now, "day")} días`;

  // Información de tarea
  const isAssignment = event.type === ContentType.ASSIGNMENT;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {isAssignment ? (
              <div className="mt-0.5">
                <div className="bg-orange-500/20 p-1.5 rounded-md">
                  <ClipboardList className="h-4 w-4 text-orange-500" />
                </div>
              </div>
            ) : (
              <div className="mt-0.5">
                <div className="bg-blue-500/20 p-1.5 rounded-md">
                  <Bell className="h-4 w-4 text-blue-500" />
                </div>
              </div>
            )}
            <DialogTitle>{event.title}</DialogTitle>
          </div>

          <div className="flex items-center gap-2 flex-wrap mt-2">
            <Badge
              variant="outline"
              className={
                isAssignment
                  ? "border-orange-500/10 text-orange-500 bg-orange-500/10"
                  : "border-blue-500/10 text-blue-500 bg-blue-500/10"
              }
            >
              {isAssignment ? "Actividad" : "Anuncio"}
            </Badge>

            {event.courseCode && (
              <Badge className="font-normal">{event.courseCode}</Badge>
            )}

            <Badge
              variant={
                isPast ? "outline" : isActive ? "default" : "destructive"
              }
              className={
                isPast ? "border-muted-foreground text-muted-foreground" : ""
              }
            >
              {statusText}
            </Badge>
          </div>

          <DialogDescription className="text-foreground mt-2">
            {event.courseTitle || "Sin curso asignado"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsContent value="details" className="space-y-4">
            {/* Info boxes */}
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-start gap-1 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {formattedDate}
                    </span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {formattedEndTime}
                    </span>
                  </span>
                  {isAssignment && isPast && (
                    <span className="ml-1 text-destructive font-medium text-xs">
                      • Plazo cumplido
                    </span>
                  )}
                </div>
              </div>
              {event.instructor && (
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <span className="text-muted-foreground">
                    {event.instructor}
                  </span>
                </div>
              )}
            </div>

            {/* Descripción */}
            <div className="text-sm">
              <p className="font-medium mb-1">Descripción</p>
              <div className="text-muted-foreground prose prose-sm max-w-none">
                {event.description || "Sin descripción disponible."}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
