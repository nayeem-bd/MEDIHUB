const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        zipCode: String
    },
    phone: {
        type: String,
        required: true
    },
    photo:{
        type:String,
        default:'default.jpg'
    },
    email:{
        type:String,
        default:'info@medihub.com'
    },
    website:{
        type:String,
        default:'medihub.com'
    },
    services: [String],
    about: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;