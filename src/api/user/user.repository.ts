import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entity/users.entity';
import { Repository } from 'typeorm';
import { CustomInternalServerException } from '../../common/exception/exception';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async findUserByUUID(uuid: string) {
    try {
      return await this.userRepository.findOne({
        where: { uuid },
        relations: ['userCase'],
      });
    } catch (err) {
      console.error(err);
      throw new CustomInternalServerException();
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (err) {
      console.error(err);
      throw new CustomInternalServerException();
    }
  }

  async createAndSaveUserByEmailAndPassword(email: string, password: string) {
    try {
      const user = await this.userRepository.create({
        email,
        password,
      });
      return await this.userRepository.save(user);
    } catch (err) {
      console.error(err);
      throw new CustomInternalServerException();
    }
  }

  async saveUser(user: Users) {
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      console.error(err);
      throw new CustomInternalServerException();
    }
  }

  async updateUserRefreshToken(uuid: string, refreshToken: string) {
    try {
      return await this.userRepository.update(
        {
          uuid,
        },
        {
          refreshToken,
        },
      );
    } catch (err) {
      console.error(err);
      throw new CustomInternalServerException();
    }
  }

  async deleteUser(user: Users) {
    try {
      return await this.userRepository.softRemove(user);
    } catch (err) {
      console.error('Error deleting user:', err);
      throw new CustomInternalServerException();
    }
  }
}
