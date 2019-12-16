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
}
