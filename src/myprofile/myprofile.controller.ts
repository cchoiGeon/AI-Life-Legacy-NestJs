import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MyprofileService } from './myprofile.service';

@Controller('myprofile')
@UseGuards(AuthGuard())
export class MyprofileController {
    constructor(
        private myprofileService: MyprofileService,
    ){}
    @Get("/:caseId")
    async getMainQuestion(
        @Param('caseId') caseId: string
    ){
        return await this.myprofileService.getMainQuestion(caseId);
    }
}
