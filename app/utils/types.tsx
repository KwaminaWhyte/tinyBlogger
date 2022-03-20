export type CategoryType = {
  id: string;
  slug: string;
  title: string;
};

export type PostType = {
  id: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  featuredImage: {
    url: string;
  };
  content: {
    raw: string;
    html: string;
  };
  categories: [
    {
      id: string;
      slug: string;
      title: string;
    }
  ];
  account: {
    username: string;
    photo: {
      url: string;
    };
  };
  comments?: [
    {
      id: string;
      name: string;
      email: string;
      comment: string;
      createdAt: string;
    }
  ];
};
