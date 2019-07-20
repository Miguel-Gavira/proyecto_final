const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanyModel = new Schema(
  {
    companyName: String,
    password: String,
    address: String,
    telephone: Number,
    type: String,
    email: String
  },
  { collection: "companies" }
);

module.exports = mongoose.model("companyModel", CompanyModel);
