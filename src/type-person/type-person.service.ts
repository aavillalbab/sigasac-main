import { Injectable } from '@nestjs/common';
import { DatabaseProvider, TypePerson } from 'sigasac-db';

@Injectable()
export class TypePersonService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const typePersons = await connection
                .getRepository(TypePerson)
                .createQueryBuilder()
                .getMany();

            return typePersons;
        } catch (error) {
            throw error;
        }
    }
}
