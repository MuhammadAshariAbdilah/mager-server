const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserModel = mongoose.model(
  "User",
  new Schema({
    _id: Schema.Types.ObjectId,
    nama_user: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Konsumen",
    },
    alamat_rumah: {
      type: String,
      default: "",
    },
    gambar: {
      type: String,
      ref: "Gambar",
    },
    toko: [
      {
        type: String,
        ref: "Toko",
      },
    ],
  })
);

module.exports = {
  UserModel,
};
