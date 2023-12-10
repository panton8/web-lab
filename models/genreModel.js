import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unigue: true,
    },
    slug: {
      type: String,
      lowercase:true
    },
  });

export default mongoose.model("Genre", genreSchema);