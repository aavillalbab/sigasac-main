import { Injectable } from '@nestjs/common';

import { DatabaseProvider, BudgetNote, BudgetNotesDetail } from 'sigasac-db';

import { BudgetNoteDto, BudgetNoteDetailDto } from './dto/indext';

@Injectable()
export class BudgetNotesService {
    async create(budgetNoteDto: BudgetNoteDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(BudgetNote)
                .save(budgetNoteDto);
        } catch (error) {
            throw error;
        }
    }

    async createBudgetNoteDetail(budgetNoteDetailDto: BudgetNoteDetailDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(BudgetNotesDetail)
                .save(budgetNoteDetailDto);
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(BudgetNote)
                .find({ where: { schoolId } });
        } catch (error) {
            throw error;
        }
    }

    async getById(schoolId: number, id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(BudgetNote)
                .createQueryBuilder('bn')
                .leftJoinAndSelect('bn.budgetNotesDetail', 'bnd')
                .where('bn.id = :id', { id })
                .andWhere('bn.schoolId = :schoolId', { schoolId })
                .getOne();
        } catch (error) {
            throw error;
        }
    }

    async getAllBudgetNoteDetail(schoolId: number, budgetNoteId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection
                .getRepository(BudgetNotesDetail)
                .createQueryBuilder('bnd')
                .innerJoin('bnd.budgetNote', 'bn')
                .where('bnd.budgetNoteId = :budgetNoteId', { budgetNoteId })
                .andWhere('bn.schoolId = :schoolId', { schoolId })
                .getMany();
        } catch (error) {
            throw error;
        }
    }

    async update(schoolId: number, id: number, budgetNoteDto: BudgetNoteDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(BudgetNote)
                .set(budgetNoteDto)
                .where('id = :id', { id })
                .andWhere('schoolId = :schoolId', { schoolId })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateBudgetNoteDetail(
        schoolId: number,
        budgetNoteId: number,
        id: number,
        budgetNoteDetailDto: BudgetNoteDetailDto
    ) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(BudgetNotesDetail)
                .set(budgetNoteDetailDto)
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
