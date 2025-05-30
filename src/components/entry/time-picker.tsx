"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Clock, X, ChevronUp, ChevronDown } from "lucide-react";
import dayjs from "dayjs";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
  format?: string;
}

export function TimePicker({
  value,
  onChange,
  className,
  format = "HH:mm",
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeValue, setTimeValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [scrollPosition, setScrollPosition] = useState({
    hours: 0,
    minutes: 0,
  });

  // Genera opciones de horas (00-23) y minutos (00-59)
  const hoursOptions = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const minutesOptions = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  // Parsea una cadena de tiempo en componentes de hora y minuto
  const parseTime = (timeString: string) => {
    if (!timeString) return { hours: "00", minutes: "00" };

    const match = timeString.match(/(\d{1,2}):(\d{1,2})/);
    if (match) {
      const [_, hours, minutes] = match;
      return {
        hours: hours.padStart(2, "0"),
        minutes: minutes.padStart(2, "0"),
      };
    }

    return { hours: "00", minutes: "00" };
  };

  // Extrae las horas y minutos del valor actual
  const { hours, minutes } = parseTime(timeValue);

  // Formatear tiempo según el formato especificado
  const formatTimeValue = (h: string, m: string) => {
    const date = dayjs().hour(parseInt(h)).minute(parseInt(m));
    return date.format(format);
  };

  // Inicialización y actualización del valor
  useEffect(() => {
    if (value) {
      const { hours, minutes } = parseTime(value);
      const formattedValue = formatTimeValue(hours, minutes);
      setTimeValue(formattedValue);
    } else if (!timeValue) {
      // Valor inicial por defecto
      setTimeValue(formatTimeValue("00", "00"));
    }
  }, [value, format]);

  // Actualizar posición de desplazamiento cuando cambian las horas o minutos
  useEffect(() => {
    const { hours, minutes } = parseTime(timeValue);

    const hoursIndex = hoursOptions.indexOf(hours);
    if (hoursIndex !== -1) {
      setScrollPosition((prev) => ({
        ...prev,
        hours: Math.max(0, hoursIndex - 3),
      }));
    }

    const minutesIndex = minutesOptions.indexOf(minutes);
    if (minutesIndex !== -1) {
      setScrollPosition((prev) => ({
        ...prev,
        minutes: Math.max(0, minutesIndex - 3),
      }));
    }
  }, [timeValue]);

  // Maneja la selección de horas o minutos
  const handleTimeChange = (type: "hours" | "minutes", val: string) => {
    const { hours: currentHours, minutes: currentMinutes } =
      parseTime(timeValue);

    let newHours = currentHours;
    let newMinutes = currentMinutes;

    if (type === "hours") newHours = val;
    if (type === "minutes") newMinutes = val;

    // Formato para mostrar en UI
    const formattedTime = formatTimeValue(newHours, newMinutes);
    setTimeValue(formattedTime);

    // Formato estándar para el valor de retorno
    const standardTime = `${newHours}:${newMinutes}`;
    onChange?.(standardTime);
  };

  // Establece la hora actual
  const handleNowClick = () => {
    const now = dayjs();
    const h = now.format("HH");
    const m = now.format("mm");

    // Formato para mostrar en UI
    const formattedTime = formatTimeValue(h, m);
    setTimeValue(formattedTime);

    // Formato estándar para el valor de retorno
    const standardTime = `${h}:${m}`;
    onChange?.(standardTime);
  };

  // Limpia el campo
  const handleClearClick = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setTimeValue("");
    onChange?.("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Navegación de opciones
  const handleScroll = (
    type: "hours" | "minutes",
    direction: "up" | "down"
  ) => {
    const maxItems =
      type === "hours" ? hoursOptions.length : minutesOptions.length;

    setScrollPosition((prev) => ({
      ...prev,
      [type]:
        direction === "up"
          ? Math.max(0, prev[type] - 1)
          : Math.min(maxItems - 7, prev[type] + 1),
    }));
  };

  // Obtiene un subconjunto de opciones para mostrar
  const getVisibleOptions = (options: string[], startIndex: number) => {
    return options.slice(startIndex, startIndex + 7);
  };

  const visibleHours = getVisibleOptions(hoursOptions, scrollPosition.hours);
  const visibleMinutes = getVisibleOptions(
    minutesOptions,
    scrollPosition.minutes
  );

  // Maneja cambios de texto en el input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setTimeValue(inputValue);

    // Intenta parsear el valor ingresado
    const parsedTime = dayjs(`2023-01-01 ${inputValue}`);
    if (parsedTime.isValid()) {
      onChange?.(parsedTime.format("HH:mm"));
    } else {
      onChange?.(inputValue);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <div className="relative">
            <Input
              ref={inputRef}
              value={timeValue}
              onChange={handleInputChange}
              className={cn(
                "pl-10 pr-8 h-10 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:border-input",
                className
              )}
              placeholder={format}
            />
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          {timeValue && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-2 py-0 hover:bg-transparent"
              onClick={handleClearClick}
            >
              <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent
        className="w-[220px] p-0 border shadow-md rounded-md overflow-hidden"
        align="start"
      >
        <div className="p-3 border-b">
          <div className="text-center font-medium text-lg">{timeValue}</div>
        </div>

        <div className="grid grid-cols-2 gap-0 p-3 text-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">
            Hora
          </div>
          <div className="text-xs font-medium text-muted-foreground mb-1">
            Min
          </div>
        </div>

        <div className="grid grid-cols-2 gap-0 px-3 pb-3 text-center relative">
          <div className="col-span-2 grid grid-cols-2 gap-1 relative z-10">
            {/* Columna de horas */}
            <div className="space-y-1 border-r pr-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-full rounded-md p-0"
                onClick={() => handleScroll("hours", "up")}
                disabled={scrollPosition.hours === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>

              {visibleHours.map((h) => (
                <Button
                  key={`hour-${h}`}
                  variant="ghost"
                  className={cn(
                    "h-9 w-full rounded-md p-0 font-medium hover:bg-muted",
                    h === hours &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => handleTimeChange("hours", h)}
                >
                  {h}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-full rounded-md p-0"
                onClick={() => handleScroll("hours", "down")}
                disabled={scrollPosition.hours >= hoursOptions.length - 7}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            {/* Columna de minutos */}
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-full rounded-md p-0"
                onClick={() => handleScroll("minutes", "up")}
                disabled={scrollPosition.minutes === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>

              {visibleMinutes.map((m) => (
                <Button
                  key={`minute-${m}`}
                  variant="ghost"
                  className={cn(
                    "h-9 w-full rounded-md p-0 font-medium hover:bg-muted",
                    m === minutes &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                  onClick={() => handleTimeChange("minutes", m)}
                >
                  {m}
                </Button>
              ))}

              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-full rounded-md p-0"
                onClick={() => handleScroll("minutes", "down")}
                disabled={scrollPosition.minutes >= minutesOptions.length - 7}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t p-3 bg-muted/50">
          <Button variant="outline" size="sm" onClick={handleNowClick}>
            Ahora
          </Button>
          <Button size="sm" onClick={() => setIsOpen(false)}>
            OK
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
