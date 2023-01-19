require("dotenv").config();
require("./src/database/database");
const Hapi = require("@hapi/hapi");
const key = require("./src/config/config");
const jwt = require("jsonwebtoken");
const routes = require("./src/routes");
const { AuthModel } = require("./src/models/authModel");
const plugins = require("./src/plugins/plugins");
const Path = require("path");

const init = async () => {
  const port = process.env.PORT || 3000;
  const host = process.env.HOST || "0.0.0.0";
  const pathImage = process.env.DEV === "Yes" ? "./src/image" : "/tmp/";
  try {
    const server = Hapi.server({
      port: port,
      host: host,
      routes: {
        files: {
          relativeTo: Path.join(__dirname, pathImage),
        },
        cors: {
          origin: ["*"],
        },
      },
    });

    await server.register(plugins);

    await server.route(routes);

    server.auth.strategy("simple", "bearer-access-token", {
      validate: async (request, token, h) => {
        const decoded = jwt.verify(token, key);

        const auth = await AuthModel.findOne({ _id: decoded._id }).populate(
          "users"
        );

        if (!auth) {
          const response = h.response({
            status: "failed",
            message: "Token tidak valid",
          });
          response.code(500);
          return response;
        }

        if (auth.authKeys.find((key) => key === decoded.key)) {
          return {
            isValid: true,
            credentials: {
              _id: auth._id,
              user: auth.profileuser,
            },
          };
        } else {
          const response = h.response({
            status: "failed",
            message: "Token tidak valid",
          });
          response.code(500);
          return response;
        }
      },
    });

    server.auth.default("simple");

    await server.start();
    console.log("Server berjalan pada %s", server.info.uri);
  } catch (error) {
    console.log(`Terjadi kesalahan pada ${error.message}`);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
