import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
    constructor(private postService: PostService){}

    // 자서전 데이터 저장 로직 
    @Post('/')
    async savePost(
        @Body('data') data: string,
        @Body('question') question: string,
        @Body('mainId') mainId: number,
        @Body('subId') subId: number,
        @Req() req
    ){
        const uuid = req.user;
        return await this.postService.savePost(uuid,data,question,mainId,subId)
    }

    // 자서전 데이터 수정 로직 
    @Patch('/')
    async patchPost(
        @Body('data') data: string,
        @Body('mainId') mainId: number,
        @Body('subId') subId: number,
        @Req() req
    ){
        const uuid = req.user;
        return await this.postService.updatePost(uuid,data,mainId,subId)
    }
    
    // 자사전 작성을 한 번이라도 했는지 체크 
    @Get('/check')
    async checkExistPostData(
        @Req() req
    ): Promise<boolean> {
        const uuid = req.user;
        return await this.postService.checkExistPostData(uuid);
    }

    // 특정 mainId에 사용자가 작성을 한 기록이 있는지 체크 
    @Get('/check/:mainId')
    async checkExistPostDataByMainId(
        @Param('mainId') mainId: number,
        @Req() req
    ): Promise<boolean> {
        const uuid = req.user;
        return await this.postService.checkExistPostDataByMainId(uuid,mainId);
    }
    
    // 자서전 작성 데이터 중 mainId와 subId를 파라미터로 받아 해당 정보를 반환 
    @Get('/:mainId/:subId')
    async getPost(
        @Param('mainId') mainId: number,
        @Param('subId') subId: number,
        @Req() req
    ){
        const uuid = req.user;
        return await this.postService.getPost(uuid,mainId,subId);
    }
}
