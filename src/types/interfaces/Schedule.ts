export interface Schedule {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  createdAt: Date;
  updatedAt: Date;
  courseId: string;
}
