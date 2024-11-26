import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
    @Get('/test')
    test(@Req() req) {
        console.log('req.user',req.user);
    } 
}
