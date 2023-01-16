require("dotenv").config();
const BearerToken = require("hapi-auth-bearer-token");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const Swagger = require("hapi-swagger");

const plugins = [BearerToken, Inert, Vision, Swagger];

module.exports = plugins;
