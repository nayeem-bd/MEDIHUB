const Prescription = require('../model/prescriptionModel');
// const User = require('../model/userModel');
// const AppError = require('../utils/appError');
// const catchAsync = require('../utils/catchAsync');
const factory = require("./factoryHandler");

exports.getAllPrescription = factory.getAll(Prescription);
exports.getPrescription = factory.getOne(Prescription);
exports.updatePrescription = factory.updateOne(Prescription);
//exports.deleteUser = factory.deleteOne(Appointment);

exports.createPrescription = factory.createOne(Prescription);

