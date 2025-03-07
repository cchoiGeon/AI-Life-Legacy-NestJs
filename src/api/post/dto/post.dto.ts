import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SavePostDTO {
  @ApiProperty({
    description: '사용자 최종 답변',
    example: '사용자 최종 답변',
  })
  @IsString()
  response: string;

  @ApiProperty({
    description: '목차 id',
    example: 1,
  })
  @IsNumber()
  contentId: number;

  @ApiProperty({
    description: '질문 id',
    example: 1,
  })
  @IsNumber()
  questionId: number;
}

export class PatchPostDTO {
  @ApiProperty({
    description: '사용자 최종 답변',
    example: '사용자 최종 답변',
  })
  @IsString()
  response: string;

  @ApiProperty({
    description: '목차 id',
    example: 1,
  })
  @IsNumber()
  contentId: number;

  @ApiProperty({
    description: '질문 id',
    example: 1,
  })
  @IsNumber()
  questionId: number;
}
