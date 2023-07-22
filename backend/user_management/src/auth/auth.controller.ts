import {Body, Controller, Get, Param, Post, Put, Redirect, UseGuards, ValidationPipe} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {AuthService} from './auth.service';
import {SignInCredentialsDto} from './dto/signin-credentials.dto';
import {SignupCredentialsDto} from './dto/signup-credentials.dto';
import {GetUser} from '../get-user.decorator';
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
    async getUser(@GetUser() user1) {
        console.log("hi")
        console.log(user1.role);

        const user = await this.authService.getUserByEmailAndRole(user1.email, user1.role);
        console.log("user/me", user);

        return {
            _id: user._id,
            fullName: user.fullName,
            specialitiesModels: user.specialitiesModels,
            specialitiesMarks: user.specialitiesMarks,
            tel: user.tel,
            lat: user.lat,
            lng: user.lng,
            allows: user.allows,
            address: user.adresse,
            gouv: user.ville,
            email: user.email,
            isVerfied: user.isVerified,
            status: user.status,
            propos: user.propos,
            certif: user.certif,
            //!
            role: user.role,
            carteFiscale: user.carteFiscale,
            cin: user.cin,
            diplome: user.diplome,
            signature: user.signature,
            profile: user.img,
            photoAtelier: user.photoAtelier,
            nb_missions: user.nb_missions,
            credit: user.credit,
            recurrentAvailability: user.recurrentAvailability
        };
    }
}
