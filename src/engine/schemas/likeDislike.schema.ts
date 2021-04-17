
import * as mongoose from 'mongoose';
import validator from 'validator';

export const LikeDislikeSchema = new mongoose.Schema({

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
    liked: {
        type: Boolean,
        required: false,
    },
    disliked: {
        type: Boolean,
        required: false,
    },
    publicUserId: {
        type: String,
        required: true,
    }
});