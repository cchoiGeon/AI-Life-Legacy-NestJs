import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class ChatgptService {
    private openai: OpenAI;

    constructor(private configService: ConfigService) {
        this.openai = new OpenAI({
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
            organization: this.configService.get<string>('OPENAI_ORGANIZATION'),
        });
    }

    async getChatGPTData(prompt: string, token: number): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4o-mini", // OpenAI의 적절한 모델 사용
                messages: [{ role: "user", content: prompt }],
                max_tokens: token,
            });

            return response.choices[0]?.message.content ?? 'No response from GPT';
        } catch (error) {
            console.error('Error calling GPT-4:', error);
        }
    }

}
