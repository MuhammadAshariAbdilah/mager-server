const DirectoryRouter = {
  method: "GET",
  path: "/directory/{file*}",
  handler: {
    directory: {
      path: ".",
      redirectToSlash: true,
    },
  },
  options: {
    auth: false,
  },
};

module.exports = { DirectoryRouter };
