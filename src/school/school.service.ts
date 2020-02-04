import {
    Injectable,
    NotFoundException,
    Logger,
    ConflictException
} from '@nestjs/common';

import { DatabaseProvider, School, User } from 'sigasac-db';

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
                    .createQueryBuilder('school')
                    .innerJoinAndSelect('school.town', 'city')
                    .innerJoinAndSelect('city.department', 'department')
                    .innerJoinAndSelect('department.country', 'country')
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
                .createQueryBuilder('school')
                .innerJoinAndSelect('school.town', 'city')
                .innerJoinAndSelect('city.department', 'department')
                .innerJoinAndSelect('department.country', 'country')
                .where('school.id = :id', { id })
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

            const user: User = await connection
                .getRepository(User)
                .createQueryBuilder('user')
                .leftJoinAndSelect('user.schoolProfileUser', 'spu')
                .leftJoinAndSelect('spu.profile', 'profile')
                .leftJoinAndSelect('spu.school', 'school')
                .where('user.email = :email', { email })
                .getOne();

            let schools: School[];

            if (user) {
                schools = user.schoolProfileUser
                    .map(spu => spu.school)
                    .filter(s => s !== null);

                const isSuperAdmin = user.schoolProfileUser
                    .map(spu => spu.profileId)
                    .includes(1);

                const isSuperAdminMinEdu = user.schoolProfileUser
                    .map(spu => spu.profileId)
                    .includes(5);

                if ((isSuperAdmin || isSuperAdminMinEdu) && !schools.length) {
                    schools = [];
                }

                if (!(isSuperAdmin || isSuperAdminMinEdu) && !schools.length) {
                    throw new ConflictException(
                        `El usuario con correo ${email} no es super administardor y no tiene colegios asignados.`
                    );
                }

                if (!(isSuperAdmin || isSuperAdminMinEdu) && schools.length) {
                    schools = schools;
                }
            }

            if (!user) {
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
