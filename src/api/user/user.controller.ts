import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SetUserCaseDTO } from './dto/user.dto';
import {
  BadRequestResponseDTO,
  InternalServerResponseDTO,
  NotFoundResponseDTO,
  Success204ResponseDTO,
  SuccessResponseDTO,
  UnauthorizedResponseDTO,
} from 'src/common/response/response.dto';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import {
  ApiBadRequestResponse, ApiBody,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:uuid/cases')
  @ApiOperation({ summary: '유저 케이스 불러오기 API' })
  @ApiOkResponse({ description: 'Success', type: SuccessResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad request', type: BadRequestResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseDTO })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: InternalServerResponseDTO })
  async getUserCase(@Param('uuid') uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserCase(uuid));
  }

  @Put('/:uuid/cases')
  @ApiOperation({ summary: '유저 케이스 저장하기 API' })
  @ApiBody({ type: SetUserCaseDTO })
  @ApiOkResponse({ description: 'Success', type: SuccessResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad request', type: BadRequestResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseDTO })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: InternalServerResponseDTO })
  async setUserCase(@Body() setUserCaseDTO: SetUserCaseDTO, @Param('uuid') uuid: string) {
    return new SuccessResponseDTO(await this.userService.setUserCase(uuid, setUserCaseDTO));
  }

  @Get('/:uuid/contents')
  @ApiOperation({ summary: '유저 맞춤형 목차 불러오기 API' })
  @ApiOkResponse({ description: 'Success', type: SuccessResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad request', type: BadRequestResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: InternalServerResponseDTO })
  async getUserContents(@Param('uuid') uuid: string) {
    return new SuccessResponseDTO(await this.userService.getUserContents(uuid));
  }

  @Get('/:uuid/contents/:contentsId/questions')
  @ApiOperation({ summary: '유저 맞춤형 목차별 질문들 불러오기 API' })
  @ApiOkResponse({ description: 'Success', type: SuccessResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad request', type: BadRequestResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseDTO })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: InternalServerResponseDTO })
  async getUserQuestions(@Param('uuid') uuid: string, @Param('contentsId') contentsId: number) {
    return new SuccessResponseDTO(await this.userService.getQuestionsByContentId(contentsId));
  }

  @Get('/:uuid/posts')
  @ApiOperation({ summary: '유저 자서전 데이터 모두 불러오기 API' })
  @ApiOkResponse({ description: 'Success', type: SuccessResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad request', type: BadRequestResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseDTO })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: InternalServerResponseDTO })
  async getAllUserPosts(@Param('uuid') uuid: string) {
    return new SuccessResponseDTO(await this.userService.getAllUserPostsByUUID(uuid));
  }

  @Delete('/:uuid')
  @ApiOperation({ summary: '회원탈퇴 API' })
  @ApiNoContentResponse({ description: 'Success', type: Success204ResponseDTO })
  @ApiBadRequestResponse({ description: 'Bad request', type: BadRequestResponseDTO })
  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: UnauthorizedResponseDTO })
  @ApiNotFoundResponse({ description: 'Not Found', type: NotFoundResponseDTO })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error', type: InternalServerResponseDTO })
  async deleteUser(@Query('deleteType', ParseIntPipe) deleteType: number, @Param('uuid') uuid: string) {
    await this.userService.deleteUser(uuid, deleteType);
    return new Success204ResponseDTO();
  }
}
