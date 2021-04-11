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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PuppetTeam> {

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

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<PuppetTeam[]>{

        try {
            
            let result = await this.puppetTeamService.findAll();
            if(result.length == 0){ throw new HttpException('No teams are found', HttpStatus.NOT_FOUND) }
            return result;
            
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }
}
