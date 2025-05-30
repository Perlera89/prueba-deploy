interface User {
  email: string;
  role: string;
  isActive: string;
}

export interface Student {
  id: string;
  studentCode: string;
  names: string;
  surnames: string;
  imagePerfil: string;
  user: User;
  email: string;
  role: string;
  state: string;
  createdAt: string;
  updatedAt: string;
  lastActivity: string;
  enrollmentId: string;
  enrollmentStatus: string;
  enrollmentDate: string;
}
