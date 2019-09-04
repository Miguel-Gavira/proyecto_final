const companyController = {};

const CompanyModel = require("../models/companyModel");

companyController.add = (req, res) => {
  const data = req.body;
  const user = req.params.userId;
  const newCompany = new CompanyModel({
    companyName: data.companyName,
    owner: user,
    address: data.address,
    telephone: data.telephone,
    type: data.type,
    email: data.email,
    appointmentDuration: data.appointmentDuration
  });
  newCompany.save((err, raw) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(raw);
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
        ...(data.owner && { owner: data.owner }),
        ...(data.address && { address: data.address }),
        ...(data.telephone && { telephone: data.telephone }),
        ...(data.type && { type: data.type }),
        ...(data.email && { email: data.email }),
        ...(data.appointmentDuration && {
          appointmentDuration: data.appointmentDuration
        })
      }
    },
    (err, raw) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(200).send(raw);
      }
    }
  );
};

companyController.delete = (req, res) => {
  CompanyModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.send(raw);
    }
  });
};

companyController.listOne = (req, res) => {
  CompanyModel.find({ _id: req.params.id })
    .then(result => {
      res.send(result[0]);
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

companyController.listAll = (req, res) => {
  CompanyModel.find({}, { companyName: 1 })
    .then(result => {
      res.send(result[0]);
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

// companyController.listWithoutOwner = (req, res) => {
//   CompanyModel.find({ _id: req.params.id }, { owner: 0 })
//     .then(result => {
//       res.send(result[0]);
//     })
//     .catch(err => {
//       res.send(err);
//     });
// };

module.exports = companyController;
