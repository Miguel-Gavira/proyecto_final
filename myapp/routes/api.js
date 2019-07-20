var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

router.post('/user/add', userController.add);
router.put('/user/edit/:id', userController.edit);
router.delete('/user/delete/:id', userController.delete);
router.get('/user/:id', userController.listOne);

module.exports = router;
