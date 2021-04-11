import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateLeadsDto } from './dto/create-leads.dto';
import { Lead } from './interfaces/lead.interface';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {

    constructor(private readonly leadsService: LeadsService) {}

    @Post('/addOne')
    @ApiCreatedResponse({ description: 'Insert a lead' })
    @ApiBody({ type: CreateLeadsDto })
    async createOne(@Body() createLeads: CreateLeadsDto){

        try {
            
            return await this.leadsService.createOne(createLeads);
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }

    @Post()
    @ApiCreatedResponse({ description: 'push an array of leads' })
    @ApiBody({ type: [CreateLeadsDto] })
    async create(@Body() createLeads: CreateLeadsDto){

        try {
            
            return await this.leadsService.create(createLeads);
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }

    @Get()
    async findAll(): Promise<Lead[]>{

        try {
            
            let result = await this.leadsService.findAll();
            if(result.length == 0){ throw new HttpException('No Leads are found', HttpStatus.NOT_FOUND) }
            return result;
            
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }

    @Get(':id')
    async findOne(@Param('id') id:string):Promise<Lead>{

        try {
            
            let result = await this.leadsService.findOne(id);
            if(!result){ throw new HttpException('Lead is not found', HttpStatus.NOT_FOUND) }
            return result;
            
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }
}
