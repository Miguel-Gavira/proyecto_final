const companyController = {};

const CompanyModel = require("../models/companyModel");

companyController.add = (req, res) => {
  const data = req.body;
  const newCompany = new CompanyModel({
    companyName: data.companyName,
    password: data.password,
    address: data.address,
    telephone: data.telephone,
    type: data.type,
    email: data.email
  });
  newCompany.save(err => {
    if (err) {
      console.log("DAMMMMN! There was an error", err);
    } else {
      console.log("Añadido correctamente");
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
        ...(data.password && { password: data.password }),
        ...(data.address && { address: data.address }),
        ...(data.telephone && { telephone: data.telephone }),
        ...(data.type && { type: data.type }),
        ...(data.email && { email: data.email })
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

companyController.delete = (req, res) => {
  CompanyModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      console.error("DAMMMMN! There was an error", err);
    } else {
      console.error("Eliminado");
    }
  });
};

companyController.listOne = (req, res) => {
  CompanyModel.find({ _id: req.params.id })
    .then(result => {
      console.log(result[0]);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = companyController;
