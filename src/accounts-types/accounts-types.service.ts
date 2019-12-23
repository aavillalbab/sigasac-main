import { Injectable } from '@nestjs/common';

import { AccountType, DatabaseProvider } from 'sigasac-db';

@Injectable()
export class AccountsTypesService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const accountTypes = await connection
                .getRepository(AccountType)
                .find();

            return accountTypes;
        } catch (error) {
            throw error;
        }
    }
}
