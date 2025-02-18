import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { SavePostDTO, PatchPostDTO } from './dto/post.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('post')
@UseGuards(AuthGuard())
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/')
  async savePost(@Body() savePostDTO: SavePostDTO, @Req() req) {
    const uuid = req.user;
    return new SuccessResponseDTO(await this.postService.savePost(uuid, savePostDTO));
  }

  @Patch('/')
  async patchPost(@Body() patchPostDTO: PatchPostDTO, @Req() req) {
    const uuid = req.user;
    return new SuccessResponseDTO(await this.postService.updatePost(uuid, patchPostDTO));
  }
}
