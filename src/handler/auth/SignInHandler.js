const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const jwt = require("jsonwebtoken");
const { AuthModel } = require("../../models/authModel");
const key = require("../../config/config");

const SignInHandler = async (req, h) => {
  try {
    const { email, password } = req.payload;
    const auth = await AuthModel.findOne({ email: email }).populate("users");

    if (!auth) {
      const response = h.response({
        status: "failed",
        message: "User tidak ditemukan",
      });
      response.code(404);
      return response;
    }

    const checkPassword = await bcrypt.compare(password, auth.password);

    if (!checkPassword) {
      const response = h.response({
        status: "failed",
        message: "Password yang anda masukan salah",
      });
      response.code(404);
      return response;
    }

    const randomId = nanoid(16);

    auth.authKeys.unshift(randomId);

    const token = jwt.sign(
      {
        _id: auth._id,
        key: randomId,
      },
      key
    );

    await auth.save();

    const response = h.response({
      id_identity: auth.users._id,
      status: "success",
      message: "Pendaftaran berhasil",
      token: token,
    });
    response.code(200);
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

module.exports = {
  SignInHandler,
};
