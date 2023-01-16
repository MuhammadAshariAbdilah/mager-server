const { UserModel } = require("../../models/userModel");

const GetListTokoPedagangHandler = async (req, h) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id).populate("toko");

    if (!user) {
      const response = h.response({
        status: "failed",
        message: "Gagal mengambil data toko, silahkan coba lagi",
      });
      response.code(500);
      return response;
    }

    const response = h.response({
      status: "success",
      message: "Berhasil mengambil data toko",
      data: user,
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
  GetListTokoPedagangHandler,
};
