import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountShareDto } from './dto/count-share.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RateShowDto } from './dto/rate-show.dto';
import { Booking } from './interfaces/booking.interface';
import { ShareCount } from './interfaces/shareCount.interface';
import { ShowRating } from './interfaces/showRating.interface';

@Injectable()
export class EngineService {

    constructor(
        @InjectModel('Booking') private readonly bookingModel: Model<Booking>,
        @InjectModel('ShowRating') private readonly showRatingModel: Model<ShowRating>,
        @InjectModel('ShareCount') private readonly shareCountModel: Model<ShareCount>
        
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

    async createCount(countShareDto: CountShareDto) {

        const newShareCount = new this.shareCountModel(countShareDto);
        newShareCount.count = 1;
        return await newShareCount.save(); 
    }
}
