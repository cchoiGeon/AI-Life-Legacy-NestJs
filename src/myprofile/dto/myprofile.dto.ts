import { IsString } from 'class-validator';

export class GetMainQuestionDTO {
    @IsString()
    caseId: string;
}