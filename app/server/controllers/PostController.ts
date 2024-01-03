import { redirect } from "@remix-run/node";
import Post from "../models/Post";
import { GraphQLClient, gql } from "graphql-request";
import fs from "fs";
import Category from "../models/Category";
export default class PostController {
  private request: Request;
  private hygraph: any;

  constructor(request: Request) {
    this.request = request;
    this.hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
      },
    });
  }

  public getPosts = async () => {
    // const { posts } = await this.hygraph.request(
    //   gql`
    //     query {
    //       posts(last: 8, stage: PUBLISHED) {
    //         title
    //         slug
    //         createdAt
    //         description
    //         featured
    //         categories {
    //           id
    //           title
    //           slug
    //         }
    //         coverImage {
    //           id
    //           url
    //         }
    //         createdBy {
    //           id
    //           name
    //         }
    //       }
    //     }
    //   `,
    //   {
    //     featured: true,
    //   }
    // );

    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  public getPostBySlug = async (slug: string) => {
    // const { post } = await this.hygraph.request(
    //   gql`
    //     query ($slug: String!) {
    //       post(where: { slug: $slug }) {
    //         id
    //         title
    //         description
    //         slug
    //         categories {
    //           id
    //           title
    //           slug
    //         }
    //         content {
    //           raw
    //         }
    //         coverImage {
    //           id
    //           url
    //         }
    //       }
    //     }
    //   `,
    //   {
    //     slug,
    //   }
    // );

    // const jsonData = JSON.stringify(post?.content?.raw.children);
    // // Specify the file path and name
    // const filePath = "example.json";

    // // Write the JSON data to the file
    // fs.writeFile(filePath, jsonData, "utf8", (err) => {
    //   if (err) {
    //     console.error("Error writing to file:", err);
    //   } else {
    //     console.log(`Data has been written to ${filePath}`);
    //   }
    // });

    const post = await Post.findOne({ slug }).populate("categories");

    return post;
  };

  public getPostByCategory = async (categoryId: string) => {
    const { posts } = await this.hygraph.request(
      gql`
        query ($categoryId: ID!) {
          posts(where: { categories_some: { id: $categoryId } }) {
            id
            title
            description
            slug
            categories {
              id
              title
              slug
            }
            coverImage {
              id
              url
            }
          }
        }
      `,
      {
        categoryId,
      }
    );

    return posts;
  };

  public getPostById = async (id: string) => {
    const post = await Post.findById(id);

    return post;
  };

  public createPost = async (data: {
    title: string;
    slug: string;
    description: string;
    content: string;
  }) => {
    const newPost = await Post.create({
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      featured: true,
    });
    return redirect(`/console/blogs/${newPost._id}`);
  };

  public publishPost = async (slug: string) => {
    const { publishPost } = await this.hygraph.request(
      gql`
        mutation publishPost($slug: String!) {
          publishPost(where: { slug: $slug }, to: PUBLISHED) {
            id
            title
            content {
              raw
            }
          }
        }
      `,
      {
        slug,
      }
    );

    return publishPost;
  };

  public unpublishPost = async (slug: string) => {
    const { unpublishPost } = await this.hygraph.request(
      gql`
        mutation unpublishPost($slug: String!) {
          unpublishPost(where: { slug: $slug }, from: PUBLISHED) {
            id
            title
            content {
              raw
            }
          }
        }
      `,
      {
        slug,
      }
    );

    return unpublishPost;
  };

  public deletePost = async (slug: string) => {
    const { deletePost } = await this.hygraph.request(
      gql`
        mutation deletePost($slug: String!) {
          deletePost(where: { slug: $slug }) {
            id
            title
            content {
              raw
            }
          }
        }
      `,
      {
        slug,
      }
    );

    return deletePost;
  };

  public updatePost = async (_id: string, body: any) => {
    try {
      await Post.findByIdAndUpdate(_id, body);
    } catch (error) {
      console.log(error);
    }
  };

  public getFeaturedPosts = async () => {
    // const { posts } = await this.hygraph.request(
    //   gql`
    //     query ($featured: Boolean!) {
    //       posts(
    //         where: { featured: $featured }
    //         first: 6
    //         orderBy: createdAt_DESC
    //         stage: PUBLISHED
    //       ) {
    //         id
    //         title
    //         slug
    //         createdAt
    //         description
    //         featured
    //         coverImage {
    //           id
    //           url
    //         }
    //         categories {
    //           id
    //           title
    //           slug
    //         }
    //         createdBy {
    //           id
    //           name
    //         }
    //       }
    //     }
    //   `,
    //   {
    //     featured: true,
    //   }
    // );

    try {
      const posts = await Post.find({ featured: true, stage: "PUBLISHED" })
        .select("-content")
        .limit(6);
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  public getLatestPosts = async () => {
    try {
      const posts = await Post.find({ featured: true })
        .select("-content")
        .sort({ createdAt: "desc" })
        .limit(6);
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  public getCategories = async () => {
    // const { categories } = await this.hygraph.request(
    //   gql`
    //     query {
    //       categories(stage: PUBLISHED) {
    //         id
    //         title
    //         slug
    //         description
    //         createdAt
    //       }
    //     }
    //   `,
    //   {
    //     featured: true,
    //   }
    // );

    const categories = await Category.find();

    return categories;
  };

  public createCategory = async (data: {
    title: string;
    description: string;
  }) => {
    const newCategory = await Category.create({
      title: data.title,
      slug: this.genetateSlug(data.title),
      description: data.description,
    });

    return newCategory;
  };

  public getCategoryBySlug = async (slug: string) => {
    const { category } = await this.hygraph.request(
      gql`
        query ($slug: String!) {
          category(where: { slug: $slug }) {
            id
            title
            description
            slug
          }
        }
      `,
      {
        slug,
      }
    );

    return category;
  };

  public searchCategories = async (query: string) => {
    const { categories } = await this.hygraph.request(
      gql`
        query ($query: String!) {
          categories(
            where: {
              OR: [{ title_contains: $query }, { description_contains: $query }]
            }
          ) {
            id
            title
            description
            slug
          }
        }
      `,
      {
        query,
      }
    );

    return categories;
  };

  public searchPosts = async (query: string) => {
    const { posts } = await this.hygraph.request(
      gql`
        query ($query: String!) {
          posts(
            where: {
              OR: [{ title_contains: $query }, { description_contains: $query }]
            }
          ) {
            id
            title
            description
            featured
            slug
            categories {
              id
              title
              slug
            }
            content {
              raw
            }
            coverImage {
              id
              url
            }
            createdAt
          }
        }
      `,
      {
        query,
      }
    );

    return posts;
  };

  genetateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };
}
