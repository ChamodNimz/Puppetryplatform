import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ContractorsService } from './contractors.service';
import { CreateContractorDto } from './dto/create-contractor.dto';
import * as bcrypt from 'bcrypt'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Contractor } from './interfaces/contractor.interface';
import { AnswerQuestionsDto } from './dto/answerQuestions-contractor.dto';
import { Role } from 'src/enums/role.enum';


@Controller('contractors')
export class ContractorsController {

    constructor(private readonly contractorsService: ContractorsService) { }

    @Post('/create')
    @ApiCreatedResponse({ description: 'create a profile for a contractor. 0 - not evaluated | 1 - approved | 2 - not approved' })
    @ApiBody({ type: CreateContractorDto })
    async createOne(@Body() createContractorDto: CreateContractorDto) {
        
        try {

            // check email duplication
            const user = await this.contractorsService.checkEmail(createContractorDto.email);
            if (user) {
                throw new HttpException('User already registerd as a contractor. Login using registered credentials', HttpStatus.NOT_ACCEPTABLE)
            }
            // hash password
            const hashedPassword = await bcrypt.hash(createContractorDto.password, 10);
            createContractorDto.password = hashedPassword;

            //save
            createContractorDto.roles = Role.User;
            createContractorDto.status = 0; // 0 - not evaluated | 1 - approved | 2 - not approved
            return await this.contractorsService.create(createContractorDto);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/answer')
    @ApiCreatedResponse({ description: 'answer compliancy questions - contractor' })
    @ApiBody({ type: AnswerQuestionsDto })
    async answer(@Body() answerQuestionsDto: AnswerQuestionsDto) {

        try {

            // calculate status / badge
            // 0 - not evaluated | 1 - approved | 2 - not approved
            // true - approved | false - not approved
            answerQuestionsDto.answers.find(a => a.answer) ? answerQuestionsDto.status = 2 : answerQuestionsDto.status = 1;

            const result = await this.contractorsService.answerQuestions(answerQuestionsDto);
            if (result.status == 2) {

                let response = {nextSteps: './next-steps.pdf', status: 2};
                return response;
            } else {
                return result;
            }

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
    async findOneByEmail(@Param('email') email: string): Promise<Contractor> {

        try {

            let result = await this.contractorsService.findOneByEmail(email);
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
    async findOne(@Param('id') id: string): Promise<Contractor> {
        try {

            let result = await this.contractorsService.findOne(id);
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

