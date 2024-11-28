import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
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

        const existUser = await this.userRepository.findOne({ where:{userId} });
        if(existUser){
            throw new ConflictException('Existing username');
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = this.userRepository.create({userId,password: hashPassword});

        return await this.userRepository.save(user);   
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { userId, password } = authCredentialsDto;

        const user = await this.userRepository.findOne({ where:{userId} });
        const checkPassword = await bcrypt.compare(password, user.password); 

        if(user && checkPassword) {
            // 유저 토큰 생성 ( Secret + Payload )
            const payload = { uuid: user.uuid };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }  else {
            throw new UnauthorizedException('login failed')
        }
    }
}
