import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { User } from 'src/entities/user.entity';
import { SignupCredentialsDto } from 'src/modules/auth/dto/signup-credentials.dto';
import { SignInCredentialsDto } from 'src/modules/auth/dto/signin-credentials.dto';
import { MailerService } from 'src/config/mailer/mailer.service';
import { Token } from 'src/entities/token.entity';
import { Expert } from 'src/entities/expert.entity';
import { Admin } from 'src/entities/admin.entity';
import { Role } from 'src/entities/user.roles.enum';
import { Client } from 'src/entities/client.entity';
import { UpdateExpertCredentialsDto } from 'src/modules/auth/dto/updateExpert-credentials.dto';
import { UpdateClientCredentialsDto } from 'src/modules/auth/dto/updateClient-credentials.dto';
import { ExpertService } from 'src/modules/expert/expert.service';
import { getHtml } from 'src/config/mailer/mailer.helper';
import { Moderator } from 'src/entities/moderator.entity';

export class UserRepository {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<Client>,
    @InjectModel(Expert.name) private expertModel: Model<Expert>,
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Moderator.name) private moderatorModel: Model<Moderator>,
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private mailerService: MailerService,
    private expertService: ExpertService
  ) {}

  async updatePassword(id: string, oldPassword: string, newPassword: string, role: Role) {
    try {
      if (role == Role.EXPERT) {
        const expert = await this.expertModel.findById(id);
        if (!expert) {
          throw new NotFoundException('Expert not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, expert.password);
        if (!isMatch) {
          throw new UnauthorizedException('Old password is incorrect');
        }
        expert.password = await this.hashPassword(newPassword, expert.salt);
        await expert.save();
        return true;
      } else if (role == Role.CLIENT) {
        const client = await this.clientModel.findById(id);

        if (!client) {
          throw new NotFoundException('Client not found');
        }

        const isMatch = await bcrypt.compare(oldPassword, client.password);
        if (!isMatch) {
          throw new UnauthorizedException('Old password is incorrect');
        }

        client.password = await this.hashPassword(newPassword, client.salt);
        await client.save();
        return true;
      }

      return false;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async getUserByEmail(email: string) {
    let user;
    try {
      user = await this.clientModel.findOne({ email: email }).populate('user', '-password -salt').exec();

      if (!user) {
        user = await this.expertModel
          .findOne({ email: email })
          .populate('specialitiesMarks')
          .populate('specialitiesModels')
          .exec();
      }

      if (!user) {
        user = await this.adminModel.findOne({ email: email }).exec();
      }

      if (!user) {
        user = await this.moderatorModel.findOne({ email: email }).exec();
      }

      if (!user) {
        return null;
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
          user = await this.clientModel.findOne({ email }).populate('user', '-password -salt').exec();
          break;
        case Role.EXPERT:
          user = await this.expertModel
            .findOne({ email })
            .populate('specialitiesMarks')
            .populate('specialitiesModels')
            .exec();
          break;
        case Role.ADMIN:
          user = await this.adminModel.findOne({ email }).exec();
          break;
        case Role.MODERATOR:
          user = await this.moderatorModel.findOne({ email }).exec();
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
  async getUserById(id) {
    try {
      let user;
      // check if there's a client
      user = await this.clientModel.findById(id).populate('user', '-password -salt').exec();
      if (user) return user;

      // check if there's a expert
      user = await this.expertModel.findById(id).populate('specialitiesMarks').populate('specialitiesModels').exec();

      if (user) return user;
      return null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getClientById(id: any) {
    try {
      const client = await this.clientModel.findById(id);
      if (!client) {
        return new NotFoundException('no client found');
      } else
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
  async signUp(signupCredentials: SignupCredentialsDto, role: Role) {
    try {
      signupCredentials.email = signupCredentials.email.toLowerCase();

      const userExist = await this.getUserByEmailAndRole(signupCredentials.email, role);

      if (userExist) {
        throw new ConflictException('Un utilisateur avec cette adresse e-mail existe!');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await this.hashPassword(signupCredentials.password, salt);

      const newUser = this.createUser(signupCredentials, role);
      newUser.password = hashedPassword;
      newUser.salt = salt;

      const createdUser = await newUser.save();
      console.log(createdUser);
      
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

  private createUser(signupCredentials: SignupCredentialsDto, role: Role) {
    switch (role) {
      case Role.CLIENT:
        return new this.clientModel(signupCredentials);
      case Role.EXPERT:
        return new this.expertModel(signupCredentials);
      case Role.MODERATOR:
        return new this.moderatorModel(signupCredentials);
      default:
        return new this.adminModel(signupCredentials);
    }
  }
  async updateExpertProfile(
    updateExpertCredentialsDto: UpdateExpertCredentialsDto,
    img: any,
    cin: any,
    carteFiscale: any,
    photoAtelier: any,
    diplome: any,
    signature: any
  ) {
    updateExpertCredentialsDto.email = updateExpertCredentialsDto.email.toLocaleLowerCase();
    const userExist = await this.getUserByEmailAndRole(
      updateExpertCredentialsDto.email,
      updateExpertCredentialsDto.role
    );

    if (userExist) {
      userExist.fullName = updateExpertCredentialsDto.fullName;
      userExist.email = updateExpertCredentialsDto.email;
      userExist.adresse = updateExpertCredentialsDto.adresse;
      userExist.lat = updateExpertCredentialsDto.lat;
      userExist.lng = updateExpertCredentialsDto.lng;
      userExist.specialitiesModels = updateExpertCredentialsDto.specialitiesModels
        ? updateExpertCredentialsDto.specialitiesModels
        : [];
      userExist.specialitiesMarks = updateExpertCredentialsDto.specialitiesMarks
        ? updateExpertCredentialsDto.specialitiesMarks
        : [];
      userExist.tel = updateExpertCredentialsDto.tel;
      userExist.ville = updateExpertCredentialsDto.ville;
      userExist.propos = updateExpertCredentialsDto.propos;
      userExist.certif = updateExpertCredentialsDto.certif;
      userExist.img = img ? img : userExist.img;
      userExist.cin = cin ? cin : userExist.cin;
      userExist.carteFiscale = carteFiscale ? carteFiscale : userExist.carteFiscale;
      userExist.photoAtelier = photoAtelier ? photoAtelier : userExist.photoAtelier;
      userExist.diplome = diplome ? diplome : userExist.diplome;
      userExist.signature = signature ? signature : userExist.signature;
      /*  const position = await this.expertService.getPositionFromAddress(
        updateExpertCredentialsDto.adresse + ' ' + updateExpertCredentialsDto.ville
      );
      userExist.lat = position ? position.lat : userExist.lat;
      userExist.lng = position ? position.lng : userExist.lat; */

      try {
        const userSaved = await userExist.save();
        return userSaved;
      } catch (error) {
        throw new ConflictException(error.message);
      }
    } else {
      throw new ConflictException('No User Exists');
    }
  }

  async updateClientProfile(updateClientCredentialsDto: UpdateClientCredentialsDto, img: any) {
    const userExist = await this.getUserByEmailAndRole(
      updateClientCredentialsDto.email,
      updateClientCredentialsDto.role
    );
    updateClientCredentialsDto.email = updateClientCredentialsDto.email.toLocaleLowerCase();
    if (userExist) {
      userExist.fullName = updateClientCredentialsDto.fullName;
      userExist.email = updateClientCredentialsDto.email;
      userExist.adresse = updateClientCredentialsDto.adresse;
      userExist.tel = updateClientCredentialsDto.tel;
      userExist.ville = updateClientCredentialsDto.ville;
      userExist.img = img ? img : userExist.img;
      const position = await this.expertService.getPositionFromAddress(
        updateClientCredentialsDto.adresse + ' ' + updateClientCredentialsDto.ville
      );
      userExist.lat = position ? position.lat : userExist.lat;
      userExist.lng = position ? position.lng : userExist.lat;
      try {
        userExist.save();
        return userExist;
      } catch (error) {
        throw new ConflictException(error.message);
      }
    } else {
      throw new ConflictException('No User Exists');
    }
  }

  async signIn(signInCredentialsDto: SignInCredentialsDto) {
    try {
      signInCredentialsDto.email = signInCredentialsDto.email.toLocaleLowerCase();
      const { email, password } = signInCredentialsDto;

      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new UnauthorizedException("Nom d'utilisateur ou mot de passe incorrect");
      }
      const isValdiated = await user.validatePassword(password);
      if (user && isValdiated) {
        if (user.status === 2) {
          throw new UnauthorizedException('Votre compte a été banni!');
        } else if (!user.isVerified) {
          throw new UnauthorizedException('Veuillez vérifier votre compte!');
        } else {
          return user;
        }
      } else {
        throw new UnauthorizedException("Nom d'utilisateur ou mot de passe incorrect");
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyEmail(token: string) {
    try {
      const tokenExists = await this.tokenModel.findOne({ token });
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

  async sendVerificationEmail(user: User, role: Role) {
    try {
      const tokenExists = await this.tokenModel.findOne({ userId: user._id });
      let tokenMail;
      try {
        tokenMail = tokenExists.token;
      } catch (error) {}
      const token = new this.tokenModel({
        userId: user._id,
        token: crypto.randomBytes(20).toString('hex')
      });
      if (!tokenExists) {
        await token.save();
        tokenMail = token.token;
      }
      const link = process.env.SERVER_URL + '/auth/verify/' + tokenMail;
      const html = await getHtml(
        `<p>Bonjour ${user.fullName},</p>\n` +
          '                        <p>\n' +
          "                         Merci d'avoir créé un compte!\n" +
          '                        </p>\n' +
          '                        <p>\n' +
          '                          Nous vous envoyons cet e-mail, car vous venez de vous inscrire dans notre site Karhabtek et nous devons vérifier votre adresse e-mail:)\n' +
          '                        </p>\n' +
          '                        <table\n' +
          '                          role="presentation"\n' +
          '                          border="0"\n' +
          '                          cellpadding="0"\n' +
          '                          cellspacing="0"\n' +
          '                          class="btn btn-primary"\n' +
          '                        >\n' +
          '                          <tbody>\n' +
          '                            <tr>\n' +
          '                              <td align="left">\n' +
          '                                <table\n' +
          '                                  role="presentation"\n' +
          '                                  border="0"\n' +
          '                                  cellpadding="0"\n' +
          '                                  cellspacing="0"\n' +
          '                                >\n' +
          '                                  <tbody>\n' +
          '                                    <tr>\n' +
          '                                      <td>\n' +
          '                                        <a\n' +
          `                                          href=${link}\n` +
          '                                          target="_blank"\n' +
          '                                          >Vérifier Email</a\n' +
          '                                        >\n' +
          '                                      </td>\n' +
          '                                    </tr>\n' +
          '                                  </tbody>\n' +
          '                                </table>\n' +
          '                              </td>\n' +
          '                            </tr>\n' +
          '                          </tbody>\n' +
          '                        </table>'
      );
      await this.mailerService.sendMail(user.email, user.fullName, 'Email Verification', html);
      return {
        message: 'A verification email has been sent to ' + user.email
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async recoverPasswordWithoutRole(email: string) {
    try {
      const user = await this.getUserByEmail(email);
      if (!user) {
        throw new BadRequestException(
          'The email address ' +
            email +
            ' is not associated with any account. Double-check your email address and try again.'
        );
      }
      user.generatePasswordReset();
      await user.save();
      const link = process.env.FRONT_WEBSITE + '/reset/' + user.resetPasswordToken;
      const html = await getHtml(
        `<p>Bonjour ${user.fullName},</p>\n` +
          '                        <p>\n' +
          "                         Quelqu'un a demandé un nouveau mot de passe pour votre compte karhabtek.\n" +
          '                        </p>\n' +
          '                        <p>\n' +
          "                          Si vous n'avez pas fait cette demande, vous pouvez ignorer cet e-mail en toute sécurité :)\n" +
          '                        </p>\n' +
          '                        <table\n' +
          '                          role="presentation"\n' +
          '                          border="0"\n' +
          '                          cellpadding="0"\n' +
          '                          cellspacing="0"\n' +
          '                          class="btn btn-primary"\n' +
          '                        >\n' +
          '                          <tbody>\n' +
          '                            <tr>\n' +
          '                              <td align="left">\n' +
          '                                <table\n' +
          '                                  role="presentation"\n' +
          '                                  border="0"\n' +
          '                                  cellpadding="0"\n' +
          '                                  cellspacing="0"\n' +
          '                                >\n' +
          '                                  <tbody>\n' +
          '                                    <tr>\n' +
          '                                      <td>\n' +
          '                                        <a\n' +
          `                                          href=${link}\n` +
          '                                          target="_blank"\n' +
          '                                          >Réinitialiser mot de passe</a\n' +
          '                                        >\n' +
          '                                      </td>\n' +
          '                                    </tr>\n' +
          '                                  </tbody>\n' +
          '                                </table>\n' +
          '                              </td>\n' +
          '                            </tr>\n' +
          '                          </tbody>\n' +
          '                        </table>'
      );

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
      const link = process.env.FRONT_WEBSITE + '/auth/reset/' + user.resetPasswordToken + '/' + role;
      const html = await getHtml(
        `<p>Bonjour ${user.fullName},</p>\n` +
          '                        <p>\n' +
          "                         Quelqu'un a demandé un nouveau mot de passe pour votre compte karhabtek.\n" +
          '                        </p>\n' +
          '                        <p>\n' +
          "                          Si vous n'avez pas fait cette demande, vous pouvez ignorer cet e-mail en toute sécurité :)\n" +
          '                        </p>\n' +
          '                        <table\n' +
          '                          role="presentation"\n' +
          '                          border="0"\n' +
          '                          cellpadding="0"\n' +
          '                          cellspacing="0"\n' +
          '                          class="btn btn-primary"\n' +
          '                        >\n' +
          '                          <tbody>\n' +
          '                            <tr>\n' +
          '                              <td align="left">\n' +
          '                                <table\n' +
          '                                  role="presentation"\n' +
          '                                  border="0"\n' +
          '                                  cellpadding="0"\n' +
          '                                  cellspacing="0"\n' +
          '                                >\n' +
          '                                  <tbody>\n' +
          '                                    <tr>\n' +
          '                                      <td>\n' +
          '                                        <a\n' +
          `                                          href=${link}\n` +
          '                                          target="_blank"\n' +
          '                                          >Réinitialiser mot de passe</a\n' +
          '                                        >\n' +
          '                                      </td>\n' +
          '                                    </tr>\n' +
          '                                  </tbody>\n' +
          '                                </table>\n' +
          '                              </td>\n' +
          '                            </tr>\n' +
          '                          </tbody>\n' +
          '                        </table>'
      );

      await this.mailerService.sendMail(user.email, user.fullName, 'Demande de changement de mot de passe', html);

      return {
        message: 'A Reset email has been sent to ' + user.email
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyToken(token: any, role: Role, verify: boolean) {
    try {
      let user;
      if (role === null) {
        while (1) {
          user = await this.clientModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date(Date.now()) }
          });
          if (user) break;

          user = await this.expertModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date(Date.now()) }
          });

          if (user) break;

          user = await this.moderatorModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date(Date.now()) }
          });
          if (user) break;

          user = await this.adminModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date(Date.now()) }
          });

          if (user) break;

          throw new BadRequestException('Password reset token is invalid or has expired.');
        }

        return user;
      }
      if (role == Role.CLIENT) {
        user = await this.clientModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: new Date(Date.now()) }
        });
      } else if (role == Role.EXPERT) {
        user = await this.expertModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: new Date(Date.now()) }
        });
      } else if (role == Role.MODERATOR) {
        user = await this.moderatorModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: new Date(Date.now()) }
        });
      } else {
        user = await this.adminModel.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: new Date(Date.now()) }
        });
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

  async resetPasswordWithoutRole(token: any, password: any) {
    try {
      const user = await this.verifyToken(token, null, true);
      if (password === null || password === undefined) {
        throw new BadRequestException('No paasword Provided');
      }

      user.password = await this.hashPassword(password, user.salt);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      user.isVerified = true;

      await user.save();
      const html = await getHtml(
        `<p>Bonjour ${user.fullName},</p>\n` +
          '                        <p>\n' +
          '                          Ceci est une confirmation que le mot de passe de votre compte a été changé. :)\n' +
          '                        </p>\n' +
          '                        <table\n' +
          '                          role="presentation"\n' +
          '                          border="0"\n' +
          '                          cellpadding="0"\n' +
          '                          cellspacing="0"\n' +
          '                          class="btn btn-primary"\n' +
          '                        >\n' +
          '                        </table>'
      );
      await this.mailerService.sendMail(user.email, user.fullName, 'Votre mot de passe a été changé ', html);
      return user;
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
      const html = await getHtml(
        `<p>Bonjour ${user.fullName},</p>\n` +
          '                        <p>\n' +
          '                          Ceci est une confirmation que le mot de passe de votre compte a été changé. :)\n' +
          '                        </p>\n' +
          '                        <table\n' +
          '                          role="presentation"\n' +
          '                          border="0"\n' +
          '                          cellpadding="0"\n' +
          '                          cellspacing="0"\n' +
          '                          class="btn btn-primary"\n' +
          '                        >\n' +
          '                        </table>'
      );
      await this.mailerService.sendMail(user.email, user.fullName, 'Votre mot de passe a été changé ', html);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
