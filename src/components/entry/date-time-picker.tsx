"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CalendarIcon } from "lucide-react";

interface DateTimePickerProps {
  placeholder: string;
  value?: Date;
  onChange?: (date: Date) => void;
}

export function DateTimePicker({
  placeholder,
  value,
  onChange,
}: DateTimePickerProps) {
  // const [date, setDate] = React.useState<Date>();
  // const [isOpen, setIsOpen] = React.useState(false);

  // Asegurarnos de que value siempre sea un objeto Date si existe
  const dateValue = value
    ? value instanceof Date
      ? value
      : new Date(value)
    : undefined;

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      const now = new Date();

      const isToday =
        selectedDate.getDate() === now.getDate() &&
        selectedDate.getMonth() === now.getMonth() &&
        selectedDate.getFullYear() === now.getFullYear();
      if (dateValue) {
        let hours = dateValue.getHours();
        let minutes = dateValue.getMinutes();

        if (isToday && hours < now.getHours()) {
          hours = now.getHours();
          minutes = now.getMinutes();
        } else if (
          isToday &&
          hours === now.getHours() &&
          minutes < now.getMinutes()
        ) {
          minutes = now.getMinutes();
        }

        newDate.setHours(hours, minutes);
      } else if (isToday) {
        newDate.setHours(now.getHours(), now.getMinutes());
        newDate.setMinutes(newDate.getMinutes() + 1);
      }

      onChange?.(newDate);
    }
  };
  const handleTimeChange = (type: "hour" | "minute", newValue: number) => {
    const currentDate = dateValue ? new Date(dateValue) : new Date();

    if (type === "hour") {
      currentDate.setHours(newValue);
      if (!dateValue || currentDate.getHours() !== dateValue.getHours()) {
        currentDate.setMinutes(0);
      }
    } else if (type === "minute") {
      currentDate.setMinutes(newValue);
    }

    if (onChange) {
      onChange(currentDate);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateValue && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />{" "}
          {dateValue ? (
            format(dateValue, "dd/MM/yyyy HH:mm")
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={dateValue}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              const dateWithoutTime = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
              );
              const todayWithoutTime = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
              );

              return dateWithoutTime < todayWithoutTime;
            }}
            initialFocus
          />
          <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {hours.reverse().map((hour) => {
                  const now = new Date();
                  const isToday =
                    dateValue &&
                    dateValue.getDate() === now.getDate() &&
                    dateValue.getMonth() === now.getMonth() &&
                    dateValue.getFullYear() === now.getFullYear();
                  const isPastHour = isToday && hour < now.getHours();

                  return (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        dateValue && dateValue.getHours() === hour
                          ? "default"
                          : "ghost"
                      }
                      className={cn(
                        "sm:w-full shrink-0 aspect-square",
                        isPastHour && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() =>
                        !isPastHour && handleTimeChange("hour", hour)
                      }
                      disabled={isPastHour}
                    >
                      {hour}
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
            <ScrollArea className="w-64 sm:w-auto">
              <div className="flex sm:flex-col p-2">
                {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
                  const now = new Date();
                  const isCurrentTimeHour =
                    dateValue &&
                    dateValue.getDate() === now.getDate() &&
                    dateValue.getMonth() === now.getMonth() &&
                    dateValue.getFullYear() === now.getFullYear() &&
                    dateValue.getHours() === now.getHours();
                  const isPastMinute =
                    isCurrentTimeHour && minute < now.getMinutes();

                  return (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        dateValue && dateValue.getMinutes() === minute
                          ? "default"
                          : "ghost"
                      }
                      className={cn(
                        "sm:w-full shrink-0 aspect-square",
                        isPastMinute && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() =>
                        !isPastMinute && handleTimeChange("minute", minute)
                      }
                      disabled={isPastMinute}
                    >
                      {minute.toString().padStart(2, "0")}
                    </Button>
                  );
                })}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
