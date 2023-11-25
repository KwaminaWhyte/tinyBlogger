import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import { type UserDocument } from "./User";

export interface MineDocument extends mongoose.Document {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  user: UserDocument;
  completed: boolean;
  collected: boolean;
}

const mineSchema = new Schema<MineDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    collected: {
      type: Boolean,
      default: false,
    },
    // compleed: {
    //     type: String,
    //     enum: ["males", "remales", "neutral"],
    //     default: "neutral",
    //   },
  },
  { timestamps: true }
);

let Mine: Model<MineDocument>;
try {
  Mine = mongoose.model<MineDocument>("mines");
} catch (error) {
  Mine = mongoose.model<MineDocument>("mines", mineSchema);
}

export default Mine;
