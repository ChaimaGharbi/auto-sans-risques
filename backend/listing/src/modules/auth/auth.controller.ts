import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Redirect,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
    ValidationPipe
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {FileFieldsInterceptor, FileInterceptor, FilesInterceptor} from '@nestjs/platform-express';
import {Role} from 'src/entities/user.roles.enum';
import {imageFileFilter, uploadImage} from 'src/shared/upload.files';
import {AuthService} from './auth.service';
import {SignInCredentialsDto} from './dto/signin-credentials.dto';
import {SignupCredentialsDto} from './dto/signup-credentials.dto';
import {UpdateClientCredentialsDto} from './dto/updateClient-credentials.dto';
import {UpdateExpertCredentialsDto} from './dto/updateExpert-credentials.dto';
import {GetUser} from './get-user.decorator';
import 'dotenv/config';
import {UpdatePasswordDto} from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    /*   @Post('/signup/expert')
    signupExpert(@Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto) {
      return this.authService.signUp(signupCredentialsDto, Role.EXPERT);
    } */
    @Get('/client/:id')
    getClientById(@Param() params) {
        return this.authService.getClientById(params.id);
    }

    /*  @Post('/signup/client')
    signupClient(@Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto) {
      return this.authService.signUp(signupCredentialsDto, Role.USER);
    }
    @Post('/signup/admin')
    signupAdmin(@Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto) {
      return this.authService.signUp(signupCredentialsDto, Role.ADMIN);
    }
    @Post('/signup/moderator')
    signupModerator(@Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto) {
      r eturn this.authService.signUp(signupCredentialsDto, Role.MODERATOR);
    }
  */
    @Post('/signup')
    signup(@Body(ValidationPipe) signupCredentialsDto: SignupCredentialsDto) {
        const role = signupCredentialsDto.role;
        return this.authService.signUp(signupCredentialsDto, role);
    }

    @Post('/signin')
    signin(@Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto) {
        return this.authService.signIn(signInCredentialsDto);
    }

    @Put('/updateExpert/:id')
    @UseInterceptors(
        FileFieldsInterceptor([
            {name: 'profile', maxCount: 1},
            {name: 'cin', maxCount: 1},
            {name: 'identFiscale', maxCount: 1},
            {name: 'atelier', maxCount: 1},
            {name: 'diplome', maxCount: 1},
            {name: 'signature', maxCount: 1}
        ])
    )
    async updateExpertProfile(
        @Body(ValidationPipe) updateExpertCredentialsDto: UpdateExpertCredentialsDto,
        @UploadedFiles() files,
        @Param("id") id: string
    ) {
        interface IFiles {
            profile?: any;
            cin?: any;
            identFiscale?: any;
            atelier?: any;
            diplome?: any;
            signature?: any;
        }

        files = files ?? {};
        const filesUrls: IFiles = {};
        Object.keys(files).length;
        for (let i = 0; i < Object.keys(files).length; i++) {
            const file = files[Object.keys(files)[i]][0];
            file;
            // TODO : upload files to firebase fix the bug
            filesUrls[Object.keys(files)[i]] = await uploadImage(file);
        }
        return this.authService.updateProfile(
            id,
            updateExpertCredentialsDto,
            filesUrls,
            Role.EXPERT
        );
    }

    @Put('/updateClient/:id')
    @UseInterceptors(FileInterceptor('file', {fileFilter: imageFileFilter}))
    async updateClientProfile(
        @Body(ValidationPipe) updateClientCredentialsDto: UpdateClientCredentialsDto,
        @UploadedFile() file: Express.Multer.File,
        @Param("id") id: string
    ) {
        let fileUrl;
        if (file) {
            fileUrl = await uploadImage(file);
        }
        return this.authService.updateProfile(
            id,
            updateClientCredentialsDto,
            [...fileUrl],
            Role.CLIENT
        );
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

    @Get('/me')
    @UseGuards(AuthGuard())
    //@Roles(Role.ADMIN, Role.CLIENT)
    async getUser(@GetUser() user1) {
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

    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {fileFilter: imageFileFilter}))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const imageUrl = await uploadImage(file);
        return {data: {link: imageUrl}};
    }

    @Post('uploadfiles')
    @UseInterceptors(FilesInterceptor('files'))
    async uploadFiles(@UploadedFiles() files) {
        const response = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const imageUrl = await uploadImage(file);
            response.push(imageUrl);
        }
        return {
            file: response
        };
    }
}
