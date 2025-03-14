import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { SavePostDTO, PatchPostDTO } from './dto/post.dto';
import { Success204ResponseDTO } from 'src/common/response/response.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { ApiSuccess204Response } from '../../common/deco/api-paginated-response.deco';
import { ApiDefaultResponses } from '../../common/deco/api-default-response.deco';
import { GetUUID } from '../../common/deco/get-user.decorator';

@Controller('post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/')
  @ApiOperation({ summary: '자서전 저장하기 API' })
  @ApiBody({ type: SavePostDTO })
  @ApiSuccess204Response
  @ApiDefaultResponses()
  async savePost(@Body() savePostDTO: SavePostDTO, @GetUUID() uuid: string): Promise<Success204ResponseDTO> {
    await this.postService.savePost(uuid, savePostDTO);
    return new Success204ResponseDTO();
  }

  @Patch('/')
  @ApiOperation({ summary: '자서전 업데이트하기 API' })
  @ApiBody({ type: PatchPostDTO })
  @ApiSuccess204Response
  @ApiDefaultResponses()
  async patchPost(@Body() patchPostDTO: PatchPostDTO, @GetUUID() uuid: string): Promise<Success204ResponseDTO> {
    await this.postService.updatePost(uuid, patchPostDTO);
    return new Success204ResponseDTO();
  }
}
