import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException, UnauthorizedException
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Role} from 'src/entities/user.roles.enum';
import {SignInCredentialsDto} from './dto/signin-credentials.dto';
import {SignupCredentialsDto} from './dto/signup-credentials.dto';
import {UpdateClientCredentialsDto} from './dto/updateClient-credentials.dto';
import {UpdateExpertCredentialsDto} from './dto/updateExpert-credentials.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import {InjectModel} from "@nestjs/mongoose";
import {Client} from "../../entities/client.entity";
import {Model} from "mongoose";
import {Expert} from "../../entities/expert.entity";
import {Admin} from "../../entities/admin.entity";
import {Moderator} from "../../entities/moderator.entity";
import {Token} from "../../entities/token.entity";
import {MailerService} from "../../config/mailer/mailer.service";
import {ExpertService} from "../expert/expert.service";
import {GenericRepository} from "../../shared/generic.repository";
import {User} from "../../entities/user.entity";
import {getHtml} from "../../config/mailer/mailer.helper";
import verifyEmail from "./htmlTemplates/verifyEmail";
import {getPositionFromAddress} from "../../shared/getPositionFromAddress";
import resetPasswordConfirmation from "./htmlTemplates/resetPasswordConfirmation";


@Injectable()
export class AuthService {
  private readonly clientRepository: GenericRepository<Client>;
  private readonly expertRepository: GenericRepository<Expert>;
  private readonly adminRepository: GenericRepository<Admin>;
  private readonly moderatorRepository: GenericRepository<Moderator>;
  private readonly tokenRepository: GenericRepository<Token>;

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async createUser(signupCredentials, role: Role) {
    switch (role) {
      case Role.CLIENT:
        return await this.clientRepository.create(signupCredentials);
      case Role.EXPERT:
        return await this.expertRepository.create(signupCredentials);
      case Role.MODERATOR:
        return await this.moderatorRepository.create(signupCredentials);
      default:
        return await this.adminRepository.create(signupCredentials);
    }
  }

  async sendVerificationEmail(user: User, role: Role) {
    try {
      const tokenExists = await this.tokenModel.findOne({userId: user._id});
      let tokenMail;
      if (!tokenExists) {
        const token = await this.tokenRepository.create({
          userId: user._id,
          token: crypto.randomBytes(20).toString('hex')
        });
        tokenMail = token.token;
      } else {
        tokenMail = tokenExists.token;
      }
      const html = await getHtml(verifyEmail(user.fullName, tokenMail));
      await this.mailerService.sendMail(user.email, user.fullName, 'Email Verification', html);
      return {
        message: 'A verification email has been sent to ' + user.email
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  constructor(
      @InjectModel(Client.name) private clientModel: Model<Client>,
      @InjectModel(Expert.name) private expertModel: Model<Expert>,
      @InjectModel(Admin.name) private adminModel: Model<Admin>,
      @InjectModel(Moderator.name) private moderatorModel: Model<Moderator>,
      @InjectModel(Token.name) private tokenModel: Model<Token>,
      private mailerService: MailerService,
      private expertService: ExpertService,
      private jwtService: JwtService,
  ) {
    this.adminRepository = new GenericRepository(adminModel);
    this.moderatorRepository = new GenericRepository(moderatorModel);
    this.clientRepository = new GenericRepository(clientModel);
    this.expertRepository = new GenericRepository(expertModel);
    this.tokenRepository = new GenericRepository(tokenModel);
  }

  // Authentication
  async signUp(signupCredentials: SignupCredentialsDto, role: Role) {
    try {
      signupCredentials.email = signupCredentials.email.toLowerCase();

      const userExist = await this.getUserByEmailAndRole(signupCredentials.email, role);

      if (userExist) {
        throw new ConflictException('Un utilisateur avec cette adresse e-mail existe!');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await this.hashPassword(signupCredentials.password, salt);

      const createdUser = await this.createUser({...signupCredentials, password: hashedPassword, salt: salt}, role);

      await this.sendVerificationEmail(createdUser, role);

      return createdUser;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException("Erreur d'inscription!");
      }
    }
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto) {
    try {
      const user = await this.getUserByEmail(signInCredentialsDto.email.toLocaleLowerCase());
      const isValdiated = await user.validatePassword(signInCredentialsDto.password);
      if (user && isValdiated) {
        if (user.status === 2) {
          throw new UnauthorizedException('Votre compte a été banni!');
        } else if (!user.isVerified) {
          throw new UnauthorizedException('Veuillez vérifier votre compte!');
        } else {
          const payload = {
            id: user._id,
            fullName: user.fullName,
            specialitiesModels: user.specialitiesModels,
            specialitiesMarks: user.specialitiesMarks,
            tel: user.tel,
            address: user.adresse,
            gouv: user.ville,
            email: user.email,
            role: user.role,
            allows: user.allows
          };

          const accessToken = this.jwtService.sign(payload);
          return {
            ...payload,
            accessToken
          };
        }
      } else {
        throw new UnauthorizedException("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Update
  async updatePassword(id: string, oldPassword: string, newPassword: string, role: Role) {
    try {
      const repository = (role == Role.EXPERT) ?
          this.expertRepository :
          ((role == Role.CLIENT) ?
              this.clientRepository :
              null);
      if (!repository) {
        return false
      }
      const user = await repository.findById(id);

      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Old password is incorrect');
      }
      await repository.update(id, {password: await this.hashPassword(newPassword, user.salt)});
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateProfile(
      updateCredentialsDto: UpdateExpertCredentialsDto | UpdateClientCredentialsDto,
      files: any,
      role: Role
  ) {

    try {
      const repository = (role == Role.EXPERT) ? this.expertRepository : (role == Role.CLIENT) ? this.clientRepository : null;

      const position = await getPositionFromAddress(
          updateCredentialsDto.adresse + ' ' + updateCredentialsDto.ville
      );
      const updateObject = {}
      for (const key in updateCredentialsDto) {
        if (!updateCredentialsDto[key] && key !== 'id') {
          updateObject[key] = updateCredentialsDto[key];
        }
      }
      for (const key in files) {
        if (!files[key]) {
          updateObject[key] = files[key];
        }
      }
      // @ts-ignore
      return await repository.update(updateCredentialsDto.id, {
        ...updateObject,
        email: updateCredentialsDto.email.toLocaleLowerCase(),
        position,
      });

    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  // Getters
  async getUserByEmail(email: string) {
    let user = null;
    try {
      user = await this.clientModel.findOne({email: email}).populate('user', '-password -salt').exec();

      if (!user) {
        user = await this.expertModel
            .findOne({email: email})
            .populate('specialitiesMarks')
            .populate('specialitiesModels')
            .exec();
      }

      if (!user) {
        user = await this.adminModel.findOne({email: email}).exec();
      }

      if (!user) {
        user = await this.moderatorModel.findOne({email: email}).exec();
      }
      if (!user) {
        throw new UnauthorizedException("Nom d'utilisateur ou mot de passe incorrect");
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserById(id) {
    try {
      let user: Client | Expert | Admin | Moderator = null;
      user = await this.clientModel.findById(id).populate('user', '-password -salt').exec();
      if (!user) {
        user = await this.expertModel.findById(id).populate('specialitiesMarks').populate('specialitiesModels').exec();
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUserByEmailAndRole(email: string, role: Role) {
    try {
      let user;

      switch (role) {
        case Role.CLIENT:
          user = await this.clientModel.findOne({email}).populate('user', '-password -salt').exec();
          break;
        case Role.EXPERT:
          user = await this.expertModel.findOne({email}).populate('specialitiesMarks').populate('specialitiesModels').exec();
          break;
        case Role.ADMIN:
          user = await this.adminModel.findOne({email}).exec();
          break;
        case Role.MODERATOR:
          user = await this.moderatorModel.findOne({email}).exec();
          break;
        default:
          user = null;
          break;
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getClientById(id: any) {
    try {
      const client = await this.clientRepository.findById(id);
      return {
        email: client.email,
        fullName: client.fullName,
        tel: client.tel,
        address: client.adresse,
        gouv: client.ville,
        profile: client.img
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Tokenization+Verification

  async verifyEmail(token: string) {
    try {
      const tokenExists = await this.tokenModel.findOne({token});
      if (!tokenExists) {
        throw new BadRequestException('We were unable to find a valid token. Your token my have expired.');
      }
      const user = await this.getUserById(tokenExists.userId);

      if (!user) {
        throw new BadRequestException('We were unable to find a user for this token.');
      }
      if (user.isVerified) {
        throw new BadRequestException('This user has already been verified.');
      }
      user.isVerified = true;
      try {
        await user.save();
        return true;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async resendToken(email: string, role: Role) {
    try {
      const user = await this.getUserByEmailAndRole(email, role);
      if (!user) {
        throw new NotFoundException({
          message:
              'The email address ' +
              email +
              ' is not associated with any account. Double-check your email address and try again.'
        });
      }
      if (user.isVerified) {
        throw new BadRequestException('This account has already been verified.');
      }

      await this.sendVerificationEmail(user, role);
      return {
        message: 'A verification email has been sent to ' + user.email
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyToken(token: any, role: Role, verify = false) {
    const findByToken = async (token, role) => {
      const model = (role == Role.EXPERT) ? this.expertModel : (role == Role.CLIENT) ? this.clientModel : (role == Role.MODERATOR) ? this.moderatorModel : this.adminModel;
      return model.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: {$gt: new Date(Date.now())}
      });
    }
    try {
      let user;
      if (!role) {
        user = await findByToken(token, Role.EXPERT);
        if (!user) {
          user = await findByToken(token, Role.CLIENT);
        }
        if (!user) {
          user = await findByToken(token, Role.ADMIN);
        }
        if (!user) {
          user = await findByToken(token, Role.MODERATOR);
        }
      } else {
        user = await findByToken(token, role);
      }
      if (!user) {
        throw new BadRequestException('Password reset token is invalid or has expired.');
      }
      if (verify) {
        return user;
      } else return 'token valid';
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // Recovery

  async recoverPasswordWithoutRole(email: string) {
    try {
      const user = await this.getUserByEmailAndRole(email, null);
      if (!user) {
        throw new BadRequestException(
            'The email address ' +
            email +
            ' is not associated with any account. Double-check your email address and try again.'
        );
      }
      user.generatePasswordReset();
      await user.save();
      const html = await getHtml(verifyEmail(user.fullName, user.resetPasswordToken));

      await this.mailerService.sendMail(user.email, user.fullName, 'Demande de changement de mot de passe', html);

      return {
        message: 'A Reset email has been sent to ' + user.email
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async recoverPassword(email: string, role: Role) {
    try {
      const user = await this.getUserByEmailAndRole(email, role);
      if (!user) {
        throw new BadRequestException(
            'The email address ' +
            email +
            ' is not associated with any account. Double-check your email address and try again.'
        );
      }
      user.generatePasswordReset();
      await user.save();
      const html = await getHtml(verifyEmail(user.fullName, user.resetPasswordToken));
      await this.mailerService.sendMail(user.email, user.fullName, 'Demande de changement de mot de passe', html);

      return {
        message: 'A Reset email has been sent to ' + user.email
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async resetPasswordWithoutRole(token: any, password: any) {
    try {
      const user = await this.verifyToken(token, null, true);
      if (password === null || password === undefined) {
        throw new BadRequestException('No password Provided');
      }

      user.password = await this.hashPassword(password, user.salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.isVerified = true;

      await user.save();
      const html = await getHtml(resetPasswordConfirmation(user.fullName));
      await this.mailerService.sendMail(user.email, user.fullName, 'Votre mot de passe a été changé ', html);
      return {
        done: true
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async resetPassword(token: any, password: any, role: Role) {
    try {
      const user = await this.verifyToken(token, role, true);
      if (password === null || password === undefined) {
        throw new BadRequestException('No paasword Provided');
      }
      user.password = await this.hashPassword(password, user.salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.isVerified = true;

      await user.save();
      const html = await getHtml(resetPasswordConfirmation(user.fullName));
      await this.mailerService.sendMail(user.email, user.fullName, 'Votre mot de passe a été changé ', html);
      const payload = {
        fullName: user.fullName,
        specialitiesModels: user.specialitiesModels,
        specialitiesMarks: user.specialitiesMarks,
        tel: user.tel,
        address: user.adresse,
        gouv: user.ville,
        email: user.email,
        role: user.role
      };
      const accessToken = this.jwtService.sign(payload);
      return {
        ...payload,
        accessToken
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
