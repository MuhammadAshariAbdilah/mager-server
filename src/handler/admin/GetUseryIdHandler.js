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

    const res = h.file(`./src/image/${users.gambar.link_gambar}`);
    const hostname = res.request.info.host;
    const imagepath = res.source.path;
    const url = `http://${hostname}${imagepath}`;

    const resUser = {
      nama_user: users.nama_user,
      status: users.status,
      alamat_rumah: users.alamat_rumah,
      link_gambar: url,
      toko: users.toko,
    };

    const response = h.response({
      status: "success",
      message: "Berhasil mengambil data",
      data: resUser,
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
