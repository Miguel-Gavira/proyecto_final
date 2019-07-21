const sha256 = require("sha256");
const jwt = require("jsonwebtoken");

const secret = "mysecret";

const UserModel = require("../models/userModel");
const CompanyModel = require("../models/companyModel");

const authController = {};

authController.authUser = (req, res) => {
  const data = req.body;
  UserModel.find({ username: data.username, password: sha256(data.password) })
    .then(documents => {
      if (documents.length > 0) {
        let token = jwt.sign(
          {
            _id: documents[0]._id,
            username: documents[0].username
          },
          secret,
          {
            expiresIn: 3600
          }
        );
        res.send(token);
      } else {
        res.status(400).send("Invalid credentials");
      }
    });
};

authController.authCompany = (req, res) => {
    const data = req.body;
    CompanyModel.find({ companyName: data.companyName, password: sha256(data.password) })
      .then(documents => {
        if (documents.length > 0) {
          let token = jwt.sign(
            {
              _id: documents[0]._id,
              companyName: documents[0].companyName
            },
            secret,
            {
              expiresIn: 3600
            }
          );
          res.send(token);
        } else {
          res.status(400).send("Invalid credentials");
        }
      });
  };
  

module.exports = authController;