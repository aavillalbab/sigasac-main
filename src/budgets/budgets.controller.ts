import {
    Controller,
    Get,
    UseGuards,
    Res,
    HttpStatus,
    Param
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { AuthGuard, User, MAIN } from 'sigasac-utils';
import { BudgetsService } from './budgets.service';

@Controller(`${MAIN.apiBasePath}/${MAIN.subRoutes.budgets}`)
@ApiTags(`${MAIN.subRoutes.budgets}`)
@ApiBearerAuth()
export class BudgetsController {
    constructor(private readonly budgetServices: BudgetsService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Res() res: Response) {
        try {
            const budgets = await this.budgetServices.getAll();

            res.status(HttpStatus.OK).send({
                budgets
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

    @Get(':budgetId/concepts')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getConcepts(
        @Res() res: Response,
        @Param('budgetId') budgetId: number
    ) {
        try {
            const concepts = await this.budgetServices.getConceptsByBudgetId(
                budgetId
            );

            res.status(HttpStatus.OK).send({
                concepts
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

    @Get('/concepts/:conceptId/subconcepts')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getSubconcepts(
        @Res() res: Response,
        @Param('conceptId') conceptId: number
    ) {
        try {
            const subconcepts = await this.budgetServices.getSubconceptsByConceptId(
                conceptId
            );

            res.status(HttpStatus.OK).send({
                subconcepts
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
