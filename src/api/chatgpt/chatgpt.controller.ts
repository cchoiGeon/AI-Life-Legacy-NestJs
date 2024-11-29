import { Body, Controller, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { ChatgptService } from './chatgpt.service';
import { createCasePrompt } from '../../common/prompt/makeCase.prompt'
import { createReQuestionPrompt } from 'src/common/prompt/makeReQuestion.prompt';
import { combinePrompt } from 'src/common/prompt/combine.prompt';
import { AuthGuard } from '@nestjs/passport';
import { CombineDTO, MakeCaseDTO, MakeReQuestionDTO } from './dto/chatgpt.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('chatgpt')
@UseGuards(AuthGuard())
export class ChatgptController {
    constructor(private chatGptService: ChatgptService){}

    @Post("/makeCase")
    async makeCase(
        @Body() makeCaseDTO: MakeCaseDTO
    ) {
        try {    
            const CHATGPTTOKEN=100;
            const prompt = createCasePrompt(makeCaseDTO.data);
    
            return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt,CHATGPTTOKEN));
        } catch (err) {
            console.error(err)
            throw new InternalServerErrorException();
        }
    }

    @Post("/makeReQuestion")
    async makeReQuestion(
        @Body() makeReQuestionDTO:MakeReQuestionDTO
    ){
        try{
            const CHATGPTTOKEN=1000;
            const { question, data } = makeReQuestionDTO;
            const prompt = createReQuestionPrompt(question,data);

            return new SuccessResponseDTO (await this.chatGptService.getChatGPTData(prompt,CHATGPTTOKEN));
        }catch(err){
            console.error(err)
            throw new InternalServerErrorException();
        }
    }

    @Post("/combine")
    async combine(
        @Body() combineDTO:CombineDTO
    ) {
        try{
            const CHATGPTTOKEN=2000;
            const  { question1, question2, data1, data2 } = combineDTO;
            const prompt = combinePrompt(question1,question2,data1,data2);
            
            return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt,CHATGPTTOKEN));
        }catch(err){
            console.error(err)
            throw new InternalServerErrorException();
        }
    }
}
