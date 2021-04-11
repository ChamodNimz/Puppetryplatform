import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLeadsDto } from './dto/create-leads.dto';
import { Lead } from './interfaces/lead.interface';

@Injectable()
export class LeadsService {

    constructor(@InjectModel('Lead') private readonly leadModel: Model<Lead>) {}

    async findAll(): Promise<Lead[]>{
        
        return await this.leadModel.find();
    }

    async findOne(id: String):  Promise<Lead>{

        return await this.leadModel.findOne({_id: id});        
    }

    async create(createLeads: CreateLeadsDto) {

        return await this.leadModel.insertMany(createLeads);
    }

    async createOne(createLeads: CreateLeadsDto) {

        const newLead = new this.leadModel(createLeads);
        //newLead.dateOfBirth = new Date(newLead.dateOfBirth);
        return await newLead.save();
    }
    
}
