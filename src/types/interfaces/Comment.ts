import { Author } from "./Forum";

export interface Comment {
  id: string,
  comment: string,
  isDeleted: boolean,
  wasEdited: boolean,
  createdAt: Date,
  updatedAt: Date,
  author: Partial<Author>
}