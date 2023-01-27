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
    facilities: [String],
    services: [String],
    about: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});
const Hospital = mongoose.model('Hospital', hospitalSchema);


module.exports = Hospital;