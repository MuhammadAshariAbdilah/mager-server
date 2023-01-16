const mongoose = require("mongoose");
const { Schema } = mongoose;

const TokoModel = mongoose.model(
  "Toko",
  new Schema({
    _id: Schema.Types.ObjectId,
    nama_toko: {
      type: String,
      default: "",
    },
    alamat_toko: {
      type: String,
      default: "",
    },
    pemilik_toko: {
      type: String,
      default: "",
    },
    barcodes: {
      type: String,
      ref: "Barcode",
    },
    gambar: [
      {
        type: String,
        ref: "Gambar",
      },
    ],
  })
);

module.exports = {
  TokoModel,
};
