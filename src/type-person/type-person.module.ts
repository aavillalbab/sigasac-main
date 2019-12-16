import { Module } from '@nestjs/common';
import { TypePersonController } from './type-person.controller';
import { TypePersonService } from './type-person.service';

@Module({
  controllers: [TypePersonController],
  providers: [TypePersonService]
})
export class TypePersonModule {}
