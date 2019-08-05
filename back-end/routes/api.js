var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const appointmentController = require('../controllers/appointmentController');
const authController = require('../controllers/authController');
const scheduleController = require('../controllers/scheduleController');

//Auth
router.post('/auth/user', authController.authUser);

//CRUD User
router.post('/user/add', userController.add);
router.put('/user/edit/:id', userController.edit);
router.delete('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.listOne);

//CRUD Company
router.post('/company/add', companyController.add);
router.put('/company/edit/:id', companyController.edit);
router.delete('/company/delete/:id', companyController.delete);
router.get('/company/list', companyController.listAll);
router.get('/company/:id', companyController.listOne);
 
//CRUD Appointment
router.post('/appointment/add/:companyId/:userId', appointmentController.add);
router.put('/appointment/edit/:id', appointmentController.edit);
router.delete('/appointment/delete/:id', appointmentController.delete);
router.get('/appointment/:id', appointmentController.listOne);
router.get('/appointment/:companyId/:day', appointmentController.listFromCompany);

//CRUD Schedule
router.post('/schedule/add/:companyId', scheduleController.add);
router.put('/schedule/edit/:scheduleId', scheduleController.edit);
router.delete('/schedule/delete/:scheduleId', scheduleController.delete);
router.get('/schedule/:companyId/:weekday', scheduleController.list);

module.exports = router;
