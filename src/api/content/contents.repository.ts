import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contents } from '../../db/entity/contents.entity';
import { InternalServerErrorException } from '@nestjs/common';

export class ContentsRepository {
  constructor(
    @InjectRepository(Contents)
    private contentsRepository: Repository<Contents>,
  ) {}

  async findQuestionsByContentsId(contentId: number) {
    try {
      return this.contentsRepository.findOne({
        where: {
          id: contentId,
        },
        relations: ['questions.question'],
      });
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }
}
