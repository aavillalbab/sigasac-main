import { Injectable } from '@nestjs/common';
import { ThirdPartyDto } from './dto';
import { DatabaseProvider, ThirdParty } from 'sigasac-db';

@Injectable()
export class ThirdPartyService {
    async create(thirdParty: ThirdPartyDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const third = await connection
                .getRepository(ThirdParty)
                .save(thirdParty);

            return third;
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const thirds = await connection
                .getRepository(ThirdParty)
                .createQueryBuilder('tp')
                .where('tp.schoolId = :schoolId', { schoolId })
                .getMany();

            return thirds;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const third = await connection
                .getRepository(ThirdParty)
                .createQueryBuilder('tp')
                .where('tp.id = :id', { id })
                .getOne();

            return third;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, thirdParty: ThirdPartyDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(ThirdParty)
                .set(thirdParty)
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
                .update(ThirdParty)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
