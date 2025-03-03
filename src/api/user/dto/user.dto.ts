import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SetUserCaseDTO {
  @ApiProperty({ example: 'case1', description: '유저 케이스 이름' })
  @IsString()
  caseName: string;
}
