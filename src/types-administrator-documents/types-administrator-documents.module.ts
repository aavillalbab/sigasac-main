import { Module } from '@nestjs/common';
import { TypesAdministratorDocumentsController } from './types-administrator-documents.controller';
import { TypesAdministratorDocumentsService } from './types-administrator-documents.service';

@Module({
    controllers: [TypesAdministratorDocumentsController],
    providers: [TypesAdministratorDocumentsService]
})
export class TypesAdministratorDocumentsModule {}
