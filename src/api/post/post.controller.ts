import {
  Body,
  Controller,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { SavePostDTO, PatchPostDTO } from './dto/post.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('post')
@UseGuards(JwtAuthGuard)
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
