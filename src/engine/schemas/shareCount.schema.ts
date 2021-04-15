import * as mongoose from 'mongoose';
import validator from 'validator';

export const ShareCount = new mongoose.Schema({

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
    count: {
        type: Number,
        required: false,
    }
});