import { Module } from '@nestjs/common';
import { PeopleTypeController } from './people-type.controller';
import { PeopleTypeService } from './people-type.service';

@Module({
    controllers: [PeopleTypeController],
    providers: [PeopleTypeService]
})
export class PeopleTypeModule {}
