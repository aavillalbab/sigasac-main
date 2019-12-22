import { Injectable } from '@nestjs/common';
import { DatabaseProvider, PeopleType } from 'sigasac-db';

@Injectable()
export class PeopleTypeService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const typePersons = await connection
                .getRepository(PeopleType)
                .createQueryBuilder()
                .getMany();

            return typePersons;
        } catch (error) {
            throw error;
        }
    }
}
