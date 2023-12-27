import { redirect } from "@remix-run/node";
import Post from "../models/Post";

export default class PostController {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  public getBlogs = async (req: Request, res: Response) => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (error) {
      console.log(error);
    }
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
}
