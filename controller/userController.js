const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require("./factoryHandler");

exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.deleteMe = catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user._id,{active:false});
    res.status(204).json({
        status:'success',
        data:null
    });
});

// exports.getTopDoctors = (limit) => catchAsync(async(req,res,next)=>{
//     let query = User.find().populate('hospital');
//     const doctors = await User.aggregate().match({role:'doctor'}).sort('-rating').limit(limit).exec();
//     res.status(200).json({
//         status:'success',
//         data:doctors
//     });
// });