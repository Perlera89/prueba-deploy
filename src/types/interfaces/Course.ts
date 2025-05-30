import { CourseStatus, Module } from "@/types";

export interface CourseCategory {
  id: number;
  name: string;
  description: string;
  isArchive: boolean;
  isDeleted: boolean;
  isDisabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Picture {
  title: string;
  fileExtension: string;
  url: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  courseCode: string;
  status: CourseStatus;
  progress: number;
  price?: number;
  picture?: Picture;
  isVisible: boolean;
  moduleCount: number;
  isArchived: boolean;
  categoryId?: number;
  modules?: Module;
  createdAt?: Date;
  updateAt?: Date;
  instructorProfiles?: any[];
  courseCategory?: CourseCategory;
}
