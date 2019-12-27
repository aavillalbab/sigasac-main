import { Injectable } from '@nestjs/common';

import { DatabaseProvider, SchoolBankAccount } from 'sigasac-db';

import { SchoolBankAccountDto } from './dto';

@Injectable()
export class SchoolBankAccountsService {
    async create(schoolBankAccountDto: SchoolBankAccountDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const schoolBankAccount = await connection.getRepository(SchoolBankAccount).save(schoolBankAccountDto);

            return schoolBankAccount;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const schoolBankAccounts = await connection.getRepository(SchoolBankAccount).find();

            return schoolBankAccounts;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const schoolBankAccount = await connection.getRepository(SchoolBankAccount).findOne(id);

            return schoolBankAccount;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, schoolBankAccountDto: SchoolBankAccountDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(SchoolBankAccount)
                .set(schoolBankAccountDto)
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
                .update(SchoolBankAccount)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
