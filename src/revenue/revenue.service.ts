import { Injectable } from '@nestjs/common';

import { DatabaseProvider, Revenue } from 'sigasac-db';
import { RevenueDto } from './dto';

@Injectable()
export class RevenueService {
    async create(revenueDto: RevenueDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const revenue = await connection.getRepository(Revenue).save(revenueDto);

            return revenue;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const revenues = await connection
                .getRepository(Revenue)
                .createQueryBuilder()
                .getMany();

            return revenues;
        } catch (error) {
            throw error;
        }
    }
}
