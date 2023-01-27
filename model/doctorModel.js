const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true,'Doctor must have a name']
  },
  phone:{
    type: String,
    required: [true,'Doctor must have a phone number'],
    validate:{
        validator : function(el){
            return validator.isMobilePhone(el.toString(), 'bn-BD')
        }
    }
  },
  email:{
    type:String,
    required:false,
    lowercase:true,
    unique:true,
    validate:[validator.isEmail,'Provide a valid email']
  },
  photo:{
    type:String,
    default:'default.jpg'
  },
  password:{
    type: String,
    required:[true,'Doctor must have a password'],
    minlength:8,
    select:false
  },
  passwordConfirm:{
    type: String,
    required: [true,'Confirm your password'],
    validate:{
        validator : function(el){
            return el===this.password;
        },
        message:'Passwords are not same'
    }
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  active:{
    type:Boolean,
    default:true,
    select:false
  },
  age:Number,
  gender: String,
  address:{
    zila:String,
    upzila:String,
    street:String
  },
  speciality: String,
  ratingsAverage:{
    type: Number,
    default: 4.5,
    min:[1,'Rating must be above 1.0'],
    max:[5,'Rating must be below 5.0'],
    set: val=> Math.round(val*10)/10;
  },
  ratingsQuantity:{
    type:Number,
    default:0
  },
  fee:{
    type:Number,
    required:[true,'A doctor must have a fee']
  },
  appointmentTime:[
    {
        startTime: 
    }
  ],
  gender: String,
  experience : String

},{
    toJSON : {virtuals:true},
    toObject : {virtuals:true}
});





const Doctor = mongoose.model('Doctor',doctorSchema);
module.exports = Doctor;