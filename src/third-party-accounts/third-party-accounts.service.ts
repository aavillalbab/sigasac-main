import { Injectable, Logger } from '@nestjs/common';

import { DatabaseProvider, ThirdPartyAccounts } from 'sigasac-db';
import { ThirdPartyAccountDto } from './dto';

@Injectable()
export class ThirdPartyAccountsService {
    async create(thirdPartyAccountDto: ThirdPartyAccountDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const thirdPartyAccounts = await connection
                .getRepository(ThirdPartyAccounts)
                .save(thirdPartyAccountDto);

            return thirdPartyAccounts;
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId?: number, thirdPartyId?: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            let thirdPartyAccounts: Array<ThirdPartyAccounts>;

            if (schoolId && thirdPartyId) {
                thirdPartyAccounts = await this.getByThirdPartyId(
                    schoolId,
                    thirdPartyId
                );
            } else {
                thirdPartyAccounts = await connection
                .getRepository(ThirdPartyAccounts)
                .find();
            }

            return thirdPartyAccounts;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const thirdPartyAccount = await connection
                .getRepository(ThirdPartyAccounts)
                .findOne(id);

            return thirdPartyAccount;
        } catch (error) {
            throw error;
        }
    }

    private async getByThirdPartyId(schoolId: number, thirdPartyId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const thirdPartyAccounts = await connection
                .getRepository(ThirdPartyAccounts)
                .createQueryBuilder('tpa')
                .innerJoinAndSelect('tpa.thirdParty', 'tp')
                .innerJoinAndSelect('tpa.bank', 'bank')
                .innerJoinAndSelect('tpa.accountType', 'accountType')
                .where('tp.schoolId = :schoolId', { schoolId })
                .andWhere('tp.id = :thirdPartyId', { thirdPartyId })
                .getMany();

            return thirdPartyAccounts;
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

    async changeState(id: number, state: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(ThirdPartyAccounts)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
