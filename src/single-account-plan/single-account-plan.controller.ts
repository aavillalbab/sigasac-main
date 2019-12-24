import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
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

import { SingleAccountPlanService } from './single-account-plan.service';
import { SingleAccountPlanDto } from './dto';

@Controller('sigasac/v1/single-account-plan')
@ApiBearerAuth()
@ApiTags('single-account-plan')
export class SingleAccountPlanController {
    constructor(
        private readonly singleAccountPlanService: SingleAccountPlanService
    ) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() singleAccountPlanDto: SingleAccountPlanDto
    ) {
        try {
            const singleAccountPlan = await this.singleAccountPlanService.create(
                singleAccountPlanDto
            );

            res.status(HttpStatus.CREATED).send({
                singleAccountPlan
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
    async getAll(@Res() res: Response) {
        try {
            const singleAccountPlan = await this.singleAccountPlanService.getAll();

            res.status(HttpStatus.OK).send({
                singleAccountPlan
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

    @Put(':singleAccountPlanId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('singleAccountPlanId') singleAccountPlanId: number,
        @Body() singleAccountPlanDto: SingleAccountPlanDto
    ) {
        try {
            await this.singleAccountPlanService.update(
                singleAccountPlanId,
                singleAccountPlanDto
            );

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

    @Get(':singleAccountPlanId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(
        @Res() res: Response,
        @Param('singleAccountPlanId') singleAccountPlanId: number
    ) {
        try {
            const singleAccountPlan = await this.singleAccountPlanService.getById(
                singleAccountPlanId
            );

            res.status(HttpStatus.OK).send({
                singleAccountPlan
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
