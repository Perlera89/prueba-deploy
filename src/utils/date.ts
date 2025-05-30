import { da } from "date-fns/locale";

export const dayOptions = [
  { key: "monday", value: "Lunes" },
  { key: "tuesday", value: "Martes" },
  { key: "wednesday", value: "Miércoles" },
  { key: "thursday", value: "Jueves" },
  { key: "friday", value: "Viernes" },
  { key: "saturday", value: "Sábado" },
  { key: "sunday", value: "Domingo" },
];

export const getDayValue = (key: string | undefined): string | undefined => {
  const day = dayOptions.find((option) => option.key === key);
  return day?.value;
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function getDateInfo(date: Date, view: string) {
  const options = {

    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: 'long',
  };

  if (view === "day") {
    options.day = "numeric";
    options.weekday = "long";
  } else if (view === "week") {
    const startDate = new Date(date);
    const day = startDate.getDay();
    const diff = startDate.getDate() - day + (day === 0 ? -6 : 1); // Ajustar cuando es domingo
    startDate.setDate(diff);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const startFormatted = startDate.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
    const endFormatted = endDate.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
      year:
        startDate.getFullYear() !== endDate.getFullYear()
          ? "numeric"
          : undefined,
    });

    return {
      title: `${startFormatted} - ${endFormatted}`,
    };
  }

  const formatter = new Intl.DateTimeFormat("es-ES", options as Intl.DateTimeFormatOptions);
  return {
    title: formatter.format(date),
  };
}


export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}