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
      res.status(401).send("DAMMMMN! There was an error" + err);
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
        ScheduleModel.deleteMany({ company: companyId, weekday: d.weekday }, function (err) {
          if (err) {
            res.status(400).send('Error');
          }
        });
        newSchedule.save(e => {
          if (e) {
            err = e;
          }
        });
      }
    }
  })
  if (err) {
    res.status(401).send("ERROR " + err);
  } else {
    res.sendStatus(200);
  }
}

// scheduleController.edit = (req, res) => {
//   const data = req.body;
//   ScheduleModel.updateOne(
//     { _id: req.params.id },
//     {
//       $set: {
//         ...(data.weekday && { weekday: data.weekday }),
//         ...(data.startTime && { startTime: data.startTime }),
//         ...(data.finishTime && { finishTime: data.finishTime })
//       }
//     },
//     (err, raw) => {
//       if (err) {
//         res.send("DAMMMMN! There was an error", err);
//       } else {
//         res.send("Modificado");
//       }
//     }
//   );
// };

scheduleController.delete = (req, res) => {
  const companyId = req.params.companyId;
  const weekday = req.params.weekday;
  ScheduleModel.deleteOne({  company: companyId, weekday: weekday }, (err, raw) => {
    if (err) {
      res.status(401).send("DAMMMMN! There was an error" + err);
    } else {
      res.send("Eliminado");
    }
  });
};

scheduleController.list = (req, res) => {
  ScheduleModel.find({ company: req.params.companyId, weekday: req.params.weekday })
    .populate("company")
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports = scheduleController;
