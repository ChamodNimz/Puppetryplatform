import * as mongoose from 'mongoose';

export const LeadSchema = new mongoose.Schema({

     id: {
          type:String,
      },
     firstName: {
        type: String,
        required: true
    },
     lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    phoneNo:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    hasInsurance: {
        type: Boolean,
        required: true
    },
    // insuranceType:{
    //     type: String
    // },
    // painArea:{
    //     type: String
    // }

});