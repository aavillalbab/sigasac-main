import { Injectable } from '@nestjs/common';

import { Bank, DatabaseProvider, Revenue } from 'sigasac-db';
import { RevenueDto } from './dto';

@Injectable()
export class RevenueService {
    async create(revenueDto: RevenueDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const revenue = await connection
                .getRepository(Revenue)
                .save(revenueDto);

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

    async update(id: number, revenueDto: RevenueDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Revenue)
                .set(revenueDto)
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
                .update(Bank)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
