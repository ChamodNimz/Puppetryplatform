import * as mongoose from 'mongoose';
import validator from 'validator';

export const CommentSchema = new mongoose.Schema({

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
    publicUserid: {
        type: String,
        required: true,
    },
    comments: {
        type: [String],
        required: false,
    }
});