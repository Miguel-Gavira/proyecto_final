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
        CompanyModel.find({ owner: documents[0]._id })
          .then(companyDocuments => {
            let token = jwt.sign(
              {
                _id: documents[0]._id,
                username: documents[0].username,
                email: documents[0].email,
                companyName: companyDocuments[0].companyName,
                companyId: companyDocuments[0]._id
              },
              secret
            );
            res.send(token);
          }
          )
          .catch(err => {
            let token = jwt.sign(
              {
                _id: documents[0]._id,
                username: documents[0].username,
                email: documents[0].email
              },
              secret
            );
            res.send(token);
            }); 
      } else {
        res.status(400).send("Invalid credentials");
      }
    });
};

module.exports = authController;