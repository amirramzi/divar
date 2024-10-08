const { Schema, Types, model } = require("mongoose");

const OptionSchema = new Schema({
  title: { type: String, required: true },
  key: { type: String, required: true },
  type: { type: String, enum: ["number", "string", "array", "boolean"] },
  enum: { type: Array, default: [] },
  required: { type: Boolean, required: false, default: false },
  category: { type: Types.ObjectId, required: true, ref: "Category" },
});

const OptionModel = model("option", OptionSchema);
module.exports = OptionModel;
