import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { createCasePrompt } from '../../common/prompt/makeCase.prompt'
import { createReQuestionPrompt } from 'src/common/prompt/makeReQuestion.prompt';
import { combinePrompt } from 'src/common/prompt/combine.prompt';
import { AuthGuard } from '@nestjs/passport';
import { CombineDTO, MakeCaseDTO, MakeReQuestionDTO } from './dto/ai.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';

@Controller('ai')
@UseGuards(AuthGuard())
export class AiController {
  constructor(private chatGptService: AiService) {}

  @Post('/case')
  async makeCase(@Body() makeCaseDTO: MakeCaseDTO) {
    const CHATGPTTOKEN = 100;
    const prompt = createCasePrompt(makeCaseDTO.data);

    return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt, CHATGPTTOKEN));
  }

  @Post('/question')
  async makeReQuestion(@Body() makeReQuestionDTO: MakeReQuestionDTO) {
    const CHATGPTTOKEN = 1000;
    const { question, data } = makeReQuestionDTO;
    const prompt = createReQuestionPrompt(question, data);

    return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt, CHATGPTTOKEN));
  }

  @Post('/combine')
  async combine(@Body() combineDTO: CombineDTO) {
    const CHATGPTTOKEN = 2000;
    const { question1, question2, data1, data2 } = combineDTO;
    const prompt = combinePrompt(question1, question2, data1, data2);

    return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt, CHATGPTTOKEN));
  }
}