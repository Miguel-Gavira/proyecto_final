const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CompanyModel = new Schema(
  {
    companyName: {type: String, unique: true, required:true},
    password: {type: String, required:true},
    address: String,
    telephone: Number,
    type: String,
    email: {type: String, required:true},
    appointmentDuration: Number
  },
  { collection: "companies" }
);

module.exports = mongoose.model("companyModel", CompanyModel);
