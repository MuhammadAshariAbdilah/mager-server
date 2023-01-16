const { TokoModel } = require("../../models/tokoModel");

const GetTokoKonsumenById = async (req, h) => {
  try {
    const { id } = req.params;
    const toko = await TokoModel.findById(id);

    if (!toko) {
      const response = h.response({
        status: "failed",
        message: "Toko tidak ada, atau belum dibuat",
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: "success",
      message: "Berhasil mengambil data toko",
      data: toko,
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
  GetTokoKonsumenById,
};
