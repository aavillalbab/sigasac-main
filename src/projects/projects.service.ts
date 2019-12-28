import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { DatabaseProvider, Project } from 'sigasac-db';
import { ProjectDto } from './dto';

@Injectable()
export class ProjectsService {
    async create(projectDto: ProjectDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const project = await connection
                .getRepository(Project)
                .save(projectDto);

            return project;
        } catch (error) {
            throw error;
        }
    }

    async getAll(schoolId: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const projects = await connection.getRepository(Project).find({ where: { schoolId }});

            return projects;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const project = await connection.getRepository(Project).findOne(id);

            return project;
        } catch (error) {
            throw error;
        }
    }

    async update(id: number, projectDto: ProjectDto) {
        try {
            const connection = await DatabaseProvider.getConnection();

            const result: any = await connection
                .createQueryBuilder()
                .update(Project)
                .set(projectDto)
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
                .update(Project)
                .set({ state })
                .where('id = :id', { id })
                .execute();

            return result;
        } catch (error) {
            throw error;
        }
    }
}
