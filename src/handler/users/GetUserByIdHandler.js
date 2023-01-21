const { UserModel } = require("../../models/userModel");

const GetUserBydIdHandler = async () => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      const response = h.response({
        status: "failed",
        message: "User tidak ditemukan",
      });
      response.code(404);
      return response;
    }

    const response = h.response({
      status: "success",
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
  GetUserBydIdHandler,
};
