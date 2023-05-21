
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

exports.landingpage = catchAsync(async (req, res, next) => {
    let doctors = [];
    const response = await axios.get('http://localhost:4000/api/v1/users/doctors?role=doctor');
    let tempDoc = response.data.data.data;
    tempDoc.sort((a, b) => b.rating - a.rating);
    tempDoc = tempDoc.filter(el => el.hospital);
    doctors = tempDoc.slice(0, 4);
    const respon = await axios.get('http://localhost:4000/api/v1/hospitals/')
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
    const response = await axios.get('http://localhost:4000/api/v1/users/doctors?role=doctor');
    let doctors = response.data.data.data;
    doctors = doctors.filter(el => el.hospital);
    res.status(200).render('doctors', {
        title: 'Doctors',
        doctors
    });
});

exports.showOneDoctor = catchAsync(async (req, res, next) => {
    const response = await axios.get(`http://localhost:4000/api/v1/users/doctors/${req.params.docId}`);
    const doctor = response.data.data.doc;

    res.status(200).render('doctorDetails', {
        title: doctor.name,
        doctor
    });
});

exports.bookAppointment = catchAsync(async (req, res, next) => {
    const response = await axios.get(`http://localhost:4000/api/v1/users/doctors/${req.params.docId}`);
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
    const response = await axios.get('http://localhost:4000/api/v1/hospitals/');
    const hospitals = response.data.data.data;
    res.status(200).render('hospitals', {
        title: 'Hospitals',
        hospitals
    });
});

exports.showOneHospital = catchAsync(async (req, res, next) => {
    //console.log(req.params);
    const response = await axios.get(`http://localhost:4000/api/v1/hospitals/${req.params.hosId}`);
    const hospital = response.data.data.doc;
    //console.log(hospital);
    const response2 = await axios.get('http://localhost:4000/api/v1/users/doctors?role=doctor');
    let doctors = response2.data.data.data;
    doctors = doctors.filter(el => el.hospital);
    doctors = doctors.filter(el => el.hospital._id === req.params.hosId);

    const response3 = await axios.get('http://localhost:4000/api/v1/users/doctors?role=receptionist');
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
    res.status(200).render('dashboard', {
        title: req.user.role
    });
});

exports.showAppointments = catchAsync(async (req, res, next) => {
    res.status(200).render('appointments', {
        title: 'Appointments'
    });
});

exports.showHistory = catchAsync(async (req, res, next) => {
    res.status(200).render('history', {
        title: 'History'
    });
});

exports.showSchedule = catchAsync(async (req, res, next) => {
    res.status(200).render('schedule', {
        title: 'Schedule'
    });
});

exports.showPrescription = catchAsync(async (req, res, next) => {
    res.status(200).render('prescription', {
        title: 'Prescription'
    });
});
