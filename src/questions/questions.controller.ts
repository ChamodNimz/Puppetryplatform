import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './interfaces/question.interface';
import { QuestionsService } from './questions.service';

@ApiBearerAuth()
@Controller('questions')
export class QuestionsController {

    constructor(private readonly complianceQuestionsService: QuestionsService) { }

    @Post('/create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @ApiCreatedResponse({ description: '** Admin route - insert a compliancy question. Use a JSON stringyfier to stringyfy question before insterting' })
    @ApiBody({ type: CreateQuestionDto })
    async createOne(@Body() createCompQuestionDto: CreateQuestionDto) {

        try {

            return await this.complianceQuestionsService.create(createCompQuestionDto);

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Question> {

        try {

            let result = await this.complianceQuestionsService.findOne(id);
            if (!result) { throw new HttpException('no questions are found', HttpStatus.NOT_FOUND) }
            return result;

        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Question[]>{

        try {
            
            let result = await this.complianceQuestionsService.findAll();
            if(result.length == 0){ throw new HttpException('No questions are found', HttpStatus.NOT_FOUND) }
            return result;
            
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }
}
