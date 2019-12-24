import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from 'sigasac-db';
import { RevenueType } from 'sigasac-db/src/entities/RevenueType';

@Injectable()
export class RevenueTypeService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const revenuesTypes = await connection
                .getRepository(RevenueType)
                .find();

            return revenuesTypes;
        } catch (error) {
            throw error;
        }
    }
}
