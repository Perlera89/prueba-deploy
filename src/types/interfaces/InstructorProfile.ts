import { InstructorCourses } from "./InstructorCourses";
import { User } from "./User";

export interface InstructorProfile {
  id: string;
  email: string;
  password: string;
  instructorCode: string;
  names: string;
  surnames: string;
  title?: string;
  aboutMe?: string;
  thelephone?: string;
  coursesCount: number;
  contactInfo?: Record<string, string>;
  socialLinks?: Record<string, string>;
  imagePerfil?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  user: User;
  instructorCoursesProfile: InstructorCourses[];
}
