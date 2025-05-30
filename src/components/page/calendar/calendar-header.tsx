import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

export function CalendarHeader({
  dateInfo,
  navigate,
  goToToday
}: {
  dateInfo: { title: string };
  navigate: (step: number) => void;
  goToToday: () => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <CardTitle className="text-lg">{dateInfo.title}</CardTitle>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" onClick={goToToday}>
          Hoy
        </Button>
        <Button variant="ghost" size="icon" onClick={() => navigate(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
