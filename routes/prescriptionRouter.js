const express = require('express');
const authController = require('../controller/authController');
const prescriptionController = require('../controller/prescriptionController');

const router = express.Router();

router.use(authController.protect);


router.get('/', prescriptionController.getAllPrescription);
router.post('/', authController.restrictTo('doctor'), prescriptionController.createPrescription);
router.get('/:id', prescriptionController.getPrescription);
router.patch('/:id', authController.restrictTo('doctor'), prescriptionController.updatePrescription);


module.exports = router;