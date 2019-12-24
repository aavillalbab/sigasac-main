import { Injectable } from '@nestjs/common';
import { DatabaseProvider, RevenueType } from 'sigasac-db';

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
