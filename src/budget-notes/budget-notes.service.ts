import { Injectable, Logger, ConflictException } from '@nestjs/common';

import {
    DatabaseProvider,
    BudgetNote,
    BudgetNotesDetail,
    School
} from 'sigasac-db';

import { BudgetNoteDto, BudgetNoteDetailDto } from './dto';

@Injectable()
export class BudgetNotesService {
    async create(budgetNoteDto: BudgetNoteDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const months = (
                await connection
                    .getRepository(School)
                    .createQueryBuilder('s')
                    .leftJoinAndSelect(
                        's.months',
                        'm',
                        'm.stateId IN (:...states)',
                        { states: [2, 3] }
                    )
                    .where('s.id = :id', { id: budgetNoteDto.schoolId })
                    // .andWhere('m.stateId IN (:...states)', { states: [2, 3] })
                    .getOne()
            ).months;

            if (!months.length)
                throw new ConflictException(
                    'No hay periodos creados o abiertos actualmente para la institución'
                );

            budgetNoteDto.monthId = months[0].id;

            const budgetNote = await connection
                .getRepository(BudgetNote)
                .save(budgetNoteDto);

            await connection
                .getRepository(BudgetNotesDetail)
                .save(
                    this.addBudgetIdToBudgetNotesDetail(
                        budgetNote.id,
                        budgetNoteDto.budgetNotesDetail
                    )
                );

            return budgetNote;
        } catch (error) {
            throw error;
        }
    }

    private addBudgetIdToBudgetNotesDetail(
        budgetNoteId: number,
        budgetNotesDetail: BudgetNoteDetailDto[]
    ) {
        const _budgetNotesDetail: BudgetNoteDetailDto[] = [];

        for (let budgetNoteDetail of budgetNotesDetail) {
            budgetNoteDetail.budgetNoteId = budgetNoteId;

            _budgetNotesDetail.push(budgetNoteDetail);
        }

        return _budgetNotesDetail;
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
                .createQueryBuilder('bn')
                .leftJoinAndSelect('bn.concept', 'concept')
                .leftJoinAndSelect('bn.subconcept', 'subconcept')
                .leftJoinAndSelect('bn.thirdParty', 'thirdParty')
                .leftJoinAndSelect('bn.budgetNotesDetail', 'bnd')
                .leftJoinAndSelect('bnd.singleAccountPlan', 'singleAccountPlan')
                .leftJoinAndSelect('bnd.campus', 'campus')
                .leftJoinAndSelect('bnd.revenue', 'revenue')
                .leftJoinAndSelect('bnd.project', 'project')
                .where('bn.schoolId = :schoolId', { schoolId })
                .getMany();
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
                .leftJoinAndSelect('bn.concept', 'concept')
                .leftJoinAndSelect('bn.subconcept', 'subconcept')
                .leftJoinAndSelect('bn.thirdParty', 'thirdParty')
                .leftJoinAndSelect('bn.budgetNotesDetail', 'bnd')
                .leftJoinAndSelect('bnd.budgetAccount', 'budgetAccount')
                .leftJoinAndSelect('bnd.campus', 'campus')
                .leftJoinAndSelect('bnd.revenue', 'revenue')
                .leftJoinAndSelect('bnd.project', 'project')
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
