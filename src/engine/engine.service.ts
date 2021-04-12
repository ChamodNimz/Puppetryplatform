import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './interfaces/booking.interface';

@Injectable()
export class EngineService {

    constructor(
        @InjectModel('Booking') private readonly bookingModel: Model<Booking>
        
        ) { }

    async createBooking(createBookingDto: CreateBookingDto) {

        const newBooking = new this.bookingModel(createBookingDto);
        return await newBooking.save();
    }
}
