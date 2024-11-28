import { IsString } from "class-validator";

export class SaveUserCaseDTO {
    @IsString()
    caseId: string;
}