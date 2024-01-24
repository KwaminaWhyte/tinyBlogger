import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import type { SectionDocument } from "../types";

const sectionSchema = new Schema<SectionDocument>(
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
  },
  { timestamps: true }
);

let Section: Model<SectionDocument>;
try {
  Section = mongoose.model<SectionDocument>("sections");
} catch (error) {
  Section = mongoose.model<SectionDocument>("sections", sectionSchema);
}

Section.createIndexes({
  title: "text",
  description: "text",
});

export default Section;
