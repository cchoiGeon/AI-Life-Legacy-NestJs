import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { createReQuestionPrompt } from 'src/common/prompt/makeReQuestion.prompt';
import { combinePrompt } from 'src/common/prompt/combine.prompt';
import { AIResponseDTO, CombineDTO, MakeCaseDTO, MakeReQuestionDTO } from './dto/ai.dto';
import { SuccessResponseDTO } from 'src/common/response/response.dto';
import { createCasePrompt } from '../../common/prompt/makeCase.prompt';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { ApiSuccessResponse } from '../../common/deco/api-paginated-response.deco';
import { ApiDefaultResponses } from '../../common/deco/api-default-response.deco';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private chatGptService: AiService) {}

  @Post('/case')
  @ApiOperation({ summary: '유저 케이스 분류 AI API' })
  @ApiSuccessResponse(AIResponseDTO)
  @ApiDefaultResponses()
  async makeCase(@Body() makeCaseDTO: MakeCaseDTO): Promise<SuccessResponseDTO<AIResponseDTO>> {
    const CHATGPTTOKEN = 100;
    const prompt = createCasePrompt(makeCaseDTO.data);
    return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt, CHATGPTTOKEN));
  }

  @Post('/question')
  @ApiOperation({ summary: '2차 질문 생성 AI API' })
  @ApiSuccessResponse(AIResponseDTO)
  @ApiDefaultResponses()
  async makeReQuestion(@Body() makeReQuestionDTO: MakeReQuestionDTO): Promise<SuccessResponseDTO<AIResponseDTO>> {
    const CHATGPTTOKEN = 1000;
    const { question, data } = makeReQuestionDTO;
    const prompt = createReQuestionPrompt(question, data);

    return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt, CHATGPTTOKEN));
  }

  @Post('/combine')
  @ApiOperation({ summary: '자서전 답변 합치기 AI API' })
  @ApiSuccessResponse(AIResponseDTO)
  @ApiDefaultResponses()
  async combine(@Body() combineDTO: CombineDTO): Promise<SuccessResponseDTO<AIResponseDTO>> {
    const CHATGPTTOKEN = 2000;
    const { question1, question2, data1, data2 } = combineDTO;
    const prompt = combinePrompt(question1, question2, data1, data2);

    return new SuccessResponseDTO(await this.chatGptService.getChatGPTData(prompt, CHATGPTTOKEN));
  }
}