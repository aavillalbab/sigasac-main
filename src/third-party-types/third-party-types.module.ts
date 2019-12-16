import { Module } from '@nestjs/common';
import { ThirdPartyTypesController } from './third-party-types.controller';
import { ThirdPartyTypesService } from './third-party-types.service';

@Module({
    controllers: [ThirdPartyTypesController],
    providers: [ThirdPartyTypesService]
})
export class ThirdPartyTypesModule {}
