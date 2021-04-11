import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { InsuranceType, PainType } from './interfaces/types-enums';

@Controller('types')
export class TypesController {

    @Get('/painTypes')
    async findPainTypes(): Promise<String[]>{

        try {
            
            return [PainType.Ankle,PainType.Back,PainType.Cervical,PainType.Elbow,PainType.Knee,PainType.Shoulder,PainType.Wrist];
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }

    @Get('/insuranceTypes')
    async findInsuranceTypes(): Promise<String[]>{

        try {
            
            return [InsuranceType.BlueMedicareCard,InsuranceType.PrivateInsurance,InsuranceType.Red,InsuranceType.White];
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else{
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            } 
        }
    }
}
