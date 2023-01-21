const { BarcodeModel } = require("../../models/barcodeModel");
const { TokoModel } = require("../../models/tokoModel");
const { UserModel } = require("../../models/userModel");
const randomChar = require("../../utils/randomChar");
const fs = require("fs");
const mongoose = require("mongoose");
const BASE_URL = require("../../config/baseurl");
const { GambarModel } = require("../../models/gambarModel");
const { BarangModel } = require("../../models/barangModel");

const AddTokoHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const {
      nama_toko,
      alamat_toko,
      foto_toko,
      foto_barang,
      nama_barang,
      harga_barang,
      jenis_barang,
    } = req.payload;
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
      let extSecond;
      let dataImageSecond;

      if (foto_toko.includes("image/png")) {
        dataImage = "image/png";
        ext = "png";
      } else if (foto_toko.includes("image/jpg")) {
        dataImage = "image/jpg";
        ext = "jpg";
      } else if (foto_toko.includes("image/jpeg")) {
        dataImage = "image/jpeg";
        ext = "jpeg";
      }

      if (foto_barang.includes("image/png")) {
        dataImageSecond = "image/png";
        extSecond = "png";
      } else if (foto_barang.includes("image/jpg")) {
        dataImageSecond = "image/jpg";
        extSecond = "jpg";
      } else if (foto_barang.includes("image/jpeg")) {
        dataImageSecond = "image/jpeg";
        extSecond = "jpeg";
      }

      const replacingPath = foto_toko.replace(`data:${dataImage};base64,`, "");
      const imageName = `${randomChar(10)}.${ext}`;
      const imageData = path.join(__dirname, `../../image/${imageName}`);

      fs.writeFileSync(imageData, replacingPath, "base64", function (err) {
        const response = h.response({
          status: "failed",
          message: `Terjadi kesalahan ${err.message}, silahkan coba lagi`,
        });
        response.code(500);
        return response;
      });

      const replacingPathSecond = foto_barang.replace(
        `data:${dataImageSecond};base64,`,
        ""
      );
      const imageNameSecond = `${randomChar(10)}.${extSecond}`;
      const imageDataSecond = path.join(
        __dirname,
        `../../image/${imageNameSecond}`
      );

      fs.writeFileSync(
        imageDataSecond,
        replacingPathSecond,
        "base64",
        function (err) {
          const response = h.response({
            status: "failed",
            message: `Terjadi kesalahan ${err.message}, silahkan coba lagi`,
          });
          response.code(500);
          return response;
        }
      );

      const newBarcodeId = new mongoose.Types.ObjectId();
      const newGambarId = new mongoose.Types.ObjectId();
      const newGambarSecondId = new mongoose.Types.ObjectId();
      const newTokoId = new mongoose.Types.ObjectId();
      const newBarangId = new mongoose.Types.ObjectId();

      const createNewToko = new TokoModel({
        _id: newTokoId,
        nama_toko: nama_toko,
        alamat_toko: alamat_toko,
        pemilik_toko: user.nama_user,
        gambar: newGambarId,
        barcodes: newBarcodeId,
      });

      const createNewBarcode = new BarcodeModel({
        _id: newBarcodeId,
        owners_identity: `${newTokoId}|${nama_toko}`,
      });

      const createNewBarang = new BarangModel({
        _id: newBarangId,
        nama_barang: nama_barang,
        harga_barang: harga_barang,
        jenis_barang: jenis_barang,
        gambar: newGambarSecondId,
      });

      const generateUrlGambar = `${BASE_URL}${imageName}`;
      const createNewGambar = new GambarModel({
        _id: newGambarId,
        link_gambar: generateUrlGambar,
      });

      user.status = "Pedagang";

      const updateUser = await UserModel.findByIdAndUpdate(
        id,
        { $push: { toko: newTokoId, gambar: newGambarId } },
        { new: true, useFindAndModify: false }
      );

      await user.save();
      await updateUser.save();
      await createNewToko.save();
      await createNewGambar.save();
      await createNewBarcode.save();
      await createNewBarang.save();

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
