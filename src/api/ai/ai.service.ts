import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { CustomInternalServerException } from '../../common/exception/exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly apiKey: string;
  private readonly organization: string;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
    this.organization = this.configService.get<string>('OPENAI_ORGANIZATION');

    this.openai = new OpenAI({
      apiKey: this.apiKey,
      organization: this.organization,
    });
  }

  async getChatGPTData(prompt: string, token: number): Promise<string> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini', // OpenAI의 적절한 모델 사용
        messages: [{ role: 'user', content: prompt }],
        max_tokens: token,
      });

      return response.choices[0]?.message.content ?? 'No response from GPT';
    } catch (error) {
      console.error('Error calling GPT-4:', error);
      throw new CustomInternalServerException();
    }
  }
}
