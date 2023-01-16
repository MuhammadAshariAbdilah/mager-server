const { AddTokoHandler } = require("../../handler/toko/AddTokoHandler");
const { CreateTokoHandler } = require("../../handler/toko/CreateTokoHandler");
const {
  GetListTokoPedagangHandler,
} = require("../../handler/toko/GetListTokoPedagangHandler");
const {
  GetTokoPedagangById,
} = require("../../handler/toko/GetTokoPedagangById");

const TokoRouter = [
  {
    method: "POST",
    path: "/addtoko/{id}",
    handler: AddTokoHandler,
  },
  {
    method: "POST",
    path: "/createtoko/{id}",
    handler: CreateTokoHandler,
  },
  {
    method: "GET",
    path: "/listtokopedagang/{id}",
    handler: GetListTokoPedagangHandler,
  },
  {
    method: "GET",
    path: "/gettokopedagangbyid/{id}",
    handler: GetTokoPedagangById,
  },
];

module.exports = { TokoRouter };
