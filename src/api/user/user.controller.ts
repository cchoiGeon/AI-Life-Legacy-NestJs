import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SetUserCaseDTO } from './dto/user.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/case')
  async getUserCase(@Req() req: any) {
    const uuid = req.user;
    return new SuccessResponseDTO(await this.userService.getUserCase(uuid));
  }

  @Post('/case')
  async setUserCase(@Body() setUserCaseDTO: SetUserCaseDTO, @Req() req: any) {
    const { uuid } = req.user;
    await this.userService.setUserCase(uuid, setUserCaseDTO);
    return new SuccessResponseDTO();
  }

  @Get('/contents')
  async getUserContents(@Req() req) {
    const uuid = req.user;
    return new SuccessResponseDTO(await this.userService.getUserContents(uuid));
  }

  @Get('/contents/:contentsId/question')
  async getUserQuestion(@Param('contentsId') contentsId: number) {
    return new SuccessResponseDTO(
      await this.userService.getQuestionsByContentId(contentsId),
    );
  }

  @Get('/posts')
  async getUserPosts(@Req() req: any) {
    const uuid = req.user;
    return new SuccessResponseDTO(
      await this.userService.getUserPostsByUUID(uuid),
    );
  }
}
