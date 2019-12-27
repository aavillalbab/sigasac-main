import { Injectable } from '@nestjs/common';
import { DatabaseProvider, SingleAccountPlan } from 'sigasac-db';
import { SingleAccountPlanDto } from './dto';

@Injectable()
export class SingleAccountPlanService {
    async create(singleAccountPlanDto: SingleAccountPlanDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const project = await connection
                .getRepository(SingleAccountPlan)
                .save(singleAccountPlanDto);

            return project;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const projects = await connection
                .getRepository(SingleAccountPlan)
                .find({ order: { id: 'ASC' } });

            return projects;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const project = await connection
                .getRepository(SingleAccountPlan)
                .findOne(id);

            return project;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, singleAccountPlanDto: SingleAccountPlanDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(SingleAccountPlan)
                .set(singleAccountPlanDto)
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
                .update(SingleAccountPlan)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
