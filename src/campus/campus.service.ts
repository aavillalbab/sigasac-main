import { Injectable } from '@nestjs/common';
import { DatabaseProvider, Campus } from 'sigasac-db';
import { CampusDto } from './dto';

@Injectable()
export class CampusService {
    async create(campusDto: CampusDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const project = await connection
                .getRepository(Campus)
                .save(campusDto);

            return project;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const connection = await DatabaseProvider.getConnection();

            const campus = await connection.getRepository(Campus).find();

            return campus;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const campus = await connection.getRepository(Campus).findOne(id);

            return campus;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, campusDto: CampusDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Campus)
                .set(campusDto)
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
