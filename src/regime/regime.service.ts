import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { DatabaseProvider, Regime } from 'sigasac-db';

@Injectable()
export class RegimeService {
    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const regimes = await connection.getRepository(Regime).find();

            return regimes;
        } catch (error) {
            throw error;
        }
    }
}
