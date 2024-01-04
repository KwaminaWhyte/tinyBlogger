import { redirect, json } from "@remix-run/node";
import Post from "../models/Post";
import { GraphQLClient, gql } from "graphql-request";
import fs from "fs";
import Category from "../models/Category";
import mongoose from "mongoose";
import Image from "../models/Image";
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
    try {
      const posts = await Post.find({ stage: "PUBLISHED" })
        .populate("featureImage")
        .populate("categories")
        .sort({ createdAt: "desc" });
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  public getPostBySlug = async (slug: string) => {
    const post = await Post.findOne({ slug })
      .populate("categories")
      .populate("featureImage");

    return post;
  };

  public checkSlug = async (slug: string) => {
    const slugExist = await Post.findOne({ slug });
    if (slugExist) {
      return json({ message: "Slug already exist", status: 400 });
    }
    return json({ message: "Slug is available", status: 200 });
  };

  public getPostByCategory = async (categoryId: string) => {
    const posts = await Post.find({
      categories: {
        $elemMatch: { $eq: new mongoose.Types.ObjectId(categoryId) },
      },
    })
      .populate("featureImage")
      .populate("categories");

    return posts;
  };

  public getPostById = async (id: string) => {
    const post = await Post.findById(id)
      .populate("featureImage")
      .populate("categories");

    return post;
  };

  public createPost = async (data: {
    title: string;
    slug: string;
    description: string;
    content: string;
    featureImage: {
      url: string;
      externalId: string;
    };
  }) => {
    const newImage = await Image.create({
      url: data.featureImage.url,
      externalId: data.featureImage.externalId,
    });

    const newPost = await Post.create({
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      featured: true,
      featureImage: newImage._id,
    });

    return redirect(`/console/posts/${newPost._id}`);
  };

  public publishPost = async (id: string) => {
    const publishedPost = await Post.findByIdAndUpdate(
      id,
      {
        stage: "PUBLISHED",
      },
      {
        new: true,
      }
    );

    return publishedPost;
  };

  public unpublishPost = async (id: string) => {
    const unpublishPost = await Post.findByIdAndUpdate(
      id,
      {
        stage: "DRAFT",
      },
      {
        new: true,
      }
    );
    return unpublishPost;
  };

  public deletePost = async (id: string) => {
    await Post.findByIdAndDelete(id);
    return true;
  };

  public updatePost = async (
    _id: string,
    data: {
      title: string;
      description: string;
      content: string;
    }
  ) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        _id,
        {
          title: data.title,
          description: data.description,
          content: data.content,
        },
        {
          new: true,
        }
      );
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  };

  public updateAndublishPost = async (
    _id: string,
    data: {
      title: string;
      description: string;
      content: string;
    }
  ) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        _id,
        {
          title: data.title,
          description: data.description,
          content: data.content,
          stage: "PUBLISHED",
          publishedDate: Date.now(),
        },
        {
          new: true,
        }
      );
      return updatedPost;
    } catch (error) {
      console.log(error);
    }
  };

  public getFeaturedPosts = async () => {
    try {
      const posts = await Post.find({ featured: true, stage: "PUBLISHED" })
        .populate("featureImage")
        .populate("categories")
        .select("-content")
        .limit(6);
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  public getLatestPosts = async () => {
    try {
      const posts = await Post.find({ featured: true, stage: "PUBLISHED" })
        .populate("featureImage")
        .populate("categories")
        .select("-content")
        .sort({ createdAt: "desc" })
        .limit(6);
      return posts;
    } catch (error) {
      console.log(error);
    }
  };

  public getCategories = async () => {
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
    const category = await Category.findOne({ slug });

    return category;
  };

  public searchCategories = async (query: string) => {
    const categories = await Category.find({
      $text: { $search: query },
    }).exec();

    return categories;
  };

  public searchPosts = async (query: string) => {
    const posts = await Post.find({
      $text: { $search: query },
    }).exec();

    return posts;
  };

  genetateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };
}

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
