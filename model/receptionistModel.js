const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const receptionistSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true,'User must have a name']
  },
  phone:{
    type: String,
    required: [true,'User must have a phone number'],
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
    required:[true,'User must have a password'],
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
  gender: String,
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});




const Receptionist = mongoose.model('Receptionist',receptionistSchema);
module.exports = Receptionist;