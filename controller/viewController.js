
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

exports.landingpage = catchAsync(async (req, res, next) => {
    let doctors = [];
    const response = await axios.get('http://localhost:4000/api/v1/users/doctors?role=doctor');
    const tempDoc = response.data.data.data;
    tempDoc.sort((a, b) => b.rating - a.rating);
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
    const doctors = response.data.data.data;

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
    const { role } = req.user;
    //console.log(role);
    if (role === 'user') {
        res.status(200).render('userDashboard', {
            title: 'User'
        });
    }
    else if (role === 'doctor') {
        //console.log('doctor');
    }

});