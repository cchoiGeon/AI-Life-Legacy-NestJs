import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../../db/entity/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
    ) {}

    async savePost(uuid: string, data: string, question: string, mainId: number, subId: number): Promise<void> {
        try {
            // await this.postsRepository.save({ uuid, data, question, mainId, subId });
        } catch (error) {
            console.error('Error in savePost:', error);
            throw new InternalServerErrorException('Failed to save post');
        }
    }

    async updatePost(uuid: string, data: string, mainId: number, subId: number): Promise<void> {
        try {
            // const updateResult = await this.postsRepository.update(
            //     { user: {uuid} }, // 조건
            //     { user: {uuid}, data, mainId, subId }, // 업데이트할 내용
            // );

            // if (updateResult.affected === 0) {
            //     throw new NotFoundException();
            // }
        } catch (error) {
            console.error('Error in updatePost:', error);
            if(error.status == 404){
                throw new NotFoundException('Post not found for update');
            }
            throw new InternalServerErrorException('Failed to update post');
        }
    }

    async checkExistPostData(uuid: string): Promise<boolean> {
        try {
            const existPost = await this.postsRepository.find({ where: { user: {uuid} } });
            return existPost.length > 0;
        } catch (error) {
            console.error('Error in checkExistPostData:', error);
            throw new InternalServerErrorException('Failed to check post existence');
        }
    }

    async checkExistPostDataByMainId(uuid: string, mainId: number) {
        try {
            // const existPost = await this.postsRepository.find({ where: { user: {uuid}, mainId } });
            // return existPost.length > 0;
        } catch (error) {
            console.error('Error in checkExistPostDataByMainId:', error);
            throw new InternalServerErrorException('Failed to check post existence by mainId');
        }
    }

    async getPost(uuid: string, mainId: number, subId: number) {
        try {
            // const post = await this.postsRepository.findOne({
            //     where: { user: {uuid}, mainId, subId },
            // });

            // if (!post) {
            //     throw new NotFoundException();
            // }

            // return { data: post.data, question: post.question };
        } catch (error) {
            console.error('Error in getPost:', error);
            if(error.status == 404){
                throw new NotFoundException('Post not found');
            }
            throw new InternalServerErrorException('Failed to get post');
        }
    }
}
