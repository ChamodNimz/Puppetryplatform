import * as mongoose from 'mongoose';
import validator from 'validator';

export const ShareCountSchema = new mongoose.Schema({

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