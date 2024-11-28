import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './posts.entitiy';
import { Repository } from 'typeorm';
import { SuccessResponseDTO } from 'src/utils/response/response.dto';

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Posts)
        private postsRepository: Repository<Posts>,
    ) {}

    async savePost( uuid: string, data: string, question: string, mainId: number, subId: number ) {
        await this.postsRepository.save({
            uuid,
            data,
            question,
            mainId,
            subId
        })
    }

    async updatePost( uuid: string, data: string, mainId: number, subId: number ){
        await this.postsRepository.update({
            uuid
        },{
            uuid,
            data,
            mainId,
            subId
        })
    }

    async checkExistPostData( uuid: string ){
        const existPost = await this.postsRepository.find({where:{uuid}});
        return existPost.length > 0 ? true : false;
    }

    async checkExistPostDataByMainId( uuid: string, mainId: number ){
        const existPost = await this.postsRepository.find({where:{uuid,mainId}});
        return existPost.length > 0 ? true : false;
    }

    async getPost( uuid: string, mainId: number, subId: number ){
        const data = await this.postsRepository.findOne({
            where:{
                uuid,
                mainId,
                subId,
            }
        });
        
        return {data: data.data,question: data.question};
    }
}
