import { Injectable } from '@nestjs/common';

import { DatabaseProvider, ThirdPartyType } from 'sigasac-db';
import { ThirdPartyTypeDto } from './dto';

@Injectable()
export class ThirdPartyTypesService {
    async create(thirdPartyType: ThirdPartyTypeDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const thirdParty = await connection.getRepository(ThirdPartyType).save(thirdPartyType);

            return thirdParty;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const thirdPartyTypes = await connection.getRepository(ThirdPartyType).createQueryBuilder().getMany();

            return thirdPartyTypes;
        } catch (error) {
            throw error;
        }
    }
}
