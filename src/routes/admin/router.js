const { CreateTokoHandler } = require("../../handler/admin/CreateTokoHandler");
const { CreateUserHandler } = require("../../handler/admin/CreateUserHandler");
const { GetAllUserHandler } = require("../../handler/admin/GetAllUserHandler");
const { GetUserByIdHandler } = require("../../handler/admin/GetUseryIdHandler");

const AdminRouter = [
  {
    method: "POST",
    path: "/createtokofromadmin/{id}",
    handler: CreateTokoHandler,
  },
  {
    method: "POST",
    path: "/createuserfromadmin",
    handler: CreateUserHandler,
  },
  {
    method: "GET",
    path: "/getalluser",
    handler: GetAllUserHandler,
  },
  {
    method: "GET",
    path: "/getuserbyid/{id}",
    handler: GetUserByIdHandler,
  },
];

module.exports = { AdminRouter };
