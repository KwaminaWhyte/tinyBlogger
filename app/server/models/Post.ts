import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import type { PostDocument } from "../types";

const postSchema = new Schema<PostDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
    title: {
      type: String,
      // required: true,
    },
    slug: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    content: {
      type: String,
      // required: true,
    },
    featureImage: {
      type: Schema.Types.ObjectId,
      ref: "images",
      // required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stage: {
      type: String,
      enum: ["PUBLISHED", "DRAFT", "UNLISTED"],
      default: "DRAFT",
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "categories",
        // required: true,
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

let Post: Model<PostDocument>;
try {
  Post = mongoose.model<PostDocument>("posts");
} catch (error) {
  Post = mongoose.model<PostDocument>("posts", postSchema);
}

Post.createIndexes({
  title: "text",
  description: "text",
});

export default Post;
