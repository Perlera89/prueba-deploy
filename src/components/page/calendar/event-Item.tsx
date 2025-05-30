import { CalendarEvent } from "@/types";
import dayjs from "dayjs";

export function EventItem({
  event,
  onEventClick,
  showMoreIndicator,
  moreCount,
  onClick,
}: {
  event: CalendarEvent;
  onEventClick: (event: CalendarEvent) => void;
  showMoreIndicator?: boolean;
  moreCount?: number;
  onClick?: () => void;
}) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick();
    } else {
      onEventClick(event);
    }
  };

  return (
    <div
      className={`px-2 py-1 text-xs font-medium rounded cursor-pointer 
        hover:opacity-80 transition-opacity 
        ${event.type === "assignment" ? "bg-orange-500/10" : "bg-blue-500/10"}
        text-foreground border mb-1`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col truncate">
          <span className="truncate">{event.title}</span>
          <span className="text-[10px] opacity-80">
            {dayjs(event.start).format("HH:mm")}
          </span>
        </div>

        {/* Indicador de más eventos si es necesario */}
        {showMoreIndicator && moreCount && moreCount > 0 && (
          <div className="ml-1 text-[10px] bg-muted-foreground/20 rounded px-1 self-start mt-0.5 font-normal">
            +{moreCount} más
          </div>
        )}
      </div>
    </div>
  );
}