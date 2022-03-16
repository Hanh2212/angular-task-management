import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth.credential.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() credentialDto: AuthCredentialDto): Promise<{message: string}> {
        return this.authService.signUp(credentialDto);
    }

    @Post('/login')
    signIn(@Body() credentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
        return this.authService.signIn(credentialDto);
    }

    @Get('/test')
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req);
    }
}
