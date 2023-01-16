const DirectoryRouter = {
  method: "GET",
  path: "/directory/{filename*}",
  handler: {
    directory: {
      path: "./src/image",
      listing: true,
    },
  },
  options: {
    auth: false,
  },
};

module.exports = { DirectoryRouter };
