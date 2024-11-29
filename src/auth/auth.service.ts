import { 
    ConflictException, 
    Injectable, 
    InternalServerErrorException, 
    UnauthorizedException 
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { userId, password } = authCredentialsDto;

        try {
            const existUser = await this.userRepository.findOne({ where: { userId } });
            if (existUser) {
                throw new ConflictException('Existing userId');
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const user = this.userRepository.create({ userId, password: hashPassword });

            return await this.userRepository.save(user);
        } catch (error) {
            console.error('Error during signup:', error); // 에러 로그 출력
            throw new InternalServerErrorException('Signup failed'); // 내부 서버 에러로 변환
        }
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const { userId, password } = authCredentialsDto;

        try {
            const user = await this.userRepository.findOne({ where: { userId } });

            if (!user) {
                throw new UnauthorizedException('Invalid credentials'); // 적절한 예외 반환
            }

            const checkPassword = await bcrypt.compare(password, user.password);

            if (checkPassword) {
                // 유저 토큰 생성 ( Secret + Payload )
                const payload = { uuid: user.uuid };
                const accessToken = await this.jwtService.sign(payload);
                return { accessToken };
            } else {
                throw new UnauthorizedException('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during signIn:', error); // 에러 로그 출력
            throw new InternalServerErrorException('SignIn failed'); // 내부 서버 에러로 변환
        }
    }
}
