import * as mongoose from 'mongoose';
import { PuppetShowSchema } from './Show.schema';

export const PuppetTeamSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    teamName: {
        type: String,
        required: true
    },
    startedSince: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    teamMemberCount: {
        type: Number,
        required: true
    },
    typeOfPerformance: {
        type: String,
        required: true
    },
    shows: {
        type: [PuppetShowSchema],
        required: false
    }
});