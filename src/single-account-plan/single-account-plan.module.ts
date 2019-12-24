import { Module } from '@nestjs/common';
import { SingleAccountPlanController } from './single-account-plan.controller';
import { SingleAccountPlanService } from './single-account-plan.service';

@Module({
    controllers: [SingleAccountPlanController],
    providers: [SingleAccountPlanService]
})
export class SingleAccountPlanModule {}
