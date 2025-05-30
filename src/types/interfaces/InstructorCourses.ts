import { Course } from "./Course";
import { InstructorProfile } from "./InstructorProfile";

export interface InstructorCourses {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  course: Course;
  instructorId: string;
  instructor: InstructorProfile;
}
