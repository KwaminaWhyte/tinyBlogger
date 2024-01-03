import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import type { CommentDocument } from "../types";

const categorySchema = new Schema<CommentDocument>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      enum: ["PUBLISHED", "DRAFT", "UNLISTED"],
      default: "DRAFT",
    },
  },
  { timestamps: true }
);

let Comment: Model<CommentDocument>;
try {
  Comment = mongoose.model<CommentDocument>("comments");
} catch (error) {
  Comment = mongoose.model<CommentDocument>("comments", categorySchema);
}

export default Comment;
