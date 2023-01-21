const mongoose = require("mongoose");
const { Schema } = mongoose;

const CheckOutModel = mongoose.model(
  "Checkout",
  new Schema({
    _id: Schema.Types.ObjectId,
    jumlah_pesanan: Number,
    alamat: String,
    catatan: String,
  })
);

module.exports = {
  CheckOutModel,
};
