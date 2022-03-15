import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8, { message: 'Mật khẩu có độ dài tối thiểu là 8 ký tự'})
    @MaxLength(32, { message: 'Mật khẩu có độ tài tối đa 32 ký tự'})
    password: string;
    
}