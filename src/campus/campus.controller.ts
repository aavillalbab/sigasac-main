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

import { AuthGuard, User } from 'sigasac-utils';
import { CampusService } from './campus.service';
import { CampusDto } from './dto';
import { ChangeStateDto } from 'src/bank/dto';

@Controller('sigasac/v1/campus')
@ApiTags('campus')
@ApiBearerAuth()
export class CampusController {
    constructor(private readonly campusService: CampusService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @User('schoolId') schoolId: number,
        @Body() campusDto: CampusDto
    ) {
        try {
            campusDto.schoolId = schoolId;

            const campus = await this.campusService.create(campusDto);

            res.status(HttpStatus.CREATED).send({
                campus
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
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Res() res: Response, @User('schoolId') schoolId: number) {
        try {
            const campus = await this.campusService.getAll(schoolId);

            res.status(HttpStatus.OK).send({
                campus
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

    @Put(':campusId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('campusId') campusId: number,
        @Body() campusDto: CampusDto
    ) {
        try {
            await this.campusService.update(campusId, campusDto);

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Actualización exitosa!'
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

    @Get(':campusId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(@Res() res: Response, @Param('campusId') campusId: number) {
        try {
            const campus = await this.campusService.getById(campusId);

            res.status(HttpStatus.OK).send({
                campus
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

    @Patch(':campusId')
    @ApiOperation({})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'))
    async changeState(
        @Res() res: Response,
        @Param('campusId') campusId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.campusService.changeState(
                campusId,
                changeStateDto.state
            );

            res.status(HttpStatus.OK).send({
                message: 'Cambio de estado exitoso'
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
