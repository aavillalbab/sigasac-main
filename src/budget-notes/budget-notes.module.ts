import { Module } from '@nestjs/common';
import { BudgetNotesController } from './budget-notes.controller';
import { BudgetNotesService } from './budget-notes.service';

@Module({
    controllers: [BudgetNotesController],
    providers: [BudgetNotesService]
})
export class BudgetNotesModule {}
