import { IsString } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    userId: string;

    @IsString()
    password: string;
}