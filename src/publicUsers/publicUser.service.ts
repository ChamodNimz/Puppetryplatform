import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PublicUser } from './interfaces/publicUser.interface';
import { CreatePublicUserDto } from './dto/create-publicUser.dto';

@Injectable()
export class PublicUserService {

    constructor(@InjectModel('PublicUser') private readonly publicUserModel: Model<PublicUser>) { }

    async findAll(): Promise<PublicUser[]> {

        return await this.publicUserModel.find();
    }

    async findOne(id: string): Promise<PublicUser> {

        return await this.publicUserModel.findOne({ _id: id });
    }

    async findOneByEmail(email: string): Promise<PublicUser> {

        const publicUser = await this.publicUserModel.findOne({ email: email });
        return publicUser;
    }

    async create(createPublicUserDto: CreatePublicUserDto) {

        const publicUser = new this.publicUserModel(createPublicUserDto);
        return await publicUser.save();
    }
}
