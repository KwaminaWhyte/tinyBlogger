export type UserDocument = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type PostDocument = {
  _id: string;
  user: UserDocument;
  title: string;
  description: string;
  content: string;
  slug: string;
  categories: CategoryDocument[];
  featureImage: {
    _id: string;
    url: string;
    externalId: string;
  };
  tags: string[];
  likes: string[];
  views: ViewDocument[];
  featured: boolean;
  stage: "PUBLISHED" | "DRAFT" | "UNLISTED";
  comments: CommentDocument[];
  publishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryDocument = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SectionDocument = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentDocument = {
  _id: string;
  post: PostDocument;
  name: string;
  email: string;
  comment: string;
  stage: "PUBLISHED" | "DRAFT" | "UNLISTED";
  createdAt: Date;
  updatedAt: Date;
};

export type ImageDocument = {
  _id: string;
  title: string;
  url: string;
  externalId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface ViewDocument extends Document {
  _id: string;
  post: PostDocument;
  ipAddress: string;
  city: string;
  country: string;
  latitude: string;
  longitude: string;
}
