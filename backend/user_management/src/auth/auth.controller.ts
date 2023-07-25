import {Body, Controller, Get, Param, Post, Put, Redirect, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {SignInCredentialsDto} from './dto/signin-credentials.dto';
import {SignupCredentialsDto} from './dto/signup-credentials.dto';
import {GetUser} from '../shared/get-user.decorator';
import 'dotenv/config';
import {UpdatePasswordDto} from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }
    @Post('/signup')
    signup(@Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto) {
        const role = signupCredentialsDto.role;
        return this.authService.signUp(signupCredentialsDto, role);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto) {
        return this.authService.signIn(signInCredentialsDto);
    }
    @Put('/update-password/:role')
    @UseGuards(AuthGuard())
    async updatePassword(@Body(ValidationPipe) body: UpdatePasswordDto, @Param() params, @GetUser() user) {
        const role = params.role;
        const userId = user._id;
        return this.authService.updatePassword(userId, body.old, body.new, role);
    }

    @Get('/verify/:token')
    @Redirect()
    async verifyEmail(@Param() params) {
        await this.authService.verifyEmail(params.token);
        return {
            url: process.env.FRONT_WEBSITE?.toString()
        };
    }

    @Get('/resend/:email/:role')
    resendEmail(@Param() params) {
        return this.authService.resendToken(params.email, params.role);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    //@Roles(Role.ADMIN, Role.CLIENT)
    async getUser(@GetUser() user) {
        return await this.authService.getUserByEmailAndRole(user.email, user.role)
    }
}
