import { Module } from '@nestjs/common';
import { RevenueTypeController } from './revenue-type.controller';
import { RevenueTypeService } from './revenue-type.service';

@Module({
    controllers: [RevenueTypeController],
    providers: [RevenueTypeService]
})
export class RevenueTypeModule {}
