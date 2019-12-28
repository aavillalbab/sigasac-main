import { Module } from '@nestjs/common';
import { TypesSchoolDocumentsController } from './types-school-documents.controller';
import { TypesSchoolDocumentsService } from './types-school-documents.service';

@Module({
    controllers: [TypesSchoolDocumentsController],
    providers: [TypesSchoolDocumentsService]
})
export class TypesSchoolDocumentsModule {}
