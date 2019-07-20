var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const appointmentController = require('../controllers/appointmentController');

//CRUD User
router.post('/user/add', userController.add);
router.put('/user/edit/:id', userController.edit);
router.delete('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.listOne);

//CRUD Company
router.post('/company/add', companyController.add);
router.put('/company/edit/:id', companyController.edit);
router.delete('/company/delete/:id', companyController.delete);
router.get('/company/:id', companyController.listOne);

//CRUD Appointment
router.post('/appointment/add/:companyId/:userId', appointmentController.add);
router.put('/appointment/edit/:id', appointmentController.edit);
router.delete('/appointment/delete/:id', appointmentController.delete);
router.get('/appointment/:id', appointmentController.listOne);



module.exports = router;
