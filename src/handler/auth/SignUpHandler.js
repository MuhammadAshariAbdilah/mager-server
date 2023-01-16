const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { AuthModel } = require("../../models/authModel");
const { GambarModel } = require("../../models/gambarModel");
const { UserModel } = require("../../models/userModel");
const randomChar = require("../../utils/randomChar");
const fs = require("fs");
const BASE_URL = require("../../config/baseurl");

const SignUpHandler = async (req, h) => {
  try {
    const { username, email, password, nama, alamat, base64_image } =
      req.payload;

    const hashPassword = await bcrypt.hash(password, 10);
    const checkUser = await AuthModel.findOne({ email: email });

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      nama === "" ||
      alamat === "" ||
      base64_image === ""
    ) {
      const response = h.response({
        status: "failed",
        message: "Data yang anda masukkan tidak lengkap",
      });
      response.code(400);
      return response;
    }

    if (checkUser) {
      const response = h.response({
        status: "failed",
        message: "User sudah digunakan",
      });
      response.code(409);
      return response;
    }

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

    const replacingPath = base64_image.replace(`data:${dataImage};base64,`, "");
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

    const newUserId = new mongoose.Types.ObjectId();
    const newAuthId = new mongoose.Types.ObjectId();
    const newGambarId = new mongoose.Types.ObjectId();
    const createNewUser = new UserModel({
      _id: newUserId,
      nama_user: nama,
      alamat_rumah: alamat,
      gambar: newGambarId,
    });

    const createNewAuth = new AuthModel({
      _id: newAuthId,
      email: email,
      username: username,
      password: hashPassword,
      users: newUserId,
    });

    const generateUrlGambar = `${BASE_URL}${imageName}`;

    const createNewGambar = new GambarModel({
      _id: newGambarId,
      link_gambar: generateUrlGambar,
    });

    await createNewUser.save();
    await createNewAuth.save();
    await createNewGambar.save();

    const response = h.response({
      status: "success",
      message: "User berhasil dibuat",
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "failed",
      message: `Terjadi kesalahan karena ${error.message} , silahkan coba lagi`,
    });
    response.code(400);
    return response;
  }
};

module.exports = { SignUpHandler };
