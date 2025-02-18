import { Repository } from 'typeorm';
import { Posts } from '../../db/entity/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

export class PostRepository {
  constructor(
    @InjectRepository(Posts)
    private postRepository: Repository<Posts>,
  ) {}

  async findUserPostsByUUID(uuid: string) {
    try {
      return await this.postRepository.find({
        where: {
          user: { uuid },
        },
        relations: ['content', 'question'],
      });
    } catch (error) {
      console.error('Error in getPost:', error);
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
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
      throw new InternalServerErrorException();
    }
  }
}
