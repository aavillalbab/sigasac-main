import {
    Controller,
    Get,
    UseGuards,
    Res,
    HttpStatus
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
}
