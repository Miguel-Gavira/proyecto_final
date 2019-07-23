const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserModel = new Schema(
  {
    username: {type: String, unique: true, required:true},
    password: {type: String, required:true},
    email: {type: String, required:true}
  },
  { collection: "users" }
);

module.exports = mongoose.model("userModel", UserModel);
