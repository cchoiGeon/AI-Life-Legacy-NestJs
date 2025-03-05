import { Repository } from 'typeorm';
import { Posts } from '../../db/entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomInternalServerException } from '../../common/exception/exception';

export class PostRepository {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async findUserPostsByContentIdAndQuestionId(uuid: string, contentId: number, questionId: number) {
    try {
      return await this.postRepository.findOne({
        where: {
          user: { uuid },
          content: { id: contentId },
          question: { id: questionId },
        },
      });
    } catch (error) {
      console.log(error);
      throw new CustomInternalServerException();
    }
  }
  async findAllUserPostsByUUID(uuid: string) {
    try {
      return await this.postRepository.find({
        where: {
          user: { uuid },
        },
        relations: ['content', 'question'],
      });
    } catch (error) {
      console.error('Error in getPost:', error);
      throw new CustomInternalServerException();
    }
  }

  async savePost(uuid: string, contentId: number, questionId: number, response: string): Promise<Posts> {
    try {
      return await this.postRepository.save({
        user: { uuid },
        content: { id: contentId },
        question: { id: questionId },
        response: response,
      });
    } catch (error) {
      console.error('Error in savePost:', error);
      throw new CustomInternalServerException();
    }
  }

  async updatePost(uuid: string, contentId: number, questionId: number, response: string) {
    try {
      return await this.postRepository.update(
        {
          user: { uuid },
          content: { id: contentId },
          question: { id: questionId },
        },
        {
          response,
        },
      );
    } catch (error) {
      console.error('Error in updatePost:', error);
      throw new CustomInternalServerException();
    }
  }
}
