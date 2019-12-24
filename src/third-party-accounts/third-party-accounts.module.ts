import { Module } from '@nestjs/common';
import { ThirdPartyAccountsController } from './third-party-accounts.controller';
import { ThirdPartyAccountsService } from './third-party-accounts.service';

@Module({
    controllers: [ThirdPartyAccountsController],
    providers: [ThirdPartyAccountsService]
})
export class ThirdPartyAccountsModule {}
