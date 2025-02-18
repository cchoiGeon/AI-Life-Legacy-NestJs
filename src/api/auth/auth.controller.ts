import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() authCredentialsDto: AuthCredentialsDto) {
    return new SuccessResponseDTO(
      await this.authService.signup(authCredentialsDto),
    );
  }

  @Post('/signin')
  async signIn(@Body() authCredentialsDto: AuthCredentialsDto) {
    return new SuccessResponseDTO(
      await this.authService.signIn(authCredentialsDto),
    );
  }
}
