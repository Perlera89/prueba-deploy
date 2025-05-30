export interface PostCategory {
  id: string;
  name: string;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  moduleId: string;
  forumCount: number;
}

export interface Author {
  id: string;
  name: string;
  lastName: string;
  title: string;
  profileImage: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  isVisible: boolean;
  isClosed: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: Partial<Author>;
  category: Partial<PostCategory>;
  moduleId: string;
}

export interface Reply {
  id: string;
  reply: string;
  isDeleted: boolean;
  wasEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
  author: Partial<Author>;
  forumId: string;
  isOptimisctic: boolean;
  replyId: string;
}
export interface ReplyProps {
  replyId: string;
  forumId: string;
}
