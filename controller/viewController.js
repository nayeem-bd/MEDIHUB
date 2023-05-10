
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');

exports.landingpage = catchAsync(async (req, res, next) => {
    let doctors = [];
    const response = await axios.get('http://localhost:4000/api/v1/users/doctors?role=doctor');
    const tempDoc = response.data.data.data;

    tempDoc.sort((a, b) => b.rating - a.rating);
    doctors = tempDoc.slice(0, 4);

    res.status(200).render('landingpage', {
        title: 'Home Page',
        doctors
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

exports.showHospitals = catchAsync(async (req, res, next) => {
    const response = await axios.get('http://localhost:4000/api/v1/hospitals/')
    const hospitals = response.data.data.data;
    res.status(200).render('hospitals', {
        title: 'Hospitals',
        hospitals
    });
});