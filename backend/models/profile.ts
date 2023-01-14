import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  summary: {
    required: true,
  },
  devtype: {
    type: String,
    required: true,
  },
  languages: [String],
});

export default mongoose.model("Profile", profileSchema);
