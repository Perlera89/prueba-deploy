import { InstructorProfile, Picture, Schedule, Section } from "@/types";

interface Objetives {
  general: string;
  specific: string[];
}

export interface ModuleInfo {
  id: string;
  objectives: Objetives;
  description: string;
  methodology: string;
  preRequisite: string;
  weekDuration: number;
  finalDate: Date;
  moduleId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  description: string;
  sectionsCount: number;
  title: string;
  meetingLink: string;
  progress: number;
  picture: Picture;
  isVisible: boolean;
  instructor?: InstructorProfile;
  isInstructor?: boolean;
  instructorId?: string;
  moduleSchedules?: Schedule[];
  moduleSections?: Section[];
  moduleInfo?: ModuleInfo;
}
