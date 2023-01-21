const mongoose = require("mongoose");
const { Schema } = mongoose;

const BarangModel = mongoose.model(
  "Barang",
  new Schema({
    _id: Schema.Types.ObjectId,
    nama_barang: {
      type: String,
      default: "",
    },
    harga_barang: {
      type: Number,
      default: "",
    },
    jenis_barang: {
      type: String,
      default: "",
    },
    toko: {
      type: Schema.Types.ObjectId,
      ref: "Toko",
    },
    gambar: [
      {
        type: Schema.Types.ObjectId,
        ref: "Gambar",
      },
    ],
  })
);

module.exports = {
  BarangModel,
};
