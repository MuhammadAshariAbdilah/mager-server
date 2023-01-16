const { BarcodeModel } = require("../../models/barcodeModel");
const { TokoModel } = require("../../models/tokoModel");
const { UserModel } = require("../../models/userModel");
const randomChar = require("../../utils/randomChar");
const fs = require("fs");
const mongoose = require("mongoose");
const BASE_URL = require("../../config/baseurl");

const AddTokoHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const { nama_toko, alamat_toko, base64_image } = req.payload;
    const user = await UserModel.findById(id);

    if (!user) {
      const response = h.response({
        status: "failed",
        message: "User tidak ditemukan",
      });
      response.code(404);
      return response;
    }

    if (user.status === "Pedagang") {
      let ext;
      let dataImage;

      if (base64_image.includes("image/png")) {
        dataImage = "image/png";
        ext = "png";
      } else if (base64_image.includes("image/jpg")) {
        dataImage = "image/jpg";
        ext = "jpg";
      } else if (base64_image.includes("image/jpeg")) {
        dataImage = "image/jpeg";
        ext = "jpeg";
      }

      const replacingPath = base64_image.replace(
        `data:${dataImage};base64,`,
        ""
      );
      const imageName = `${randomChar(10)}.${ext}`;
      const imageData = `./src/image/${imageName}`;

      fs.writeFileSync(imageData, replacingPath, "base64", function (err) {
        const response = h.response({
          status: "failed",
          message: `Terjadi kesalahan ${err.message}, silahkan coba lagi`,
        });
        response.code(500);
        return response;
      });

      const newBarcodeId = new mongoose.Types.ObjectId();
      const newTokoId = new mongoose.Types.ObjectId();

      const createNewToko = new TokoModel({
        _id: newTokoId,
        nama_toko: nama_toko,
        alamat_toko: alamat_toko,
        pemilik_toko: user.nama_user,
        barcodes: newBarcodeId,
      });

      const generateUrlGambar = `${BASE_URL}${imageName}`;

      const createNewBarcode = new BarcodeModel({
        _id: newBarcodeId,
        link_gambar: generateUrlGambar,
      });

      const updateUser = await UserModel.findByIdAndUpdate(
        id,
        { $push: { toko: newTokoId } },
        { new: true, useFindAndModify: false }
      );

      await updateUser.save();
      await createNewToko.save();
      await createNewBarcode.save();

      const response = h.response({
        status: "success",
        message: "Berhasil membuat toko",
      });
      response.code(201);
      return response;
    } else {
      const response = h.response({
        status: "failed",
        message: "Silahkan membuat toko utama terlebih dahulu",
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: "failed",
      message: `Terjadi kesalahan karena ${error.message} , silahkan coba lagi`,
    });
    response.code(500);
    return response;
  }
};

module.exports = {
  AddTokoHandler,
};
