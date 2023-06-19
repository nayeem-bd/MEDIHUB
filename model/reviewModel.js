const mongoose = require('mongoose');
const User = require('./userModel');
//const User = require('./userModel');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'Review can not be empty!']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a doctor.']
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Review must belong to a patient']
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//reviewSchema.index({ doctor: 1, patient: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'doctor',
        select: 'name'
    }).populate({
        path: 'patient',
        select: 'name'
    });
    next();
});


reviewSchema.statics.calcAverageRatings = async function (docId) {
    const stats = await this.aggregate([
        {
            $match: { doctor: docId }
        },
        {
            $group: {
                _id: '$doctor',
                nRating: { $sum: 1 },
                avgRating: { $avg: '$rating' }
            }
        }
    ]);

    if (stats.length > 0) {
        await User.findByIdAndUpdate(docId, {
            ratingsQuantity: stats[0].nRating,
            rating: stats[0].avgRating
        });
    } else {
        await User.findByIdAndUpdate(docId, {
            ratingsQuantity: 0,
            rating: 4.5
        });
    }

};

reviewSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.doctor);
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;