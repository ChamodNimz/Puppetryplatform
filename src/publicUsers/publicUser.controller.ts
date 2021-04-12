import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import { CreatePublicUserDto } from './dto/create-publicUser.dto';
import { PublicUser } from './interfaces/publicUser.interface';
import { PublicUserService } from './publicUser.service';


@Controller('publicUser')
export class PublicUserController {

    constructor(private readonly publicUserService: PublicUserService) { }

    @Post('/create')
    @ApiCreatedResponse({ description: 'create a profile for a contractor. 0 - not evaluated | 1 - approved | 2 - not approved' })
    @ApiBody({ type: CreatePublicUserDto })
    async createOne(@Body() createContractorDto: CreatePublicUserDto) {
        
        try {

            // hash password
            const hashedPassword = await bcrypt.hash(createContractorDto.password, 10);
            createContractorDto.password = hashedPassword;

            //save
            createContractorDto.roles = Role.PublicUser;
            return await this.publicUserService.create(createContractorDto);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':email')
    @ApiCreatedResponse({ description: 'use this end point to take profile of a contractor' })
    async findOneByEmail(@Param('email') email: string): Promise<PublicUser> {

        try {

            let result = await this.publicUserService.findOneByEmail(email);
            if (!result) { throw new HttpException('Contractor is not found', HttpStatus.NOT_FOUND) }
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
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PublicUser> {
        try {

            let result = await this.publicUserService.findOne(id);
            if (!result) { throw new HttpException('Contractor is not found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

}

