const mongoose = require("mongoose");
const { Schema } = mongoose;

const GambarModel = mongoose.model(
  "Gambar",
  new Schema({
    _id: Schema.Types.ObjectId,
    link_gambar: {
      type: String,
      default: "",
    },
  })
);

module.exports = {
  GambarModel,
};
