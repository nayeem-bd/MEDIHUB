const express = require('express');
const viewController = require('../controller/viewController');
const authController = require('../controller/authController');
//const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/',authController.isLoggedIn,viewController.landingpage);
router.get('/signin',viewController.signIn);
router.get('/signup',viewController.signUp);
router.get('/doctors',viewController.showDoctors);
router.get('/hospitals',viewController.showHospitals);
router.get('/dashboard',authController.protect,viewController.me);
// router.get('/tour/:slug',authController.isLoggedIn,viewController.getTour);
// router.get('/login',authController.isLoggedIn,viewController.getLoginForm);
// router.get('/me',authController.protect,viewController.getAccount);
// router.get('/my-tours',authController.protect,viewController.getMyTours);

// router.post('/submit-user-data',authController.protect,viewController.updateUserData);

module.exports = router;