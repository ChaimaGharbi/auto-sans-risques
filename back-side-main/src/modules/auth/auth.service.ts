import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/entities/user.roles.enum';
import { UserRepository } from 'src/repositories/user.repository';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { UpdateClientCredentialsDto } from './dto/updateClient-credentials.dto';
import { UpdateExpertCredentialsDto } from './dto/updateExpert-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository, private jwtService: JwtService) {}

  async signUp(signupCrendentialsDto: SignupCredentialsDto, role: Role) {
    return await this.userRepository.signUp(signupCrendentialsDto, role);
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string, role: Role) {
    return await this.userRepository.updatePassword(id, oldPassword, newPassword, role);
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
    ({
      updateExpertCredentialsDto,
      img,
      cin,
      carteFiscale,
      photoAtelier,
      diplome,
      signature
    });
    return await this.userRepository.updateExpertProfile(
      updateExpertCredentialsDto,
      img,
      cin,
      carteFiscale,
      photoAtelier,
      diplome,
      signature
    );
  }

  async updateClientProfile(updateClientCredentialsDto: UpdateClientCredentialsDto, img: any) {
    return await this.userRepository.updateClientProfile(updateClientCredentialsDto, img);
  }

  async verifyEmail(token: string) {
    return await this.userRepository.verifyEmail(token);
  }
  async resendToken(email: string, role: Role) {
    return await this.userRepository.resendToken(email, role);
  }

  async getUserByEmailAndRole(email: string, role: Role) {
    return await this.userRepository.getUserByEmailAndRole(email, role);
  }

  async getUserByEmail(email: string) {
    return await this.userRepository.getUserByEmail(email);
  }

  async getClientById(id: any) {
    return await this.userRepository.getClientById(id);
  }

  async recoverPasswordWithoutRole(email: string) {
    return await this.userRepository.recoverPasswordWithoutRole(email);
  }

  async recoverPassword(email: string, role: Role) {
    return await this.userRepository.recoverPassword(email, role);
  }

  async verifyToken(token: any, role: Role) {
    return await this.userRepository.verifyToken(token, role, false);
  }

  async resetPasswordWithoutRole(token: any, password: any) {
    await this.userRepository.resetPasswordWithoutRole(token, password);
    return {
      done: true
    };
  }

  async resetPassword(token: any, password: any, role: Role) {
    const user = await this.userRepository.resetPassword(token, password, role);
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
  }
  async signIn(signInCredentialsDto: SignInCredentialsDto) {
    const user = await this.userRepository.signIn(signInCredentialsDto);
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
}
