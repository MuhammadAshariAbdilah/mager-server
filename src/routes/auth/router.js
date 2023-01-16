const { SignInHandler } = require("../../handler/auth/SignInHandler");
const { SignUpHandler } = require("../../handler/auth/SignUpHandler");

const AuthRouter = [
  {
    method: "POST",
    path: "/signup",
    handler: SignUpHandler,
    options: {
      auth: false,
    },
  },
  {
    method: "POST",
    path: "/signin",
    handler: SignInHandler,
    options: {
      auth: false,
    },
  },
];

module.exports = { AuthRouter };
