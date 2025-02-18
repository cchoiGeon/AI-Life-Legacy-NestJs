import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';
import * as config from 'config';

const chatgptConfig = config.get('chatgpt');

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: chatgptConfig.OPENAI_API_KEY,
      organization: chatgptConfig.OPENAI_ORGANIZATION,
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
      throw new InternalServerErrorException('ChatGPT API ERROR');
    }
  }
}
