import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import type { CategoryDocument } from "../types";

const categorySchema = new Schema<CategoryDocument>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

let Category: Model<CategoryDocument>;
try {
  Category = mongoose.model<CategoryDocument>("categories");
} catch (error) {
  Category = mongoose.model<CategoryDocument>("categories", categorySchema);
}

Category.createIndexes({
  title: "text",
  description: "text",
});

export default Category;
