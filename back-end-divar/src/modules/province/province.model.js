const { Schema, model } = require("mongoose");

const ProvinceSchema = new Schema({
  id: { type: Number, required: false },
  title: { type: String, required: false },
  slug: { type: String, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

const ProvinceModel = model("province", ProvinceSchema);

module.exports = ProvinceModel;
