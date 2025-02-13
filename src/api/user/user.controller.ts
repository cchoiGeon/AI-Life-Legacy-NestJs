import { Body, Controller, Get, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { SetUserCaseDTO } from './dto/user.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
    constructor (
        private userService: UserService,
    ){}

    @Get("/case")
    async getUserCase(
        @Req() req: any
    ){
        const uuid = req.user;
        return new SuccessResponseDTO(await this.userService.getUserCase(uuid));
    }

    @Post("/case")
    async setUserCase(
        @Body() setUserCaseDTO: SetUserCaseDTO,
        @Req() req: any
    ){
        const { uuid } = req.user;
        return new SuccessResponseDTO(await this.userService.setUserCase(uuid,setUserCaseDTO));
    }   

    @Get("/question")
    async getUserMainQuestion(
        @Req() req
    ){
        const uuid = req.user;
        const userCase = await this.userService.getUserCase(uuid);
    }
}
