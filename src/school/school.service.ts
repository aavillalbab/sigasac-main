import { Injectable, NotFoundException, Logger } from '@nestjs/common';

import { DatabaseProvider, School } from 'sigasac-db';

import { SchoolDto } from './dto';

@Injectable()
export class SchoolService {
    async create(_school: SchoolDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const school = await connection.getRepository(School).save(_school);

            return school;
        } catch (error) {
            throw error;
        }
    }

    async edit(id: number, _school: SchoolDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(School)
                .set(_school)
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAll(email: string) {
        try {
            const connection = await DatabaseProvider.getConnection();

            let schools: School[];

            if (email) {
                schools = await this.getAssociatedSchoolsByEmailUser(email);
            }

            if (!email) {
                schools = await connection
                    .getRepository(School)
                    .createQueryBuilder()
                    .getMany();
            }

            return schools;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const school: School = await connection
                .getRepository(School)
                .createQueryBuilder()
                .where('id = :id', { id })
                .getOne();

            return school;
        } catch (error) {
            throw error;
        }
    }

    async changeState(id: number, state: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(School)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {}
    }

    /**
     * Devuelve una lista de colegios asociados al email del usuario.
     *
     * @param email correo del usuario
     */
    private async getAssociatedSchoolsByEmailUser(email: string) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const schools: School[] = await connection
                .getRepository(School)
                .createQueryBuilder('school')
                .select(['school.id id', 'school.name "name"'])
                .innerJoin('school.users', 'users')
                .where('users.email = :email', { email })
                .getRawMany();

            if (!schools.length) {
                throw new NotFoundException(
                    `El usuario con correo ${email} no está registrado en nuestro sistema.`
                );
            }

            return schools;
        } catch (error) {
            throw error;
        }
    }
}
