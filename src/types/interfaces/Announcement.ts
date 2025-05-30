import { AnnouncementPriority } from "../enums/AnnouncementPriority";
import { Course } from "./Course";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  type: AnnouncementPriority | string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  course: Course;
}
