const DirectoryRouter = {
  method: "GET",
  path: "/directory/{filename*}",
  handler: {
    directory: {
      path: "./src/image",
      listing: true,
    },
  },
};

module.exports = { DirectoryRouter };
