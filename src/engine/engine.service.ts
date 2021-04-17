import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { CountShareDto } from './dto/count-share.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { LikeDislikeDto } from './dto/likeDislike.dto';
import { RateShowDto } from './dto/rate-show.dto';
import { Booking } from './interfaces/booking.interface';
import { Comment } from './interfaces/comment.interfac';
import { LikeDislike } from './interfaces/likeDislike.interface';
import { ShareCount } from './interfaces/shareCount.interface';
import { ShowRating } from './interfaces/showRating.interface';

@Injectable()
export class EngineService {

    constructor(
        @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
        @InjectModel('ShowRating') private readonly showRatingModel: Model<ShowRating>,
        @InjectModel('ShareCount') private readonly shareCountModel: Model<ShareCount>,
        @InjectModel('Comment') private readonly commentModel: Model<Comment>,
        @InjectModel('LikeDislike') private readonly likeDislikeModel: Model<LikeDislike>,
        
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

    async findComments(commentDto: CommentDto): Promise<Comment> {

        return await this.commentModel.findOne({ bookedTeam: commentDto.bookedTeam, bookedShow: commentDto.bookedShow });
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

    async findLikeDislikes(likeDislikeDto: LikeDislikeDto): Promise<LikeDislike> {

        return await this.likeDislikeModel.findOne({ bookedTeam: likeDislikeDto.bookedTeam, bookedShow: likeDislikeDto.bookedShow, publicUserId: likeDislikeDto.publicUserId  });
    }

    async saveLikeDislikes(likeDislikeDto: LikeDislikeDto) {

        const likeDislikes = new this.likeDislikeModel(likeDislikeDto);
        return await likeDislikes.save(); 
    }

    async findAllRatings(): Promise<ShowRating[]> {

        return await this.showRatingModel.find();
    }

    async findAllLikeDislikes(): Promise<LikeDislike[]> {

        return await this.likeDislikeModel.find();
    }

    async findAllShareCount(): Promise<ShareCount[]> {

        return await this.shareCountModel.find();
    }
}
