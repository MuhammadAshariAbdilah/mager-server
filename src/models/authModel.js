const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthModel = mongoose.model(
  "Auth",
  new Schema({
    _id: Schema.Types.ObjectId,
    email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: "",
    },
    authKeys: [String],
    users: {
      type: String,
      ref: "User",
    },
  })
);

module.exports = {
  AuthModel,
};
