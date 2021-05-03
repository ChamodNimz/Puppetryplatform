import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import { PuppetTeamService } from 'src/puppetryTeam/PuppetTeam.service';
import { PuppetTeamSchema } from 'src/puppetryTeam/schemas/PuppetTeam.schema';
import { CommentDto } from './dto/comment.dto';
import { CountShareDto } from './dto/count-share.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { LikeDislikeDto } from './dto/likeDislike.dto';
import { RateShowDto } from './dto/rate-show.dto';
import { EngineService } from './engine.service';
import { Comment } from './interfaces/comment.interfac';
import { TeamMetaData } from './interfaces/helper.interfacs/TeamMetaData.interface';
import { ShareCount } from './interfaces/shareCount.interface';
import { ShowRating } from './interfaces/showRating.interface';


@Controller('engine')
export class EngineController {

    teamMeta: TeamMetaData = null;
    teams: TeamMetaData[] = [];

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


            let ratings = await this.engineService.findRatings(rateShowDto);
            if (ratings) {
                ratings.rating = rateShowDto.rating
                return await ratings.save();
            }
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
            if (comments) {
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

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('/getComments/:teamId')
    async findAllCommmentsOfTeam(@Param('teamId') teamId: string): Promise<Comment[]> {

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


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getTeamRating/:teamId')
    async getTeamRatings(@Param('teamId') teamId: string): Promise<ShowRating[]> {

        try {

            let result = await this.engineService.findTeamRatings(teamId);
            if (result.length == 0) { throw new HttpException('No Ratings are found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getShareCountTeam/:teamId')
    async getShareCountTeam(@Param('teamId') teamId: string): Promise<ShareCount> {

        try {

            let result = await this.engineService.findAllShareCountTeam(teamId);
            if (result == null) { throw new HttpException('No sharing data is found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }


    @Post('/likeDislike')
    //@UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles(Role.Admin)
    @ApiCreatedResponse({ description: 'give a like or dislike for a show' })
    @ApiBody({ type: LikeDislikeDto })
    async likeDislike(@Body() likeDislikeDto: LikeDislikeDto) {

        try {


            let likeDislikes = await this.engineService.findLikeDislikes(likeDislikeDto);
            if (likeDislikes) {
                likeDislikes.liked = likeDislikeDto.liked;
                likeDislikes.disliked = likeDislikeDto.disliked;
                return await likeDislikes.save();
            }
            return await this.engineService.saveLikeDislikes(likeDislikeDto);


        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('/getTeamRanking')
    async getTeamRanking(): Promise<TeamMetaData[]> {

        try {

            let teams = [];

            // get ratings
            let ratings = await this.engineService.findAllRatings();
            // get likes & dislikes
            let likesDislikes = await this.engineService.findAllLikeDislikes();
            // get share count
            let shares = await this.engineService.findAllShareCount();

            // create team list to analyse
            ratings.forEach(el => {
                teams.push({ teamId: el.bookedTeam, likes: 0, disLikes: 0, ratingCount: el.rating, shareCount: 0, weight: 0 });
            });

            teams.forEach(el => {
                el.shareCount = shares.find(e => e.bookedTeam == el.teamId).count;
            });

            teams.forEach(el => {
                el.likes = likesDislikes.filter(e => e.bookedTeam == el.teamId && e.liked).length;
                el.disLikes = likesDislikes.filter(e => e.bookedTeam == el.teamId && e.disliked).length;
            });

            // assign weight
            teams.forEach(el => {
                el.weight = el.likes + el.ratingCount + el.shareCount;
            });

            // console.log(this.teams);

            // rank
            return teams.sort((a, b) => b.weight - a.weight);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('/getTicketSalesReport/:teamId/:fromDate/:toDate')
    async getTicketSalesReport(@Param('teamId') teamId: string, @Param('fromDate') fromDate: string, @Param('toDate') toDate: string): Promise<any> {

        try {

            let months = [];
            // team name, email, Started since
            let team = await this.puppetTeamService.findOne(teamId);

            for (const el of ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']) {

                // Ticket price, No of tickets
                let bookings = await this.engineService.findBookingsFromTo(teamId, '2021-' + el + '-01', '2021-' + el + '-28');
                let total = 0;
                bookings.forEach(e => {
                    total = e.ticketPrice + total;
                });
                months.push({ team: team, total: total, ticketCount: bookings.length, showCount: team.shows.length, el: el });
            }
            return months;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}

