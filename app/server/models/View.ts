import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import type { ViewDocument } from "../types";

const viewSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    ipAddress: String,
    city: String,
    country: String,
    latitude: String,
    longitude: String,
  },
  { timestamps: true }
);

let View: Model<ViewDocument>;
try {
  View = mongoose.model<ViewDocument>("views");
} catch (error) {
  View = mongoose.model<ViewDocument>("views", viewSchema);
}

export default View;
