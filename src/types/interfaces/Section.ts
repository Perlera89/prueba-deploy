import { Content } from "@/types";

export interface Section {
  id?: string;
  sectionNumber: number;
  title: string;
  dateRange: {
    startDate: Date;
    endDate: Date;
  };
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
  courseContents: Content[];
}
