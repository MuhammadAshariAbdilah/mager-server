const { TokoModel } = require("../../models/tokoModel");

const GetListTokoKonsumenHandler = async (req, h) => {
  try {
    const toko = await TokoModel.find();

    if (!toko) {
      const response = h.response({
        status: "failed",
        message: "Gagal mengambil data toko, silahkan coba lagi",
      });
      response.code(500);
      return response;
    }

    const response = h.response({
      status: "success",
      message: "Berhasil membuat toko",
      data: toko,
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
  GetListTokoKonsumenHandler,
};
