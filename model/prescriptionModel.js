const mongoose = require('mongoose');


const prescriptionSchema = mongoose.Schema({
  appointment: {
    type: mongoose.Types.ObjectId,
    ref:'Appointment',
    required:[true,'Prescription must have appointment id']
  },
  medicine:[{
    name:String,
    
  }]
  , createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});





const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;