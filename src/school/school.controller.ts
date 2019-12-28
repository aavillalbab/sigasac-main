import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    Query,
    Patch,
    UseGuards
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { AuthGuard, MAIN } from 'sigasac-utils';

import { SchoolService } from './school.service';

import { SchoolDto, SchoolStateDto, UserEmailDto } from './dto';

@Controller(`${MAIN.apiBasePath}/${MAIN.subRoutes.schools}`)
@ApiTags(`${MAIN.subRoutes.schools}`)
@ApiBearerAuth()
export class SchoolController {
    constructor(private readonly schoolService: SchoolService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(@Res() res: Response, @Body() school: SchoolDto) {
        try {
            const s = await this.schoolService.create(school);

            res.status(HttpStatus.CREATED).send({
                school: s
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Put(':schoolId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async edit(
        @Res() res: Response,
        @Param('schoolId') schoolId: number,
        @Body() school: SchoolDto
    ) {
        try {
            const s = await this.schoolService.edit(schoolId, school);

            res.status(HttpStatus.NO_CONTENT).send({
                school: s
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Get()
    @ApiOperation({})
    async getAll(@Res() res: Response, @Query() user: UserEmailDto) {
        try {
            const schools = await this.schoolService.getAll(user.email);

            res.status(HttpStatus.OK).send({
                schools
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Get(':schoolId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(@Res() res: Response, @Param('schoolId') schoolId: number) {
        try {
            const schools = await this.schoolService.getById(schoolId);

            res.status(HttpStatus.OK).send({
                schools
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }

    @Patch(':schoolId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'))
    async changeState(
        @Res() res: Response,
        @Param('schoolId') schoolId: number,
        @Body() state: SchoolStateDto
    ) {
        try {
            const s = await this.schoolService.changeState(
                schoolId,
                state.state
            );

            res.status(HttpStatus.NO_CONTENT).send({
                school: s
            });
        } catch (error) {
            if (error.message.statusCode) {
                return res.status(error.message.statusCode).send({
                    message: error.message
                });
            }

            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: error.message,
                stack: error.stack
            });
        }
    }
}
