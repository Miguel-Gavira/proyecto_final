const appointmentController = {};

const AppointmentModel = require("../models/appointmentModel");

appointmentController.add = (req, res) => {
  const data = req.body;
  const companyId = req.params.companyId;
  const userId = req.params.userId;
  const newAppointment = new AppointmentModel({
    appointment: data.appointment,
    service: data.service,
    company: companyId,
    user: userId
  });
  newAppointment.save(err => {
    if (err) {
      res.send("DAMMMMN! There was an error", err);
    } else {
      res.send("Añadido correctamente");
    }
  });
};

appointmentController.edit = (req, res) => {
  const data = req.body;
  AppointmentModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        ...(data.appointment && { appointment: data.appointment }),
        ...(data.service && { service: data.service })
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

appointmentController.delete = (req, res) => {
  AppointmentModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      res.send("DAMMMMN! There was an error", err);
    } else {
      res.send("Eliminado");
    }
  });
};

appointmentController.listOne = (req, res) => {
  AppointmentModel.find({ _id: req.params.id })
    .populate("company", { password: 0 })
    .populate("user", { password: 0 })
    .then(result => {
      res.send(result[0]);
    })
    .catch(err => {
      res.send(err);
    });
};

appointmentController.listFromCompany = (req, res) => {
  const today = new Date(req.params.day);
  const tomorrow = new Date(req.params.day);
  tomorrow.setDate(tomorrow.getDate() + 1);
  AppointmentModel.find({ company: req.params.companyId, appointment: { $gte: today, $lt: tomorrow } })
    // .populate("user", { username: 1 })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.send(err);
    });
};

module.exports = appointmentController;
