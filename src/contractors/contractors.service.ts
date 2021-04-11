import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { globalConstants } from '../auth/constants';
import { Model } from 'mongoose';
import { AnswerQuestionsDto } from './dto/answerQuestions-contractor.dto';
import { CreateContractorDto } from './dto/create-contractor.dto';
import { Contractor } from './interfaces/contractor.interface';

@Injectable()
export class ContractorsService {

    constructor(@InjectModel('Contractor') private readonly contractorModel: Model<Contractor>) { }

    async findAll(): Promise<Contractor[]> {

        return await this.contractorModel.find();
    }

    async findOne(id: string): Promise<Contractor> {

        return await this.contractorModel.findOne({ _id: id });
    }

    async findOneByEmail(email: string): Promise<Contractor> {

        const contractor = await this.contractorModel.findOne({ email: email });

        if (contractor.answeredAt) {

            let validTime = contractor.answeredAt.getTime() + globalConstants.evaluationExpiryDuration;
            let nowTime = new Date().getTime();
            if (validTime < nowTime) {
                contractor.status = 0; // update status to not evaluated
                contractor.save();
            }
        }
        return contractor;
    }

    async checkEmail(email: string): Promise<Contractor> {

        return await this.contractorModel.findOne({ email: email });
    }

    async create(createContractor: CreateContractorDto) {

        const newContractor = new this.contractorModel(createContractor);
        return await newContractor.save();
    }

    async answerQuestions(answerQuestionsDto: AnswerQuestionsDto) {

        const contractor = await this.contractorModel.findOne({ _id: answerQuestionsDto.contractorId });
        contractor.answers = answerQuestionsDto.answers;
        contractor.status = answerQuestionsDto.status;
        contractor.answeredAt = new Date();
        return await contractor.save();
    }
}
