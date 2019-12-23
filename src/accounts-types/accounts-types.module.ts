import { Module } from '@nestjs/common';
import { AccountsTypesController } from './accounts-types.controller';
import { AccountsTypesService } from './accounts-types.service';

@Module({
    controllers: [AccountsTypesController],
    providers: [AccountsTypesService]
})
export class AccountsTypesModule {}
