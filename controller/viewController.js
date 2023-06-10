
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const Appointment = require('../model/appointmentModel');
const User = require('../model/userModel');
const Hospital = require('../model/hospitalModel');
const Prescription = require('../model/prescriptionModel');

const URL = process.env.API_URL;

exports.landingpage = catchAsync(async (req, res, next) => {
    let doctors = [];
    const response = await axios.get(`${URL}/api/v1/users/doctors?role=doctor`);
    let tempDoc = response.data.data.data;
    tempDoc.sort((a, b) => b.rating - a.rating);
    tempDoc = tempDoc.filter(el => el.hospital);
    doctors = tempDoc.slice(0, 4);
    const respon = await axios.get(`${URL}/api/v1/hospitals/`)
    let hospitals = respon.data.data.data;
    hospitals = hospitals.slice(0, 4);
    res.status(200).render('landingpage', {
        title: 'Home Page',
        doctors,
        hospitals
    });
});

exports.signUp = async (req, res, next) => {
    res.status(200).render('signUp', {
        title: 'Sign Up'
    });
}

exports.signIn = async (req, res, next) => {
    res.status(200).render('signIn', {
        title: 'Sign In'
    });
}

exports.showDoctors = catchAsync(async (req, res, next) => {
    const response = await axios.get(`${URL}/api/v1/users/doctors?role=doctor`);
    let doctors = response.data.data.data;
    doctors = doctors.filter(el => el.hospital);
    res.status(200).render('doctors', {
        title: 'Doctors',
        doctors
    });
});

exports.showOneDoctor = catchAsync(async (req, res, next) => {
    const response = await axios.get(`${URL}/api/v1/users/doctors/${req.params.docId}`);
    const doctor = response.data.data.doc;

    res.status(200).render('doctorDetails', {
        title: doctor.name,
        doctor
    });
});

exports.bookAppointment = catchAsync(async (req, res, next) => {
    const response = await axios.get(`${URL}/api/v1/users/doctors/${req.params.docId}`);
    const doctor = response.data.data.doc;
    const schedule = doctor.availability;

    const timeRange = schedule.map(el => `${el.startTime} - ${el.endTime}`);
    const uniqueTimeRange = [...new Set(timeRange)];
    //console.log(uniqueTimeRange);
    res.status(200).render('appointmentBook', {
        title: doctor.name,
        doctor,
        timeRange: uniqueTimeRange
    });
});

exports.showHospitals = catchAsync(async (req, res, next) => {
    const response = await axios.get(`${URL}/api/v1/hospitals/`);
    const hospitals = response.data.data.data;
    res.status(200).render('hospitals', {
        title: 'Hospitals',
        hospitals
    });
});

exports.showOneHospital = catchAsync(async (req, res, next) => {
    //console.log(req.params);
    const response = await axios.get(`${URL}/api/v1/hospitals/${req.params.hosId}`);
    const hospital = response.data.data.doc;
    //console.log(hospital);
    const response2 = await axios.get(`${URL}/api/v1/users/doctors?role=doctor`);
    let doctors = response2.data.data.data;
    doctors = doctors.filter(el => el.hospital);
    doctors = doctors.filter(el => el.hospital._id === req.params.hosId);

    const response3 = await axios.get(`${URL}/api/v1/users/doctors?role=receptionist`);
    let receptionist = response3.data.data.data;
    receptionist = receptionist.filter(el => el.hospital._id === req.params.hosId);

    res.status(200).render('hospitalDetails', {
        title: hospital.name,
        hospital,
        numOfDoctor: doctors.length,
        numOfReceptionist: receptionist.length
    });
});

exports.me = catchAsync(async (req, res, next) => {
    const hospitals = await Hospital.find({});
    res.status(200).render('dashboard', {
        title: req.user.role,
        hospitals
    });
});

exports.showAppointments = catchAsync(async (req, res, next) => {

    let appointments;
    if (req.user.role === 'receptionist') {
        appointments = await Appointment.find({});
        appointments = appointments.filter(el => el.doctor.hospital.id === req.user.hospital.id);
    }
    else if (req.user.role === 'doctor') {
        appointments = await Appointment.find({ doctor: req.user._id });
        appointments = appointments.filter(el => el.isPaid === true);
        appointments = await Promise.all(appointments.map(async el => {
            const data = await Prescription.findOne({ appointment: el.id });
            if (data) el.prescription = data.id;
            return el;
        }));
    } else if (req.user.role === 'user') {
        appointments = await Appointment.find({ user: req.user._id });
    }

    res.status(200).render('appointments', {
        title: 'Appointments',
        appointments
    });
});

exports.showHistory = catchAsync(async (req, res, next) => {
    let prescriptions;
    if (req.user.role === 'receptionist') {
        prescriptions = await Prescription.find({});
        prescriptions = prescriptions.filter(el => el.appointment.doctor.hospital.id === req.user.hospital.id);
    }
    else if (req.user.role === 'doctor') {
        prescriptions = await Prescription.find({});
        prescriptions = prescriptions.filter(el => el.appointment.doctor.id === req.user.id)
    }
    else if (req.user.role === 'user') {
        prescriptions = await Appointment.find({});
        prescriptions = prescriptions.filter(el => el.appointment.user.id === req.user.id);
    }
    res.status(200).render('history', {
        title: 'History',
        prescriptions
    });
});

const convertTime12to24 = (time12h) => {
    const [fullMatch, time, modifier] = time12h.match(/(\d?\d:\d\d)\s*(\w{2})/i);
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
        hours = '00';
    }
    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
}

exports.showSchedule = catchAsync(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    const schedule = user.availability.map(el => {
        el.startTime = convertTime12to24(el.startTime);
        el.endTime = convertTime12to24(el.endTime);
        return el;
    });
    const daysName = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const allDays = daysName.map(day => {
        const matchingSchedule = schedule.find(item => item.day === day);
        return matchingSchedule || { day: day, startTime: '', endTime: '' };
    });
    //console.log(allDays);
    res.status(200).render('schedule', {
        title: 'Schedule',
        schedule: allDays
    });
});

exports.showPrescription = catchAsync(async (req, res, next) => {
    const prescription = await Prescription.findById(req.params.presId);
    res.status(200).render('prescription', {
        title: 'Prescription',
        prescription
    });
});

exports.showHospitalDoctors = catchAsync(async (req, res, next) => {
    const doctors = await User.find({ role: 'doctor', hospital: req.user.hospital.id });
    res.status(200).render('hospitalDoctors', {
        title: 'Doctors',
        doctors
    });
});

exports.aboutus = catchAsync(async (req, res, next) => {
    res.status(200).render('aboutus', {
        title: 'About Us'
    });
});

exports.blogs = catchAsync(async (req, res, next) => {
    res.status(200).render('blogs', {
        title: 'Blogs'
    });
});

exports.hospitalRegistration = catchAsync(async (req, res, next) => {
    res.status(200).render('hospitalReg', {
        title: 'Hospital Registration'
    });
});
