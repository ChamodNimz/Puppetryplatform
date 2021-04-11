import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePuppetTeamDto } from './dto/create-puppetryTeam.dto';
import { PuppetTeam } from './interfaces/PuppetryTeam.interface';

@Injectable()
export class PuppetTeamService {

    constructor(@InjectModel('PuppetTeam') private readonly PuppetTeamModel: Model<PuppetTeam>) {}

    async findAll(): Promise<PuppetTeam[]>{
        
        return await this.PuppetTeamModel.find();
    }

    async findOne(id: string):  Promise<PuppetTeam>{

        return await this.PuppetTeamModel.findOne({_id: id});        
    }

    async findOneByEmail(email: string):  Promise<PuppetTeam>{

        return await this.PuppetTeamModel.findOne({email: email});        
    }

    async create(createContractor: CreatePuppetTeamDto) {

        const newContractor = new this.PuppetTeamModel(createContractor);
        return await newContractor.save();
    }
}
