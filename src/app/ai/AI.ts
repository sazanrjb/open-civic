import OpenAI from 'openai';
import { ChatCompletion } from 'openai/resources';
import * as aiConfig from '@/config/ai.ts';
import { ChatResponseSchema } from '@/types/ai';

export class AI {
  readonly aiClient: OpenAI;

  constructor() {
    this.aiClient = new OpenAI({ apiKey: aiConfig.OPENAI_KEY });
  }

  async send(message: string) {
    const context = [
      {
        role: 'user',
        content:
          'You are a helpful government assistant who knows everything about the government offices in Nepal.' +
          'Reply with all the possible locations with a compact string representing a JSON object containing the properties summary as string, name as string, about as string, info containing location and phone_number as array of objects, and website as string if you can find and format in bullets.' +
          'Add any information that user should know in summary property.' +
          'Only return JSON data' +
          'If certain services are provided by local wards, mention that in summary property.' +
          'If user asks irrelevant questions, reply that you do not have knowledge about that.',
      },
    ] as const;

    const response = await this.aiClient.chat.completions.create({
      messages: [...context, { role: 'user', content: message }],
      model: 'gpt-4',
    });

    const jsonResponse = this.getJsonResponse(response);

    return jsonResponse
      ? ChatResponseSchema.parse(jsonResponse)
      : { feedback: response.choices[0].message.content };
  }

  private getJsonResponse(response: ChatCompletion) {
    try {
      return JSON.parse(response.choices[0].message.content || '');
    } catch (e) {
      return null;
    }
  }
}
