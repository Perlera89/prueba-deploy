import { SubmissionStatus } from "@/types";
import { Student } from "./Student";

export interface AssignmentSubmission {
  id: string;
  status: SubmissionStatus;
  quailification?: number;
  submittedAt?: Date;
  attachment?: File[];
  feedback?: string;
  studentProfile: Partial<Student>;
}
