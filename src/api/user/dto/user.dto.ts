import { IsString } from "class-validator";

export class SetUserCaseDTO {
    @IsString()
    caseName: string;
}