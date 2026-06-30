import { Module } from '@nestjs/common';
import { FormatterModule } from '../formatter/formatter.module';
import { AssistantController } from './assistant.controller';
import { AssistantService } from './assistant.service';
import { IntentService } from './intent.service';
import { WorkflowModule } from '../workflow/workflow.module';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    SearchModule,
    WorkflowModule,
      FormatterModule,
  ],
  controllers: [
    AssistantController,
  ],
  providers: [
    AssistantService,
    IntentService,
  ],
  exports: [
    AssistantService,
  ],
})
export class AssistantModule {}