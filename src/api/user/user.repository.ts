import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/db/entity/users.entity';
import { Repository } from 'typeorm';

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
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.userRepository.findOne({
        where: { email },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async setUserCaseByUserCaseID(uuid: string, userCaseId: number) {
    try {
      return await this.userRepository.update(
        {
          uuid,
        },
        {
          userCase: {
            id: userCaseId,
          },
        },
      );
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  }

  async saveUser(user: Users) {
    try {
      return await this.userRepository.save(user);
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findUserRefreshByUUID(uuid: string) {
    try {
      return await this.userRepository.findOne({ where: { uuid } });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  }

  // async (){
  //     try{

  //     }catch(err){
  //         console.error(err);
  //         throw new InternalServerErrorException();
  //     }
  // }
}
