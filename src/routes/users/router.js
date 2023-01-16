const {
  GetListTokoKonsumenHandler,
} = require("../../handler/users/GetListTokoKonsumenHandler");
const {
  GetTokoKonsumenById,
} = require("../../handler/users/GetTokoKonsumenById");

const UserRouter = [
  {
    method: "GET",
    path: "/listtoko",
    handler: GetListTokoKonsumenHandler,
  },
  {
    method: "GET",
    path: "/gettokobyid/{id}",
    handler: GetTokoKonsumenById,
  },
];

module.exports = { UserRouter };
