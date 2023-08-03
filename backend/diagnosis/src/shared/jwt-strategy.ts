import {ExtractJwt, Strategy} from 'passport-jwt';
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import axios from "axios";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWTSECRET
        });
    }

    async validate(payload) {
        const {email, role} = payload;

        const user = (await axios.get(`${process.env.Gateway_URL}/auth/user/${email}`)).data
        if (!user) {
            throw new HttpException("You don't have access", HttpStatus.BAD_REQUEST);
        }
        return user;
    }
}
