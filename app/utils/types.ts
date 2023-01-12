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
  profile: Profile;
  comments?: [CommentType];
};

export type Profile = {
  id: string;
  username: string;
  profile_img: string;
  name: string;
};

export type CommentType = {
  id: string;
  name: string;
  email: string;
  content: string;
  created_at: string;
};
