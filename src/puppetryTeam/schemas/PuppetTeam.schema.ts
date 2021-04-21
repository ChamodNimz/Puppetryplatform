import * as mongoose from 'mongoose';
import { PuppetShowSchema } from './Show.schema';

export const PuppetTeamSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    teamName: {
        type: String,
        required: [true,'Team name must be included']
    },
    startedSince: {
        type: String,
        required: [true,'Started year should be included']
    },
    email: {
        type: String,
        required: [true, 'Provide a valide email']
    },
    password: {
        type: String,
        required: [true, 'Must include a password'],
        min: [6,'Password should be minimum 6 characters long'],
        max: [10,'Password should not exceed 10 characters']
    },
    teamMemberCount: {
        type: Number,
        required: [true,'What is your current team capacity?']
    },
    typeOfPerformance: {
        type: String,
        required: false
    },
    shows: {
        type: [PuppetShowSchema],
        required: false
    }
});