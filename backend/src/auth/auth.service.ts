import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth.credential.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {}

    async signUp(credentialDto:AuthCredentialDto): Promise<{message: string}> {
        const { username, password } = credentialDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new this.userModel({username, password: hashedPassword});

        try {
            await user.save();
            return {message: 'Đăng ký tài khoản thành công'};
        } catch (e) {
            if (e.code === '11000') {
                throw new ConflictException('Tài khoản đã tổn tại!');
            }
        }
    }

    async signIn(credentialDto: AuthCredentialDto): Promise<{message: string, username: string, accessToken: string}> {
        const { username, password } = credentialDto;
        const user = await this.userModel.findOne({username});
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            const message = 'Đăng nhập thành công!';
            return { message, username, accessToken };
        } else {
            throw new UnauthorizedException('Tên đăng nhập không tồn tại!');
        }
    }
    
}
