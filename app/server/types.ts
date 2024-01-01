import { type Document } from "mongoose";

export interface UserDocument extends Document {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type PostDocument = {
  _id: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  categories: string[];
  coverImage: {
    url: string;
    id: string;
  };
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};
