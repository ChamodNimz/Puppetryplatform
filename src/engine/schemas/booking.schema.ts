import * as mongoose from 'mongoose';
import validator from 'validator';

export const BookingSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    bookedShow: {
        type: String,
        required: true,
    },
    bookedTeam: {
        type: String,
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});