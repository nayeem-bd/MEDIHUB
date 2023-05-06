const express = require('express');

const hospitalController = require('../controller/hospitalController');
//const authController = require('../controller/authController');

const router = express.Router();

router.get('/',hospitalController.getAllHospital);
router.post('/',hospitalController.createHospital);

router.get('/:id',hospitalController.getHospital);


module.exports = router;