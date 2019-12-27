import { Module } from '@nestjs/common';
import { BudgetAccountsController } from './budget-accounts.controller';
import { BudgetAccountsService } from './budget-accounts.service';

@Module({
  controllers: [BudgetAccountsController],
  providers: [BudgetAccountsService]
})
export class BudgetAccountsModule {}
