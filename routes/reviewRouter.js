const express = require('express');

//const userController = require('../controller/userController');
const authController = require('../controller/authController');
const reviewController = require('../controller/reviewController');

const router = express.Router();

router.get('/', reviewController.getAllReviews);
router.post('/',authController.protect,reviewController.createReview);



module.exports = router;