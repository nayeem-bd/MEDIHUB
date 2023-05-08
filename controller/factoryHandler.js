const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getAll = (Model,popOptions) => catchAsync(async(req,res,next)=>{
    //filer review by doctor
    let filter = {};
    if(req.params.doctorId) filter = {doctor:req.params.doctorId};
    let query;
    if(Object.keys(filter).length>0){
        query = Model.find(filter);
        //console.log('hello');
    }
    else{
        query = Model.find();
    }
    if(popOptions){
        query.populate(popOptions);
    }
    //execute query
    const feature = new APIFeatures(query,req.query).filter().sort().limitFields().paginate();
    const doc = await feature.query;
    res.status(200).json({
        status:'success',
        results:doc.length,
        data:{
            data:doc
        }
    })
});

exports.getOne = (Model,popOptions)=> catchAsync(async(req,res,next)=>{
    // eslint-disable-next-line prefer-const
    let query = Model.findById(req.params.id);
    if(popOptions){
        query.populate(popOptions);
    }
    const doc = await query;
    if(!doc){
        return next(new AppError('This Id is not valid',404));
    }
    res.status(200).json({
        status:'success',
        data:{
            doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req,res,next)=>{
    const doc = await Model.create(req.body);
    res.status(201).json({
        status:'success',
        data:{
            data:doc
        }
    });
});

exports.deleteOne = Model => catchAsync(async (req,res,next)=>{
    const doc = await Model.findByIdAndDelete(req.params.id);
    if(!doc){
        return next(new AppError('This Id is not valid',404));
    }
    res.status(204).json({
        status:'success',
        data:null
    });
});

exports.updateOne = Model => catchAsync(async(req,res,next)=>{
    const doc = await Model.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators:true
    });

    if(!doc){
        return next(new AppError('This Id is not valid',404));
    }

    res.status(200).json({
        status:'success',
        data:{
            data:doc
        }
    });
});