import * as mongoose from 'mongoose';
import validator from 'validator';

export const PublicUserSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        max: 60
    },
    email: {
        type: String,
        required: true,
        validate:[validator.isEmail,'Invalid email' ]
    },
    password: {
        type: String,
        required: true,
        max: 30
    },
    roles: {
        type: [],
    },
    long: {
        type: String,
        required: false,
    },
    lat: {
        type: String,
        required: false,
    }

});