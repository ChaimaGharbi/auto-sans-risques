import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import 'dotenv/config';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Get('/recover/:email/:role')
    recoverPassword(@Param() params) {
        return this.authService.recoverPassword(params.email, params.role);
    }

    @Get('/recover/:email')
    recoverPasswordWithoutRole(@Param() params) {
        return this.authService.recoverPasswordWithoutRole(params.email);
    }

    @Get('/reset/:token/:role')
    verifyToken(@Param() params) {
        return this.authService.verifyToken(params.token, params.role);
    }

    @Post('/reset/:token/:role')
    resetPassword(@Param() params, @Body() body) {
        return this.authService.resetPassword(params.token, body.password, params.role);
    }

    @Post('/reset/:token')
    resetPasswordWithoutRole(@Param() params, @Body() body) {
        return this.authService.resetPasswordWithoutRole(params.token, body.password);
    }
}
