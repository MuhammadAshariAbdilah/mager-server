const { CheckOutHandler } = require("../../handler/users/CheckoutHandler");
const {
  GetListTokoKonsumenHandler,
} = require("../../handler/users/GetListTokoKonsumenHandler");
const {
  GetTokoKonsumenById,
} = require("../../handler/users/GetTokoKonsumenById");
const {
  GetUserBydIdHandler,
} = require("../../handler/users/GetUserByIdHandler");

const UserRouter = [
  {
    method: "GET",
    path: "/getuserbyd/{id}",
    handler: GetUserBydIdHandler,
  },
  {
    method: "GET",
    path: "/listtoko/{id}",
    handler: GetListTokoKonsumenHandler,
  },
  {
    method: "GET",
    path: "/gettokobyid/{id}",
    handler: GetTokoKonsumenById,
  },
  {
    method: "POST",
    path: "/checkout/{id}",
    handler: CheckOutHandler,
  },
];

module.exports = { UserRouter };
