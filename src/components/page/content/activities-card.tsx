import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardList, Clock } from "lucide-react";
import Link from "next/link";
import { useFetchEventsUpcoming } from "@/hooks/use-event";
import dayjs from "dayjs";
import ActivitySkeleton from "../courses/skeleton/activities-skeleton";
import { useModuleStore } from "@/store/module";

export default function ActivitiesCard() {
  const moduleId = useModuleStore((state) => state.module.id);
  const { data: events = [], isLoading } = useFetchEventsUpcoming(moduleId);

  return (
    <>
      {isLoading ? (
        <ActivitySkeleton />
      ) : (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Próximas Actividades</CardTitle>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <div className="bg-orange-500/20 p-1.5 rounded-md">
                        <ClipboardList className="h-4 w-4 text-orange-500" />
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>
                          {dayjs(event.dueDate).format("D [de] MMMM HH:mm")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Clock className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <h3 className="mt-3 text-sm font-medium">No hay actividades</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Las actividades del curso aparecerán aquí.
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/calendar">Ver Calendario Completo</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
