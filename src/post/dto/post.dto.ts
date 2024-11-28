import { Type } from 'class-transformer';
import { IsString, IsNumber, IsInt } from 'class-validator';

export class SavePostDTO {
    @IsString()
    data: string;

    @IsString()
    question: string;

    @IsNumber()
    mainId: number;

    @IsNumber()
    subId: number;
}

export class PatchPostDTO {
    @IsString()
    data: string;

    @IsNumber()
    mainId: number;

    @IsNumber()
    subId: number;
}

export class CheckExistPostByMainIdDTO {
    @IsNumber()
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
