import { Body, Controller, Get, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { MyprofileService } from 'src/api/myprofile/myprofile.service';
import { SaveUserCaseDTO } from './dto/user.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
    constructor (
        private userService: UserService,
        private myprofileService: MyprofileService,
    ){}
    
    @Post("/case")
    async saveUserCase(
        @Body() saveUserCaseDTO: SaveUserCaseDTO,
        @Req() req
    ){
        const uuid = req.user;
        const { caseId } = saveUserCaseDTO;
        await this.userService.saveUserCase(uuid,caseId);
        return new SuccessResponseDTO;
    }   

    @Get("/case")
    async getUserCase(
        @Req() req
    ){
        const uuid = req.user;
        return new SuccessResponseDTO(await this.userService.getUserCase(uuid));
    }

    @Get("/question")
    async getUserMainQuestion(
        @Req() req
    ){
        const uuid = req.user;
        const userCase = await this.userService.getUserCase(uuid);
        return new SuccessResponseDTO(await this.myprofileService.getMainQuestion(userCase));
    }
}
