const scheduleController = {};

const ScheduleModel = require("../models/scheduleModel");

scheduleController.add = (req, res) => {
    const data = req.body;
    const companyId = req.params.companyId;
    const newSchedule = new ScheduleModel({
        weekday: data.weekday,
        startTime: data.startTime,
        finishTime: data.finishTime,
        company: companyId
    });
    newSchedule.save(err => {
        if (err) {
            res.send("DAMMMMN! There was an error", err);
        } else {
            res.send("Añadido correctamente");
        }
    });
};

scheduleController.edit = (req, res) => {
    const data = req.body;
    ScheduleModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          ...(data.weekday && { weekday: data.weekday }),
          ...(data.startTime && { startTime: data.startTime }),
          ...(data.finishTime && { finishTime: data.finishTime })
        }
      },
      (err, raw) => {
        if (err) {
          res.send("DAMMMMN! There was an error", err);
        } else {
          res.send("Modificado");
        }
      }
    );
  };
  
  scheduleController.delete = (req, res) => {
    ScheduleModel.deleteOne({ _id: req.params.id }, (err, raw) => {
      if (err) {
        res.send("DAMMMMN! There was an error", err);
      } else {
        res.send("Eliminado");
      }
    });
  };
  
  scheduleController.listOne = (req, res) => {
    ScheduleModel.find({ company: req.params.companyId, weekday: req.params.weekday })
      .then(result => {
        res.send(result[0]);
      })
      .catch(err => {
        res.send(err);
      });
  };
  
  module.exports = scheduleController;
  