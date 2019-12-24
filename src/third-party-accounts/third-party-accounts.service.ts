import { Injectable } from '@nestjs/common';

import { DatabaseProvider, ThirdPartyAccounts } from 'sigasac-db';
import { ThirdPartyAccountDto } from './dto';

@Injectable()
export class ThirdPartyAccountsService {
    async create(thirdPartyAccountDto: ThirdPartyAccountDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const project = await connection
                .getRepository(ThirdPartyAccounts)
                .save(thirdPartyAccountDto);

            return project;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const projects = await connection
                .getRepository(ThirdPartyAccounts)
                .find();

            return projects;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const project = await connection
                .getRepository(ThirdPartyAccounts)
                .findOne(id);

            return project;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, thirdPartyAccountDto: ThirdPartyAccountDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(ThirdPartyAccounts)
                .set(thirdPartyAccountDto)
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
