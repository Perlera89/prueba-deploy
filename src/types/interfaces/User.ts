import { UserRole } from "../enums/UserRole";
import { InstructorProfile } from "./InstructorProfile";

export interface User {
  id: string;
  email: string;
  names: string;
  surnames: string;
  fullName: string;
  studentCode?: string;
  identifier?: string;
  code: string;
  role: UserRole;
  profileId: string;
  password: string;
  passwordHash: string;
  refreshToken?: string;
  createdAt: Date;
  modifiedAt: Date;
  instructorProfile: InstructorProfile[];
  instructorRequest?: boolean;
  profileImage?: string;
}
