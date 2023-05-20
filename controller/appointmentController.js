const Appointment = require('../model/appointmentModel');
const User = require('../model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require("./factoryHandler");

exports.getAllAppointment = factory.getAll(Appointment);
exports.getAppointment = factory.getOne(Appointment, 'hospital');
exports.updateAppoint = factory.updateOne(Appointment);
//exports.deleteUser = factory.deleteOne(Appointment);
exports.createAppointment = catchAsync(async (req, res, next) => {
    const appointments = await Appointment.find({ doctor: req.body.doctor, schedule: req.body.schedule });
    req.body.serial = appointments.length + 1;

    const docProfile = await User.findById(req.body.doctor);

    const schedule = docProfile.availability;
    const available = schedule.filter(el => el.day === req.body.schedule.day && el.startTime === req.body.schedule.startTime && el.endTime === req.body.schedule.endTime);
    if (available.length < 1) {
        return next(new AppError('Doctor not abailable on that time or day'));
    }
    const doc = await Appointment.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

