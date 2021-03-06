import * as mongoose from 'mongoose';

export const PuppetShowSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    showName: {
        type: String,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    showDescription: {
        type: String,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true
    },
    // location: {
    //     type: {
    //         type: String, // Don't do `{ location: { type: String } }`
    //         //enum: ['Point'], // 'location.type' must be 'Point'
    //         default:'Point',
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    long: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    seatCount: {
        type: Number,
        required: true
    },
    typeOfPerformance: {
        type: String,
        required: false
    }
});
// PuppetShowSchema.index({location:'2dsphere'});