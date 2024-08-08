const { Schema, Types, model } = require("mongoose");

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true },
    content: { type: String, required: true },
    category: { type: [], required: true },
    address: { type: Object, required: false },
    coordinate: { type: [Number] },
    images: { type: [String], required: false, default: [] },
    options: { type: Object, default: {} },
    confirm: {
      type: String,
      enum: ["pending", "failed", "accepted"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const PostModel = model("post", PostSchema);

module.exports = PostModel;
