import { Injectable } from '@nestjs/common';
import { DatabaseProvider, Country, Department, Town } from 'sigasac-db';

@Injectable()
export class CountriesService {
    async findAll(): Promise<Country[]> {
        try {
            const connection = await DatabaseProvider.getConnection();

            const countries: Country[] = await connection
                .getRepository(Country)
                .createQueryBuilder('countries')
                .getMany();

            return countries;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param countryCode
     */
    async getDepartmentByCodeCountry(
        countryCode: number
    ): Promise<Department[]> {
        try {
            const connection = await DatabaseProvider.getConnection();

            const departments: Department[] = await connection
                .getRepository(Department)
                .createQueryBuilder('departments')
                .where('departments.countryCode = :countryCode', {
                    countryCode
                })
                .getMany();

            return departments;
        } catch (error) {
            throw error;
        }
    }

    /**
     *
     * @param departmentCode
     */
    async getTownsByCodeDepartment(departmentCode: number): Promise<Town[]> {
        try {
            const connection = await DatabaseProvider.getConnection();

            const towns: Town[] = await connection
                .getRepository(Town)
                .createQueryBuilder('towns')
                .where('towns.departmentCode = :departmentCode', {
                    departmentCode
                })
                .getMany();

            return towns;
        } catch (error) {
            throw error;
        }
    }
}
