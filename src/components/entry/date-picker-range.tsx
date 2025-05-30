"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerRangeCustomProps {
  value?: {
    startDate: string;
    endDate: string;
  };
  onChange?: (value: { startDate: string; endDate: string }) => void;
}

type DatePickerWithRangeProps = DatePickerRangeCustomProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

export function DatePickerWithRange({
  className,
  value,
  onChange,
}: DatePickerWithRangeProps) {
  // Inicializar el dateRange a partir del value proporcionado o usando valores predeterminados
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    () => {
      if (value?.startDate && value?.endDate) {
        return {
          from: new Date(value.startDate),
          to: new Date(value.endDate),
        };
      }
      return {
        from: new Date(),
        to: addDays(new Date(), 7),
      };
    }
  );


  // Este efecto se encarga de actualizar el formulario cuando cambia la selección de fechas
  React.useEffect(() => {
    if (dateRange?.from && dateRange?.to && onChange) {
      onChange({
        startDate: dateRange.from.toISOString(),
        endDate: dateRange.to.toISOString(),
      });
    }
  }, [dateRange, onChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Selecciona un rango de fechas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
