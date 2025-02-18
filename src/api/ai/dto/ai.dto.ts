import { IsString } from 'class-validator';

export class MakeCaseDTO {
    @IsString()
    data: string;
}

export class MakeReQuestionDTO {
    @IsString()
    question: string;

    @IsString()
    data: string;
}

export class CombineDTO {
    @IsString()
    question1: string;

    @IsString()
    data1: string;

    @IsString()
    question2: string;

    @IsString()
    data2: string;
}