import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Model } from 'mongoose';
import { User, UserDocument } from "./user.schema";

export interface JwtPayload {
    username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,) {
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