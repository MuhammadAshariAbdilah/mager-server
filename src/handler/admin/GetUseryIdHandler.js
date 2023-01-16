const { UserModel } = require("../../models/userModel");

const GetUserByIdHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const users = await UserModel.findById(id)
      .populate("toko")
      .populate("gambar");

    if (!users) {
      const response = h.response({
        status: "failed",
        message: "Gagal  mengambil data user, silahkan coba lagi",
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: "success",
      message: "Berhasil mengambil data",
      data: users,
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

module.exports = {
  GetUserByIdHandler,
};
