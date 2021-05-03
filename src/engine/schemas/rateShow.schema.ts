import * as mongoose from 'mongoose';
import validator from 'validator';

export const ShowRatingShema = new mongoose.Schema({

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
    publicUserId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
});