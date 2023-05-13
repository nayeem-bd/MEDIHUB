const Review = require('../model/reviewModel');
const factory = require('./factoryHandler');

exports.getAllReviews = factory.getAll(Review);

// exports.setTourUserIds = (req,res,next)=>{
//     //allow nested routes
//     if(!req.body.tour) req.body.tour = req.params.tourId;
//     if(!req.body.user) req.body.user = req.user.id;
//     next();
// }

exports.createReview = factory.createOne(Review);
