import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import type { ImageDocument } from "../types";

const imageSchema = new Schema<ImageDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    externalId: {
      type: String,
    },
  },
  { timestamps: true }
);

let Image: Model<ImageDocument>;
try {
  Image = mongoose.model<ImageDocument>("images");
} catch (error) {
  Image = mongoose.model<ImageDocument>("images", imageSchema);
}

export default Image;

// {
//   "src": "https://media.graphassets.com/pobGHK5RQAWpttnSkuzY",
//   "type": "image",
//   "title": "roadmap.jpg",
//   "width": 2000,
//   "handle": "pobGHK5RQAWpttnSkuzY",
//   "height": 1125,
//   "children": [{ "text": "" }],
//   "mimeType": "image/jpeg"
// },
