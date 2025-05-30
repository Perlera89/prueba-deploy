import { ContentType } from "@/types";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  start: Date;
  end: Date;
  color: string;
  allDay: false;
  courseTitle: string;
  courseCode: string;
  sectionTitle: string;
  score: number;
  isGraded: boolean;
  type: ContentType;
  submissionStatus: string;
  instructor: string;
}
export interface WeekViewProps {
  currentDate: Date;
  currentTime: Date;
  onEventClick: (event: CalendarEvent) => void;
  calEvent: CalendarEvent[];
}
export interface DayViewProps {
  currentDate: Date;
  currentTime: Date;
  onEventClick: (event: CalendarEvent) => void;
  CalEvent: CalendarEvent[];
}

export interface MonthViewProps {
  currentDate: Date;
  onEventClick: (event: CalendarEvent) => void;
  calEvent: CalendarEvent[];
}

export enum EventType {
  ASSIGNMENT = "assignment",
  ANNOUNCEMENT = "announcement"
}