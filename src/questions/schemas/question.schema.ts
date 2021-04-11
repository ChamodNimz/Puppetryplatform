import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({

    id: {
        type: String,
    },
    question: {
        type: String,
        required: true
    }
});