import { Body, Controller, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { createCasePrompt } from '../utils/prompt/makeCase.prompt'
import { createReQuestionPrompt } from 'src/utils/prompt/makeReQuestion.prompt';
import { combinePrompt } from 'src/utils/prompt/combine.prompt';
import { AuthGuard } from '@nestjs/passport';

@Controller('chatgpt')
@UseGuards(AuthGuard())
export class ChatgptController {
    constructor(private chatGptService: ChatgptService){}

    @Post("/makeCase")
    async makeCase(
        @Body('data') data: string
    ): Promise<string> {
        try {    
            const CHATGPTTOKEN=100;
            const prompt = createCasePrompt(data);
    
            return await this.chatGptService.getChatGPTData(prompt,CHATGPTTOKEN);
        } catch (err) {
            console.error(err)
            throw new InternalServerErrorException();
        }
    }

    @Post("/makeReQuestion")
    async makeReQuestion(
        @Body('question') question: string,
        @Body('data') data: string,
    ): Promise<string> {
        try{
            const CHATGPTTOKEN=1000;
            const prompt = createReQuestionPrompt(question,data);

            return await this.chatGptService.getChatGPTData(prompt,CHATGPTTOKEN);
        }catch(err){
            console.error(err)
            throw new InternalServerErrorException();
        }
    }

    @Post("/combine")
    async combine(
        @Body('question1') question1: string,
        @Body('data1') data1: string,
        @Body('question2') question2: string,
        @Body('data2') data2: string,
    ): Promise<string> {
        try{
            const CHATGPTTOKEN=2000;
            const prompt = combinePrompt(question1,question2,data1,data2);
            
            return await this.chatGptService.getChatGPTData(prompt,CHATGPTTOKEN)
        }catch(err){
            console.error(err)
            throw new InternalServerErrorException();
        }
    }
}
