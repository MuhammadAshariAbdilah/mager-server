const { CheckOutModel } = require("../../models/checkOutModel");
const { UserModel } = require("../../models/userModel");
const mongoose = require("mongoose");

const CheckOutHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const { jumlah_pesanan, alamat, catatan } = req.payload;
    const newCheckOutId = new mongoose.Types.ObjectId();

    const createNewCheckout = new CheckOutModel({
      _id: newCheckOutId,
      jumlah_pesanan: jumlah_pesanan,
      alamat: alamat,
      catatan: catatan,
    });

    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { $push: { checkout: newCheckOutId } },
      { new: true, useFindAndModify: false }
    );

    await createNewCheckout.save();
    await updateUser.save();

    const response = h.response({
      status: "success",
      message: "Berhasil, pesanan kamu sedang diproses",
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "failed",
      message: `Terjadi kesalahan karena ${error.message} , silahkan coba lagi`,
    });
    response.code(500);
    return response;
  }
};

module.exports = { CheckOutHandler };
