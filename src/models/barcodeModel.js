const mongoose = require("mongoose");
const { Schema } = mongoose;

const BarcodeModel = mongoose.model(
  "Barcode",
  new Schema({
    _id: Schema.Types.ObjectId,
    link_gambar: {
      type: String,
      default: "",
    },
  })
);

module.exports = {
  BarcodeModel,
};
