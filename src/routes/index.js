const { AdminRouter } = require("./admin/router");
const { AuthRouter } = require("./auth/router");
const { DirectoryRouter } = require("./directory/router");
const { TokoRouter } = require("./toko/router");
const { UserRouter } = require("./users/router");

const routes = [].concat(
  DirectoryRouter,
  AuthRouter,
  TokoRouter,
  AdminRouter,
  UserRouter
);

module.exports = routes;
