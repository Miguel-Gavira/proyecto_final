var express = require("express");

const userController = {};

const UserModel = require("../models/userModel");

userController.add = (req, res) => {
  const data = req.body;
  const newUser = new UserModel({
    username: data.username,
    password: data.password,
    email: data.email
  });
  newUser.save(err => {
    if (error) {
      console.log("DAMMMMN! There was an error", err);
    } else {
      console.log("Añadido correctamente");
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
        ...(data.password && { password: data.password }),
        ...(data.email && { username: data.email })
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

userController.delete = (req, res) => {
  UserModel.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      console.error("DAMMMMN! There was an error", err);
    } else {
      console.error("Eliminado");
    }
  });
};

userController.listOne = (req, res) => {
  UserModel.find({ _id: req.params.id }) 
  .then(result => {
      console.log(result[0]);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = userController;
