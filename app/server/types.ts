import { type Document } from "mongoose";

export interface UserDocument extends Document {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface BlogDocument extends Document {
  id: string;
  title: string;
  content: string;
  categories: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
