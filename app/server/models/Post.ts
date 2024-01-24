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
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    content: {
      type: String,
    },
    featureImage: {
      type: Schema.Types.ObjectId,
      ref: "images",
      required: true,
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
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
    likes: [
      {
        type: String,
      },
    ],
    views: [
      {
        type: Schema.Types.ObjectId,
        ref: "views",
        required: true,
      },
    ],
    publishedDate: {
      type: Date,
      default: Date.now,
    },
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
