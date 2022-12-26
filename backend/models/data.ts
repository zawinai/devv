import mongoose from "mongoose";

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Data", dataSchema); // Collection name
