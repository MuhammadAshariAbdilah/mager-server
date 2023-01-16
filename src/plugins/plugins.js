require("dotenv").config();

const plugins = [
  {
    plugin: require("hapi-auth-bearer-token"),
  },
  {
    plugin: require("@hapi/inert"),
  },
  {
    plugin: require("@hapi/vision"),
  },
  {
    plugin: require("hapi-swagger"),
  },
];

module.exports = plugins;
