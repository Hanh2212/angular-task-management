import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { Model } from 'mongoose';

export interface JwtPayload {
    username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel('User') private userModel: Model<User>,) {
            super({
                secretOrKey: 'secretKey',
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false
            });
        }
    
    async validate(payload: JwtPayload) {
        const {username} = payload;
        const user: User = await this.userModel.findOne({username});
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}