import { Body, Controller, HttpException, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { LocalAuthGuard } from './local-auth.guard';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @ApiCreatedResponse({ description: 'authenticate a contractor' })
    @ApiBody({ type: UserCredentialsDto })
    async createOne(@Request() req) {

        try {

            return this.authService.login(req.user);
        } catch (error) {
            if (error.message) { throw new HttpException(error.message, HttpStatus.BAD_REQUEST); }
            else {
                throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }
}
