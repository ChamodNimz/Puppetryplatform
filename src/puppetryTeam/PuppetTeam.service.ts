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

        return await this.puppetTeamModel.findOneAndUpdate({ _id: id }, puppetTeam);
    }
}
