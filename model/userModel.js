const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User must have a name']
  },
  phone: {
    type: String,
    required: [true, 'User must have a phone number'],
    unique: true,
    validate: {
      validator: function (el) {
        return validator.isMobilePhone(el.toString(), 'bn-BD')
      }
    }
  },
  email: {
    type: String,
    required: false,
    lowercase: true,
    validate: [validator.isEmail, 'Provide a valid email']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  password: {
    type: String,
    required: [true, 'User must have a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not same'
    },
    select: false
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpire: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'doctor', 'receptionist', 'admin'],
    default: 'user'
  },
  age: Number,
  bloodGroup: String,
  isAgreedDonate: {
    type: Boolean,
    default: false
  },
  isDiabetic: {
    type: Boolean,
    default: false
  },
  gender: String,
  address: {
    zila: String,
    upazila: String,
    street: String
  },
  specialty: {
    type:String,
    default:'unknown'
  },
  availability: [{
    day: {
      type: String,
      required: true
    },
    startTime: {
      type: String,
      required: true
    },
    endTime: {
      type: String,
      required: true
    }
  }],
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital'
  },
  education: [String],
  training: [String],
  experience: Number,
  fee: Number,
  rating: {
    type: Number,
    min: [0, 'Must be greater than zero'],
    max: [5, 'Must be less than five'],
    default: 4.5
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next;

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangeAt = Date.now() - 1000;
  next();
});

// userSchema.pre(/^find/,function(next){
//   this.find({active:{$ne:false}});
//   next();
// });

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changePasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    const changedTimestamp = parseInt(this.passwordChangeAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
}

const User = mongoose.model('User', userSchema);
module.exports = User;