import {ExtractJwt, Strategy} from 'passport-jwt';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import {AuthService} from "./auth.service";

export class JwtHandlerCzIHateDI {
  private secret = 'KLDMMMD12333';
  async validate(token) {
    try {
      const payload = await jwt.verify(token, this.secret);
      return payload;
    } catch (e) {
      return null;
    }
  }
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'KLDMMMD12333'
        });
    }

    async validate(payload) {
        const {email, role} = payload;

        const user = await this.userService.getUserByEmail(email);
        if (!user) {
      throw new HttpException("You don't have access", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
