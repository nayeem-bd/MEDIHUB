const mongoose = require('mongoose');


const prescriptionSchema = mongoose.Schema({
  appointment: {
    type: mongoose.Types.ObjectId,
    ref:'Appointment',
    required:[true,'Prescription must have appointment id']
  },
  medicine:[{
    name:{
      type:String,
      required:[true,'medicine must have a name']
    },
    morning:{
      type:Number,
      default:0
    },
    noon:{
      type:Number,
      default:0
    }
    ,
    night:{
      type:Number,
      default:0
    },
    takingTime:{
      type:String,
      default:'selectOne',
      enum:['selectOne','beforeMeal','afterMeal']
    }
  }]
  , createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

prescriptionSchema.pre(/^find/,function(next){
  this.populate({
      path:'appointment',
      populate:[{
          path:'doctor',
          model:'User'
      },{
        path:'user',
        model:'User'
      }]
  });

  next();
});



const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;