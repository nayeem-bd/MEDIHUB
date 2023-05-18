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
    isPaid: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});



const Appointment = mongoose.model('Appointment',appointmentSchema);

module.exports = Appointment;