const MainRouter = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      const response = h.response({
        status: "success",
        message: "berhasil",
      });
      response.code(200);
      return response;
    },
    options: {
      auth: false,
    },
  },
];

module.exports = { MainRouter };
