const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ScheduleModel = new Schema(
    {
        weekday: Number,
        startTime: String,
        finishTime: String,
        company: { type: Schema.Types.ObjectId, ref: "companyModel" }
    },
    { collection: "schedules" }
);

module.exports = mongoose.model("scheduleModel", ScheduleModel);
