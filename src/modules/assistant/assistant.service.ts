import { Injectable } from '@nestjs/common';

import { FormatterService } from '../formatter/formatter.service';
import { IntentService } from './intent.service';
import { WorkflowService } from '../workflow/workflow.service';

@Injectable()
export class AssistantService {
  constructor(
    private readonly intentService: IntentService,
    private readonly workflowService: WorkflowService,
    private readonly formatterService: FormatterService,
  ) {}

  async ask(query: string) {
    const keyword = query
      .toLowerCase()
      .replace('do you have', '')
      .replace('find', '')
      .replace('search', '')
      .replace('buy', '')
      .replace('purchase', '')
      .replace('?', '')
      .trim();

    const intent = this.intentService.detect(query);

    console.log(
  'INTENT:',
  intent,
  'QUERY:',
  query,
);

    const result = await this.workflowService.execute(
      intent,
      keyword,
    );

    const answer = this.formatterService.format(result);

    return {
      intent,
      answer,
    };
  }
}