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
      console.log("DAMMMMN! There was an error", err);
    } else {
      console.log("Añadido correctamente");
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
        console.error("DAMMMMN! There was an error", err);
      } else {
        console.error("Modificado");
      }
    }
  );
};

appointmentController.delete = (req, res) => {
  AppointmentModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      console.error("DAMMMMN! There was an error", err);
    } else {
      console.error("Eliminado");
    }
  });
};

appointmentController.listOne = (req, res) => {
  AppointmentModel.find({ _id: req.params.id })
  .populate("company")
  .populate("user")
    .then(result => {
      res.send(result[0]);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = appointmentController;
