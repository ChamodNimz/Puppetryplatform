import * as mongoose from 'mongoose';
import validator from 'validator';

export const ContractorSchema = new mongoose.Schema({

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
    status: {
        type: Number // 1 - approved 0 - not approved
    },
    password: {
        type: String,
        required: true,
        max: 30
    },
    answers: {
        type: [] // Array of arrays
    },
    roles: {
        type: [],
    },
    answeredAt:{
        type: Date,
        required: false
    }
});