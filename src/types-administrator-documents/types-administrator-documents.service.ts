import { Injectable } from '@nestjs/common';

import { DatabaseProvider, TypeAdministratorDocument } from 'sigasac-db';
import { TypeAdministratorDocumentDto } from './dto';

@Injectable()
export class TypesAdministratorDocumentsService {
    async create(typeAdministratorDocumentDto: TypeAdministratorDocumentDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const typeAdministratorDocument = await connection
                .getRepository(TypeAdministratorDocument)
                .save(typeAdministratorDocumentDto);

            return typeAdministratorDocument;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const typesAdministratorDocuments = await connection
                .getRepository(TypeAdministratorDocument)
                .find();

            return typesAdministratorDocuments;
        } catch (error) {
            throw error;
        }
    }

    async update(
        id: number,
        typeAdministratorDocumentDto: TypeAdministratorDocumentDto
    ) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(TypeAdministratorDocument)
                .set(typeAdministratorDocumentDto)
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async changeState(id: number, state: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(TypeAdministratorDocument)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
