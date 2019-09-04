const sha256 = require("sha256");
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
  newUser.save((err, raw) => {
    if (err) {
      res.status(401).send(err);
    } else {
      let token = jwt.sign(
        {
          _id: raw._id,
          username: raw.username,
          email: raw.email
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
        res.status(401).send(err);
      } else {
        res.send(raw);
      }
    }
  );
};

userController.delete = (req, res) => {
  UserModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.send(raw);
    }
  });
};

userController.listOne = (req, res) => {
  UserModel.find({ _id: req.params.id }, { password: 0 })
    .then(result => {
      res.send(result[0]);
    })
    .catch(err => {
      res.status(401).send(err);
    });
};

module.exports = userController;
