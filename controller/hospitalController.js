const Hospital = require('../model/hospitalModel');
const catchAsync = require('../utils/catchAsync');
const factory = require("./factoryHandler");

exports.getAllHospital = factory.getAll(Hospital);
exports.getHospital = factory.getOne(Hospital);
exports.updateHospital = factory.updateOne(Hospital);
exports.deleteHospital = factory.deleteOne(Hospital);
exports.createHospital = factory.createOne(Hospital);

exports.deleteMe = catchAsync(async(req,res,next)=>{
    await Hospital.findByIdAndUpdate(req.user._id,{active:false});
    res.status(204).json({
        status:'success',
        data:null
    });
});
