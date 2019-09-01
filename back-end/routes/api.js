var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const secret = "mysecret";

const userController = require("../controllers/userController");
const companyController = require("../controllers/companyController");
const appointmentController = require("../controllers/appointmentController");
const authController = require("../controllers/authController");
const scheduleController = require("../controllers/scheduleController");

//Auth
router.post("/auth/user", authController.authUser);

//CRUD User
router.post("/user/add", userController.add);
router.put("/user/edit/:id", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id == req.params.id
      ? userController.edit(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

router.delete("/user/delete/:id", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id == req.params.id
      ? userController.delete(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});
router.get("/user/:id", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id == req.params.id
      ? userController.listOne(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

//CRUD Company
router.post("/company/add/:userId", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id === req.params.userId
      ? companyController.add(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});
router.put("/company/edit/:id", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded.companyId === req.params.id
      ? companyController.edit(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

// router.delete('/company/delete/:id', companyController.delete);
// router.get('/company/list', companyController.listAll);

router.get("/company/:id", (req, res) => {
  try {
    companyController.listOne(req, res);
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

// router.get("/company/withoutOwner/:id", companyController.listWithoutOwner);

//CRUD Appointment
router.get("/appointment/getOneDay/:companyId/:day", (req, res) => {
  try {
    appointmentController.listFromCompany(req, res);
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

router.get("/appointment/:companyId/:userId", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id === req.params.userId
      ? appointmentController.listToUser(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

router.post("/appointment/add/:companyId/:userId", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id === req.params.userId
      ? appointmentController.add(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});
router.put("/appointment/edit/:id", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id === req.params.userId
      ? appointmentController.edit(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});
router.delete("/appointment/delete/:id/:userId", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id === req.params.userId
      ? appointmentController.delete(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});
router.get("/appointment/:id", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded._id === req.params.userId
      ? appointmentController.listOne(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});


//CRUD Schedule
router.post("/schedule/add/:companyId", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded.companyId === req.params.companyId
      ? scheduleController.add(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

router.post("/schedule/multipleAdd/:companyId", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded.companyId === req.params.companyId
      ? scheduleController.multipleAdd(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

// router.put('/schedule/edit/:scheduleId', scheduleController.edit);

router.delete("/schedule/delete/:companyId/:weekday", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let decoded = jwt.verify(token, secret);
    decoded.companyId === req.params.companyId
      ? scheduleController.delete(req, res)
      : res.send("Error");
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

router.get("/schedule/:companyId/:weekday", (req, res) => {
  try {
    scheduleController.list(req, res);
  } catch (error) {
    res.status(401).send("El token no es válido");
  }
});

module.exports = router;
