import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import { PuppetTeamService } from 'src/puppetryTeam/PuppetTeam.service';
import { PuppetTeamSchema } from 'src/puppetryTeam/schemas/PuppetTeam.schema';
import { CommentDto } from './dto/comment.dto';
import { CountShareDto } from './dto/count-share.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RateShowDto } from './dto/rate-show.dto';
import { EngineService } from './engine.service';
import { Comment } from './interfaces/comment.interfac';


@Controller('engine')
export class EngineController {

    constructor(
        private readonly engineService: EngineService,
        private readonly puppetTeamService: PuppetTeamService

    ) { }

    @Post('/bookShow')
    //@UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles(Role.Admin)
    @ApiCreatedResponse({ description: 'book a puppet show' })
    @ApiBody({ type: CreateBookingDto })
    async createBooking(@Body() createBookingDto: CreateBookingDto) {

        try {

            // validate seats
            let team = await this.puppetTeamService.findOne(createBookingDto.bookedTeam);
            let show = team.shows.find(a => a._id == createBookingDto.bookedShow);
            if (show.seatCount > 0) {

                // adding ticket prices
                createBookingDto.ticketPrice = show.ticketPrice;

                // save 
                const result = await this.engineService.createBooking(createBookingDto);
                if (result) {
                    show.seatCount = show.seatCount - 1;
                    return await this.puppetTeamService.update(createBookingDto.bookedTeam, team);
                }
            }

            throw new HttpException('All seats are booked for this show', HttpStatus.BAD_REQUEST)

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Post('/rateShow')
    //@UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles(Role.Admin)
    @ApiCreatedResponse({ description: 'rate a puppet show' })
    @ApiBody({ type: RateShowDto })
    async rateShow(@Body() rateShowDto: RateShowDto) {

        try {

            return await this.engineService.rateShow(rateShowDto);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Post('/countShare')
    //@UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles(Role.Admin)
    @ApiCreatedResponse({ description: 'count share of a show' })
    @ApiBody({ type: CountShareDto })
    async countShare(@Body() countShareDto: CountShareDto) {

        try {

            let share = await this.engineService.findShareCount(countShareDto);
            if (share) {
                share.count++;
                return await share.save();
            }
            return await this.engineService.createCount(countShareDto);


        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Post('/comment')
    //@UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles(Role.Admin)
    @ApiCreatedResponse({ description: 'leave a comment' })
    @ApiBody({ type: CommentDto })
    async comment(@Body() commentDto: CommentDto) {

        try {

            let comments = await this.engineService.findComments(commentDto);
            if(comments){
                comments.comments.push(commentDto.comments[0]);
                return await this.engineService.saveComment(commentDto);
            }
            return await this.engineService.saveComment(commentDto);


        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getAllComments')
    async findAll(): Promise<Comment[]> {

        try {

            let result = await this.engineService.findAllComments();
            if (result.length == 0) { throw new HttpException('No comments are found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}

