import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { SavePostDTO, PatchPostDTO, CheckExistPostByMainIdDTO, GetPostDTO } from './dto/post.dto';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
    constructor(private postService: PostService) {}

    @Post('/')
    async savePost(
        @Body() savePostDTO: SavePostDTO,
        @Req() req
    ) {
        const { data, question, mainId, subId } = savePostDTO;
        const uuid = req.user;
        return await this.postService.savePost(uuid, data, question, mainId, subId);
    }

    @Patch('/')
    async patchPost(
        @Body() patchPostDTO: PatchPostDTO,
        @Req() req
    ) {
        const { data, mainId, subId } = patchPostDTO;
        const uuid = req.user;
        return await this.postService.updatePost(uuid, data, mainId, subId);
    }

    @Get('/check')
    async checkExistPostData(@Req() req): Promise<boolean> {
        const uuid = req.user;
        return await this.postService.checkExistPostData(uuid);
    }

    @Get('/check/:mainId')
    async checkExistPostDataByMainId(
        @Param() params: CheckExistPostByMainIdDTO,
        @Req() req
    ): Promise<boolean> {
        const { mainId } = params;
        const uuid = req.user;
        return await this.postService.checkExistPostDataByMainId(uuid, mainId);
    }

    @Get('/:mainId/:subId')
    async getPost(
        @Param() params: GetPostDTO,
        @Req() req
    ) {
        const { mainId, subId } = params;
        const uuid = req.user;
        return await this.postService.getPost(uuid, mainId, subId);
    }
}
