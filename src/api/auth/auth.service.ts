import { 
    ConflictException, 
    Injectable, 
    InternalServerErrorException, 
    UnauthorizedException 
} from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) {}

    async signup(authCredentialsDto: AuthCredentialsDto) {
        const { email, password } = authCredentialsDto;

        const existUser = await this.userRepository.findUserByEmail(email);
        if (existUser) {
            throw new ConflictException('Exist Email');
        }
        
        const hashPassword = await bcrypt.hash(password, 10);
        const user = await this.userRepository.createAndSaveUserByEmailAndPassword(email, hashPassword);

        const payload = { uuid: user.uuid };
        const accessToken = this.jwtService.sign(payload);

        return accessToken;
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { email, password } = authCredentialsDto;

        const user = await this.userRepository.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException(); // 적절한 예외 반환
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { uuid: user.uuid };
        const accessToken = this.jwtService.sign(payload);
        return accessToken;
    }
}
