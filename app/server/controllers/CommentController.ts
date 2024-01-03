import { redirect } from "@remix-run/node";
import { GraphQLClient, gql } from "graphql-request";
import Comment from "../models/Comment";

export default class CommentController {
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

  public getPublishedComments = async () => {
    const comments = await Comment.find({ stage: "PUBLISHED" });
    return comments;
  };

  public getUnpublishedComments = async () => {
    const comments = await Comment.find({ stage: "DRAFT" });
    return comments;
  };

  public getUnlistedComments = async () => {
    const comments = await Comment.find({ stage: "UNLISTED" });
    return comments;
  };

  public getCommentsByPost = async (postId: string) => {
    const comments = await Comment.find({
      post: postId,
      stage: "PUBLISHED",
    }).sort({
      createdAt: "desc",
    });

    return comments;
  };

  public createComment = async (data: {
    postId: string;
    name: string;
    email: string;
    comment: string;
    slug: string;
  }) => {
    const newComment = await Comment.create({
      post: data.postId,
      name: data.name,
      email: data.email,
      comment: data.comment,
    });

    return newComment;
  };

  public publishComment = async (id: string) => {
    const publishedComment = await Comment.findByIdAndUpdate(
      id,
      {
        stage: "PUBLISHED",
      },
      { new: true }
    );

    return publishedComment;
  };

  public unlistComment = async (id: string) => {
    const unlistedComment = await Comment.findByIdAndUpdate(
      id,
      {
        stage: "UNLISTED",
      },
      { new: true }
    );

    return unlistedComment;
  };

  public deleteComment = async (id: string) => {
    await Comment.findByIdAndDelete(id);
    return true;
  };

  public updateComment = async (_id: string, comment: any) => {
    try {
      await Comment.findByIdAndUpdate(_id, { comment });
      return true;
    } catch (error) {
      console.log(error);
    }
  };
}
