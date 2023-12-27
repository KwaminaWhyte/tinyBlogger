import { type Model, Schema } from "mongoose";
import { mongoose } from "~/server/mongoose";
import type { UserDocument } from "../types";

const userSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },

    // compleed: {
    //     type: String,
    //     enum: ["males", "remales", "neutral"],
    //     default: "neutral",
    //   },
  },
  { timestamps: true }
);

let User: Model<UserDocument>;
try {
  User = mongoose.model<UserDocument>("users");
} catch (error) {
  User = mongoose.model<UserDocument>("users", userSchema);
}

export default User;
