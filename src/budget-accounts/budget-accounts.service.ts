import { Injectable } from '@nestjs/common';

import { DatabaseProvider, BudgetAccount } from 'sigasac-db';

import { BudgetAccountDto } from './dto';

@Injectable()
export class BudgetAccountsService {
    async create(budgetAccountDto: BudgetAccountDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const budgetAccount = await connection
                .getRepository(BudgetAccount)
                .save(budgetAccountDto);

            return budgetAccount;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const budgetAccounts = await connection
                .getRepository(BudgetAccount)
                .find({ order: { id: 'ASC' } });

            return budgetAccounts;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const budgetAccount = await connection
                .getRepository(BudgetAccount)
                .findOne(id);

            return budgetAccount;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, budgetAccountDto: BudgetAccountDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(BudgetAccount)
                .set(budgetAccountDto)
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
                .update(BudgetAccount)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
