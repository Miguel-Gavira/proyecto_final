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

scheduleController.multipleAdd = (req, res) => {
  const data = req.body;
  const companyId = req.params.companyId;
  let err = null;
  data.map(d => {
    if (!err) {
      const newSchedule = new ScheduleModel({
        weekday: d.weekday,
        startTime: d.startTime,
        finishTime: d.finishTime,
        company: companyId
      });
      if (newSchedule.startTime && newSchedule.finishTime) {
        newSchedule.save(e => {
          if (e) {
            err = e;
          }
        });
      }
    }
  })
  if (err) {
    res.send("ERROR " + err);
  } else {
    res.sendStatus(200);
  }
}

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

scheduleController.list = (req, res) => {
  ScheduleModel.find({ company: req.params.companyId, weekday: req.params.weekday })
    .populate("company", { password: 0 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports = scheduleController;
