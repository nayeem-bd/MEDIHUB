
const sharp = require('sharp');
const multer = require('multer');

const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require("./factoryHandler");
const AppError = require('../utils/appError');

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

const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new AppError('Not an Image! Please upload only image',400),false);
    }
}

const upload = multer({
    storage:multerStorage,
    fileFilter:multerFilter
});
exports.updateUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async(req,res,next)=>{
    if(!req.file) return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:90}).toFile(`public/img/user/${req.file.filename}`);
    next();
});


exports.updateMe = catchAsync(async(req,res,next)=>{
    // eslint-disable-next-line no-console
    console.log(req.file);
    //1) if body contains password
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError('This is not route for password change',400));
    }

    //2) update document
    const filteredBody = req.body;
    if(req.file){
        filteredBody.photo = req.file.filename;
    }
    const updatedUser = await User.findByIdAndUpdate(req.user._id,filteredBody,{
        new:true,
        runValidators:true
    });

    res.status(200).json({
        status:'success',
        user: updatedUser
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