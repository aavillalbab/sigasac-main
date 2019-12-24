import { Injectable } from '@nestjs/common';
import { DatabaseProvider, NatureDocument } from 'sigasac-db';

@Injectable()
export class NatureDocumentsService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const accountTypes = await connection
                .getRepository(NatureDocument)
                .find();

            return accountTypes;
        } catch (error) {
            throw error;
        }
    }
}
