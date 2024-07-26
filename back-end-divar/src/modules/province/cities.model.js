const { Schema, model } = require("mongoose");

const CitiesSchema = new Schema({
  title: { type: String, required: false },
  slug: { type: String, required: false },
  province_id: { type: Number, required: false },
  latitude: { type: Number, required: false },
  longitude: { type: Number, required: false },
});

const CitiesModel = model("cities", CitiesSchema);

module.exports = CitiesModel;
