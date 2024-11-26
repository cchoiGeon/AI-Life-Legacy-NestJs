import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}
    async getUserCase(uuid:string){
        const user = await this.userRepository.findOne({ where: { uuid }});
        console.log(user)
        return user.userCase;
    }
}