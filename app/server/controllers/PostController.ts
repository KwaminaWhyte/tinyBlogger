import { redirect } from "@remix-run/node";
import Post from "../models/Post";
import { GraphQLClient, gql } from "graphql-request";

export default class PostController {
  private request: Request;
  private hygraph: any;

  constructor(request: Request) {
    this.request = request;
    this.hygraph = new GraphQLClient(
      "https://api-eu-central-1.hygraph.com/v2/cl0z3nic64r6q01xma8ss10wo/master"
    );
  }

  public getPosts = async () => {
    const { posts } = await this.hygraph.request(
      gql`
        query {
          posts(last: 8) {
            title
            slug
            createdAt
            description
            featured
            coverImage {
              id
              url
            }
            createdBy {
              id
              name
            }
          }
        }
      `,
      {
        featured: true,
      }
    );

    return posts;

    // try {
    //   const posts = await Post.find();
    //   return posts;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  public getBlog = async (slug: string) => {
    try {
      const post = await Post.findOne({ slug });
      return post;
    } catch (error) {
      console.log(error);
    }
  };

  public createBlog = async (data: {
    title: string;
    slug: string;
    description: string;
    content: string;
  }) => {
    try {
      const savedPost = await Post.create(data);
      return savedPost;
    } catch (error) {
      console.log(error);
      throw new Error(`Error creating post: ${error}`);
    }
  };

  public updateBlog = async (_id: string, body: any) => {
    try {
      await Post.findByIdAndUpdate(_id, body);
    } catch (error) {
      console.log(error);
    }
  };

  public getFeaturedBlogs = async () => {
    try {
      const posts = await Post.find({ featured: true })
        .select("-content")
        .limit(6);
      return posts;
    } catch (error) {
      console.log(error);
    }
  };
}
