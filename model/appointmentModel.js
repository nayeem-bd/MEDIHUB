const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    doctor: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Appointment must contain a doctor']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Appointment must contain a user']
    },
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    schedule: {
        day: {
            type: String,
            required: [true, 'Day is required']
        },
        startTime: {
            type: String,
            required: [true, 'Start time is required']
        },
        endTime: {
            type: String,
            required: [true, 'End time is required']
        }
    },
    symptoms: String,
    isPaid: {
        type: Boolean,
        default: false
    },
    serial:{
        type:Number,
        default:1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    fee: {
        type:Number,
        default:0
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

appointmentSchema.pre(/^find/,function(next){
    this.populate({
        path:'doctor',
        populate:{
            path:'hospital',
            model:'Hospital'
        }
    }).populate({
        path:'user'
    });

    //this.populate('doctor').populate('user');
    next();
});

const Appointment = mongoose.model('Appointment',appointmentSchema);

module.exports = Appointment;