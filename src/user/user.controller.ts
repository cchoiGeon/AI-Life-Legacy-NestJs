import { Body, Controller, Get, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { MyprofileService } from 'src/myprofile/myprofile.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
    constructor (
        private userService: UserService,
        private myprofileService: MyprofileService,
    ){}
    
    @Post("/case")
    async saveUserCase(
        @Body('caseId') caseId: string,
        @Req() req
    ){
        const uuid = req.user;
        return await this.userService.saveUserCase(uuid,caseId);
    }   

    @Get("/case")
    async getUserCase(
        @Req() req
    ){
        const uuid = req.user;
        return await this.userService.getUserCase(uuid);
    }

    @Get("/question")
    async getUserMainQuestion(
        @Req() req
    ){
        const uuid = req.user;
        const userCase = await this.userService.getUserCase(uuid);
        return await this.myprofileService.getMainQuestion(userCase);
    }
}
