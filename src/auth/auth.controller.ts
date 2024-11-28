import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.dto';
import { Response } from 'express';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/signup')
    async signup(
        @Body() authCredentialsDto: AuthCredentialsDto
    ): Promise<User> {
        return await this.authService.signup(authCredentialsDto);
    }
    
    @Post('/signin')
    async signIn(
        @Res() res: Response,
        @Body() authCredentialsDto: AuthCredentialsDto
    ) {
        const { accessToken } = await this.authService.signIn(authCredentialsDto);
        res.cookie('accessToken', accessToken, { httpOnly: true });
        return res.send('Cookie has been set');
    }
}
