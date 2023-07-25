import {ExtractJwt, Strategy} from 'passport-jwt';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {AuthService} from "../recovery/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWTSECRET
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
