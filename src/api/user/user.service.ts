import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../db/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getUserCase(uuid: string): Promise<string> {
        try {
            const user = await this.userRepository.findOne({ where: { uuid } });

            if (!user) {
                throw new NotFoundException();
            }

            return user.userCase;
        } catch (error) {
            console.error('Error in getUserCase:', error);
            if(error.status == 404){
                throw new NotFoundException("Not Found User");
            }
            throw new InternalServerErrorException('Failed to fetch user case');
        }
    }

    async saveUserCase(uuid: string, caseId: string): Promise<void> {
        try {
            const updateResult = await this.userRepository.update({ uuid }, { userCase: caseId });

            if (updateResult.affected === 0) {
                throw new NotFoundException();
            }
        } catch (error) {
            console.error('Error in saveUserCase:', error);
            if(error.status == 404){
                throw new NotFoundException("User not found for update");
            }
            throw new InternalServerErrorException('Failed to save user case');
        }
    }
}
