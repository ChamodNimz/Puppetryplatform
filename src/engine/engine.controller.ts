import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import { PuppetTeamService } from 'src/puppetryTeam/PuppetTeam.service';
import { PuppetTeamSchema } from 'src/puppetryTeam/schemas/PuppetTeam.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { EngineService } from './engine.service';


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
               if(result){
                   show.seatCount = show.seatCount - 1;
                   return await this.puppetTeamService.update(createBookingDto.bookedTeam,team);
               }
            }

            return await this.engineService.createBooking(createBookingDto);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}

