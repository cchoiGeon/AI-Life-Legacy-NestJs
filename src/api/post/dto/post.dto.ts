import { Type } from 'class-transformer';
import { IsString, IsNumber, IsInt } from 'class-validator';

export class SavePostDTO {
  @IsString()
  response: string;

  @IsNumber()
  contentId: number;

  @IsNumber()
  questionId: number;
}

export class PatchPostDTO {
  @IsString()
  response: string;

  @IsNumber()
  contentId: number;

  @IsNumber()
  questionId: number;
}

export class CheckExistPostByMainIdDTO {
  @Type(() => Number) // 문자열을 숫자로 변환
  @IsInt() // 숫자인지 검증 (정수만 허용)
  mainId: number;
}

export class GetPostDTO {
  @Type(() => Number) // 문자열을 숫자로 변환
  @IsInt() // 숫자인지 검증 (정수만 허용)
  mainId: number;

  @Type(() => Number) // 문자열을 숫자로 변환
  @IsInt() // 숫자인지 검증 (정수만 허용)
  subId: number;
}
