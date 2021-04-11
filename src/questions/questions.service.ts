import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './interfaces/question.interface';

@Injectable()
export class QuestionsService {

    constructor(@InjectModel('Question') private readonly questionModel: Model<Question>) {}

    async findAll(): Promise<Question[]>{
        
        return await this.questionModel.find();
    }

    async findOne(id: string):  Promise<Question>{

        return await this.questionModel.findOne({_id: id});        
    }

    async findOneByEmail(email: string):  Promise<Question>{

        return await this.questionModel.findOne({email: email});        
    }

    async create(createContractor: CreateQuestionDto) {

        const newContractor = new this.questionModel(createContractor);
        return await newContractor.save();
    }
}
