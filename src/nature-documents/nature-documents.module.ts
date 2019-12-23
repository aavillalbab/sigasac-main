import { Module } from '@nestjs/common';
import { NatureDocumentsController } from './nature-documents.controller';
import { NatureDocumentsService } from './nature-documents.service';

@Module({
    controllers: [NatureDocumentsController],
    providers: [NatureDocumentsService]
})
export class NatureDocumentsModule {}
