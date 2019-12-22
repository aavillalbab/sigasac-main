import { Injectable } from '@nestjs/common';

import { DatabaseProvider, Bank } from 'sigasac-db';
import { BankDto } from './dto';

@Injectable()
export class BankService {
    async create(bankDto: BankDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const bank = await connection.getRepository(Bank).save(bankDto);

            return bank;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const banks = await connection
                .getRepository(Bank)
                .createQueryBuilder()
                .getMany();

            return banks;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, bankDto: BankDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Bank)
                .set(bankDto)
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
