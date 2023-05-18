const express = require('express');
const authController = require('../controller/authController');
const appointmentController = require('../controller/appointmentController');

const router = express.Router();

router.use(authController.protect);

// router.get('/', appointmentController);
// router.post('/', appointmentController);
// router.get('/:id', appointmentController);


module.exports = router;