import { Injectable } from '@nestjs/common';
import { AssistantService } from '../assistant/assistant.service';

@Injectable()
export class ChatService {
  constructor(
    private readonly assistantService: AssistantService,
  ) {}

  async chat(message: string) {
    return this.assistantService.ask(message);
  }
}