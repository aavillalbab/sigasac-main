import { Injectable } from '@nestjs/common';

import { TypeSchoolDocumentDto } from './dto';
import { DatabaseProvider, TypeSchoolDocument } from 'sigasac-db';

@Injectable()
export class TypesSchoolDocumentsService {
    async create(typeSchoolDocumentDto: TypeSchoolDocumentDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const typeSchoolDocument = await connection
                .getRepository(TypeSchoolDocument)
                .save(typeSchoolDocumentDto);

            return typeSchoolDocument;
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const typesSchoolDocuments = await connection
                .getRepository(TypeSchoolDocument)
                .createQueryBuilder('tsd')
                .innerJoinAndSelect('tsd.typeAdministratorDocument', 'tad')
                .innerJoinAndSelect('tsd.voucher', 'voucher')
                .leftJoinAndSelect('tsd.campus', 'campus')
                .where('voucher.schoolId = :schoolId', { schoolId })
                .getMany();

            return typesSchoolDocuments;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, typeSchoolDocumentDto: TypeSchoolDocumentDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(TypeSchoolDocument)
                .set(typeSchoolDocumentDto)
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
                .update(TypeSchoolDocument)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
