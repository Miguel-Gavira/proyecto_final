const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AppointmentModel = new Schema(
  {
    appointment: Date,
    company: { type: Schema.Types.ObjectId, ref: "companyModel" },
    user: { type: Schema.Types.ObjectId, ref: "userModel" }
  },
  { collection: "appointments" }
);

module.exports = mongoose.model("appointmentModel", AppointmentModel);
