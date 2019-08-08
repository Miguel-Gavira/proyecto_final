const sha256 = require('sha256');
const jwt = require("jsonwebtoken");

const secret = "mysecret";

const userController = {};

const UserModel = require("../models/userModel");

userController.add = (req, res) => {
  const data = req.body;
  const newUser = new UserModel({
    username: data.username,
    password: sha256(data.password),
    email: data.email
  });
  newUser.save((err, row) => {
    if (err) {
      res.send("DAMMMMN! There was an error", err);
    } else {
      console.log(row);
      let token = jwt.sign(
        {
          _id: row._id,
          username: row.username,
          email: row.email
        },
        secret
      );
      res.status(200).send(token);
    }
  });
};

userController.edit = (req, res) => {
  const data = req.body;
  UserModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        ...(data.username && { username: data.username }),
        ...(data.password && { password: sha256(data.password) }),
        ...(data.email && { email: data.email })
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

userController.delete = (req, res) => {
  UserModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      res.send("DAMMMMN! There was an error", err);
    } else {
      res.send("Eliminado");
    }
  });
};

userController.listOne = (req, res) => {
  UserModel.find({ _id: req.params.id }, { password: 0 })
    .then(result => {
      res.send(result[0]);
    })
    .catch(err => {
      res.send(err);
    });
};


module.exports = userController;
