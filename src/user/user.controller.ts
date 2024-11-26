import { Body, Controller, Get, InternalServerErrorException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
    constructor (private userService: UserService){}
    @Get('/test')
    async test(@Req() req) {
        try{
            const uuid = req.user; 
            return  await this.userService.getUserCase(uuid);
        }catch(err){
            console.error(err)
            throw new InternalServerErrorException();
        }
    }
}
