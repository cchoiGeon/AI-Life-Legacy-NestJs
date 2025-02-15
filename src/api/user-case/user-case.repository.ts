import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCase } from 'src/db/entity/user-case.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserCaseRepository {
  constructor(
    @InjectRepository(UserCase)
    private userCaseRepository: Repository<UserCase>,
  ) {}

  async findCaseByCaseName(caseName: string) {
    try {
      return await this.userCaseRepository.findOne({
        where: { name: caseName },
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async findContentsByCaseName(caseName: string) {
    try {
      return await this.userCaseRepository.findOne({
        where: { name: caseName },
        relations: ['contentMappings.content'],
      });
    } catch (err) {
      console.error(err);
    }
  }
}
