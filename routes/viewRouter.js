const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
//const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/login',viewController.signIn);
router.get('/signup',viewController.signUp);

router.get('/',authController.isLoggedIn,viewController.landingpage);
router.get('/aboutus',authController.isLoggedIn,viewController.aboutus);
router.get('/blogs',authController.isLoggedIn,viewController.blogs);
router.get('/hospitalReg',authController.isLoggedIn,viewController.hospitalRegistration);

router.get('/doctors',authController.isLoggedIn,viewController.showDoctors);
router.get('/doctors/:docId',authController.isLoggedIn,viewController.showOneDoctor);
router.get('/doctors/:docId/appointment',authController.isLoggedIn,viewController.bookAppointment);

router.get('/hospitals',authController.isLoggedIn,viewController.showHospitals);
router.get('/hospitals/:hosId',authController.isLoggedIn,viewController.showOneHospital);
router.get('/dashboard',authController.protect,viewController.me);
router.get('/dashboard/appointments',authController.protect,viewController.showAppointments);
router.get('/dashboard/history',authController.protect,viewController.showHistory);
router.get('/dashboard/schedule',authController.protect,authController.restrictTo('doctor'),viewController.showSchedule);
router.get('/dashboard/doctors',authController.protect,authController.restrictTo('receptionist'),viewController.showHospitalDoctors);
router.get('/prescription/:presId',authController.protect,viewController.showPrescription);

// router.get('/tour/:slug',authController.isLoggedIn,viewController.getTour);
// router.get('/login',authController.isLoggedIn,viewController.getLoginForm);
// router.get('/me',authController.protect,viewController.getAccount);
// router.get('/my-tours',authController.protect,viewController.getMyTours);

// router.post('/submit-user-data',authController.protect,viewController.updateUserData);

module.exports = router;