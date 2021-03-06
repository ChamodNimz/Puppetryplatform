import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePuppetTeamDto } from './dto/create-puppetryTeam.dto';
import { ScheduleShowDto } from './dto/schedule-show.dto';
import { PuppetTeam } from './interfaces/PuppetryTeam.interface';
import { PuppetTeamModule } from './PuppetTeam.module';
import { PuppetTeamSchema } from './schemas/PuppetTeam.schema';

@Injectable()
export class PuppetTeamService {

    constructor(@InjectModel('PuppetTeam') private readonly puppetTeamModel: Model<PuppetTeam>) { }

    async findAll(): Promise<PuppetTeam[]> {

        return await this.puppetTeamModel.find();
    }

    async findAllNearMe(long:number, lat: number): Promise<PuppetTeam[]> {

        // let locQuery = (distance) => {
        //     return { location: { $near: { $geometry: { type: "Point", coordinates: [long,lat] }, $maxDistance: parseInt(distance)}}}
        // }
        return await this.puppetTeamModel.find().limit(3);
        //{ location: { $near: { $geometry: { type: "Point", coordinates: [long,lat] }, $maxDistance: parseInt('5000')}}}
        //return await this.puppetTeamModel.find({"shows": { location: { $near: { $geometry: { type: "Point", coordinates: [long,lat] }, $maxDistance: parseInt('5000')}}} });
    }

    async findOne(id: string): Promise<PuppetTeam> {

        return await this.puppetTeamModel.findOne({ _id: id });
    }

    async findOneByEmail(email: string): Promise<PuppetTeam> {

        return await this.puppetTeamModel.findOne({ email: email });
    }

    async create(createContractor: CreatePuppetTeamDto) {

        const newTeam = new this.puppetTeamModel(createContractor);
        return await newTeam.save();
    }

    async scheduleShow(scheduleShowDto: ScheduleShowDto) {

        let team = await this.puppetTeamModel.findOne({ _id: scheduleShowDto.id });
        team.shows.push(scheduleShowDto);
        return await team.save();

    }

    async update(id, puppetTeam: PuppetTeam) {

        return await this.puppetTeamModel.findOneAndUpdate({ _id: id }, puppetTeam, {new: true, useFindAndModify: false});
    }
}
