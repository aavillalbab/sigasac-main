import { Injectable } from '@nestjs/common';


import { DatabaseProvider, Budget } from 'sigasac-db';

@Injectable()
export class BudgetsService {
    async getAll(){
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Budget).find();
        } catch (error) {
            throw error;
        }
    }
}
