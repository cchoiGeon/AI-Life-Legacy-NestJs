import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../db/entity/posts.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
    ) {}

    async savePost(uuid: string, data: string, question: string, mainId: number, subId: number): Promise<void> {
        try {
            await this.postsRepository.save({ uuid, data, question, mainId, subId });
        } catch (error) {
            console.error('Error in savePost:', error);
            throw new InternalServerErrorException('Failed to save post');
        }
    }

    async updatePost(uuid: string, data: string, mainId: number, subId: number): Promise<void> {
        try {
            const updateResult = await this.postsRepository.update(
                { uuid }, // 조건
                { uuid, data, mainId, subId }, // 업데이트할 내용
            );

            if (updateResult.affected === 0) {
                throw new NotFoundException('Post not found for update');
            }
        } catch (error) {
            console.error('Error in updatePost:', error);
            throw new InternalServerErrorException('Failed to update post');
        }
    }

    async checkExistPostData(uuid: string): Promise<boolean> {
        try {
            const existPost = await this.postsRepository.find({ where: { uuid } });
            return existPost.length > 0;
        } catch (error) {
            console.error('Error in checkExistPostData:', error);
            throw new InternalServerErrorException('Failed to check post existence');
        }
    }

    async checkExistPostDataByMainId(uuid: string, mainId: number): Promise<boolean> {
        try {
            const existPost = await this.postsRepository.find({ where: { uuid, mainId } });
            return existPost.length > 0;
        } catch (error) {
            console.error('Error in checkExistPostDataByMainId:', error);
            throw new InternalServerErrorException('Failed to check post existence by mainId');
        }
    }

    async getPost(uuid: string, mainId: number, subId: number): Promise<{ data: string; question: string }> {
        try {
            const post = await this.postsRepository.findOne({
                where: { uuid, mainId, subId },
            });

            if (!post) {
                throw new NotFoundException('Post not found');
            }

            return { data: post.data, question: post.question };
        } catch (error) {
            console.error('Error in getPost:', error);
            throw new InternalServerErrorException('Failed to get post');
        }
    }
}
