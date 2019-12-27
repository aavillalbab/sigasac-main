import { Module } from '@nestjs/common';
import { SchoolBankAccountsController } from './school-bank-accounts.controller';
import { SchoolBankAccountsService } from './school-bank-accounts.service';

@Module({
  controllers: [SchoolBankAccountsController],
  providers: [SchoolBankAccountsService]
})
export class SchoolBankAccountsModule {}
