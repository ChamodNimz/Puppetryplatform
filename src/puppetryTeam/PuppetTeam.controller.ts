import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreatePuppetTeamDto } from './dto/create-puppetryTeam.dto';
import { PuppetTeam } from './interfaces/PuppetryTeam.interface';
import { PuppetTeamService } from './PuppetTeam.service';
import * as bcrypt from 'bcrypt'
import { ScheduleShowDto } from './dto/schedule-show.dto';
import { PuppetTeamModule } from './PuppetTeam.module';

//@ApiBearerAuth()
@Controller('PuppetTeam')
export class PuppetTeamController {

    constructor(private readonly puppetTeamService: PuppetTeamService) { }

    @Post('/create')
    //@UseGuards(JwtAuthGuard, RolesGuard)
    //@Roles(Role.Admin)
    @ApiCreatedResponse({ description: 'register a puppet team' })
    @ApiBody({ type: CreatePuppetTeamDto })
    async createOne(@Body() createPuppetTeamDto: CreatePuppetTeamDto) {

        try {

            // hash password
            const hashedPassword = await bcrypt.hash(createPuppetTeamDto.password, 10);
            createPuppetTeamDto.password = hashedPassword;

            //save
            createPuppetTeamDto.role = Role.PuppetryTeam;

            return await this.puppetTeamService.create(createPuppetTeamDto);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Post('/scheduleShow')
    @ApiBearerAuth()
    //@UseGuards(JwtAuthGuard)
    //@Roles(Role.Admin)
    @ApiCreatedResponse({ description: 'shcedule a show' })
    @ApiBody({ type: ScheduleShowDto })
    async createShow(@Body() scheduleShowDto: ScheduleShowDto) {

        try {

            return await this.puppetTeamService.scheduleShow(scheduleShowDto);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('findAllShows/:id')
    async findShowList(@Param('id') id: string): Promise<[any]> {

        try {

            let result = await this.puppetTeamService.findOne(id);
            if (!result) { throw new HttpException('no shows are found', HttpStatus.NOT_FOUND) }
            return result.shows;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Get('getTeam/:teamId')
    async findTeam(@Param('teamId') id: string): Promise<PuppetTeam> {

        try {

            let result = await this.puppetTeamService.findOne(id);
            if (!result) { throw new HttpException('no teams are found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @Get('getShowlist')
    async getShowList(): Promise<PuppetTeam[]> {

        try {
            let result = await this.puppetTeamService.findAll();
            if (!result) { throw new HttpException('no shows are found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}
