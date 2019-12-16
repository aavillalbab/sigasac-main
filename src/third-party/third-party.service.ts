import { Injectable } from '@nestjs/common';
import { ThirdPartyDto } from './dto';
import { DatabaseProvider, ThirdParty } from 'sigasac-db';

@Injectable()
export class ThirdPartyService {
    async create(thirdParty: ThirdPartyDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const third = await connection.getRepository(ThirdParty).save(thirdParty);

            return third;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const thirds = await connection.getRepository(ThirdParty).createQueryBuilder().getMany();

            return thirds;
        } catch (error) {
            throw error;
        }
    }
}
