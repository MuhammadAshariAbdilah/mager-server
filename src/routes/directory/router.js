const DirectoryRouter = {
  method: "GET",
  path: "/image/{file*}",
  handler: {
    directory: {
      path: "src/image",
      listing: true,
    },
  },
  options: {
    auth: false,
  },
};

module.exports = { DirectoryRouter };
