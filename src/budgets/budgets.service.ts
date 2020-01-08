import { Injectable } from '@nestjs/common';

import { DatabaseProvider, Budget, Concept, Subconcept } from 'sigasac-db';

@Injectable()
export class BudgetsService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Budget).find();
        } catch (error) {
            throw error;
        }
    }

    async getConceptsByBudgetId(budgetId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Concept).find({
                where: {
                    budgetId
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getSubconceptsByConceptId(conceptId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            return await connection.getRepository(Subconcept).find({
                where: {
                    conceptId
                }
            });
        } catch (error) {
            throw error;
        }
    }
}
