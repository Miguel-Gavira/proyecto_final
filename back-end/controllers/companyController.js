const sha256 = require('sha256');

const companyController = {};

const CompanyModel = require("../models/companyModel");

companyController.add = (req, res) => {
  const data = req.body;
  const newCompany = new CompanyModel({
    companyName: data.companyName,
    password: sha256(data.password),
    address: data.address,
    telephone: data.telephone,
    type: data.type,
    email: data.email,
    appointmentDuration: data.appointmentDuration
  });
  newCompany.save(err => {
    if (err) {
      res.send("DAMMMMN! There was an error", err);
    } else {
      res.send("Añadido correctamente");
    }
  });
};

companyController.edit = (req, res) => {
  const data = req.body;
  CompanyModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        ...(data.companyName && { companyName: data.companyName }),
        ...(data.password && { password: sha256(data.password) }),
        ...(data.address && { address: data.address }),
        ...(data.telephone && { telephone: data.telephone }),
        ...(data.type && { type: data.type }),
        ...(data.email && { email: data.email }),
        ...(data.appointmentDuration && { email: data.appointmentDuration })
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

companyController.delete = (req, res) => {
  CompanyModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      res.send("DAMMMMN! There was an error", err);
    } else {
      res.send("Eliminado");
    }
  });
};

companyController.listOne = (req, res) => {
  CompanyModel.find({ _id: req.params.id }, {password:0})
    .then(result => {
      res.send(result[0]);
    })
    .catch(err => {
      res.send(err);
    });
};

companyController.listAll = (req, res) => {
  CompanyModel.find({}, {companyName: 1})
  .then(result => {
    res.send(result[0]);
  })
  .catch(err => {
    res.send(err);
  });
};

module.exports = companyController;
