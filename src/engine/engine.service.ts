import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { CountShareDto } from './dto/count-share.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RateShowDto } from './dto/rate-show.dto';
import { Booking } from './interfaces/booking.interface';
import { Comment } from './interfaces/comment.interfac';
import { ShareCount } from './interfaces/shareCount.interface';
import { ShowRating } from './interfaces/showRating.interface';

@Injectable()
export class EngineService {

    constructor(
        @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
        @InjectModel('ShowRating') private readonly showRatingModel: Model<ShowRating>,
        @InjectModel('ShareCount') private readonly shareCountModel: Model<ShareCount>,
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
        
        ) { }

    async createBooking(createBookingDto: CreateBookingDto) {

        const newBooking = new this.bookingModel(createBookingDto);
        return await newBooking.save();
    }

    async rateShow(rateShowDto: RateShowDto) {

        const newRating = new this.showRatingModel(rateShowDto);
        return await newRating.save();
    }

    async findShareCount(countShareDto: CountShareDto): Promise<ShareCount> {

        return await this.shareCountModel.findOne({ bookedTeam: countShareDto.bookedTeam, bookedShow: countShareDto.bookedShow });
    }

    async findComments(commentDtp: CommentDto): Promise<Comment> {

        return await this.commentModel.findOne({ bookedTeam: commentDtp.bookedTeam, bookedShow: commentDtp.bookedShow });
    }
    async findAllComments(): Promise<Comment[]> {

        return await this.commentModel.find();
    }

    async saveComment(commentDto: CommentDto) {

        const newComment = new this.commentModel(commentDto);
        return await newComment.save(); 
    }

    async createCount(countShareDto: CountShareDto) {

        const newShareCount = new this.shareCountModel(countShareDto);
        newShareCount.count = 1;
        return await newShareCount.save(); 
    }
}
