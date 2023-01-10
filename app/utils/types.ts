export type CategoryType = {
  id: string;
  slug: string;
  title: string;
};

export type PostType = {
  id: string;
  slug: string;
  title: string;
  cover_image: string;
  description: string;
  created_at: string;
  content: string;
  categories: [CategoryType];
  user: UserType;
  comments?: [CommentType];
};

export type UserType = {
  username: string;
  photo: string;
};

export type CommentType = {
  id: string;
  name: string;
  email: string;
  comment: string;
  created_at: string;
};
