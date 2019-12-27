import {
    Controller,
    Post,
    Res,
    Body,
    HttpStatus,
    Param,
    Put,
    Get,
    UseGuards,
    Patch
} from '@nestjs/common';

import { Response } from 'express';

import {
    ApiTags,
    ApiConsumes,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';

import { AuthGuard, User } from 'sigasac-utils';

import { BudgetAccountsService } from './budget-accounts.service';
import { BudgetAccountDto } from './dto';
import { ChangeStateDto } from 'src/bank/dto';

@Controller('sigasac/v1/budget-accounts')
@ApiBearerAuth()
@ApiTags('budget-accounts')
export class BudgetAccountsController {
    constructor(
        private readonly budgetAccountsService: BudgetAccountsService
    ) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() budgetAccountDto: BudgetAccountDto
    ) {
        try {
            const budgetAccount = await this.budgetAccountsService.create(
                budgetAccountDto
            );

            res.status(HttpStatus.CREATED).send({
                budgetAccount
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
            const budgetAccounts = await this.budgetAccountsService.getAll();

            res.status(HttpStatus.OK).send({
                budgetAccounts
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

    @Put(':budgetAccountId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('budgetAccountId') budgetAccountId: number,
        @Body() budgetAccountDto: BudgetAccountDto
    ) {
        try {
            await this.budgetAccountsService.update(
                budgetAccountId,
                budgetAccountDto
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

    @Get(':budgetAccountId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(
        @Res() res: Response,
        @Param('budgetAccountId') budgetAccountId: number
    ) {
        try {
            const budgetAccount = await this.budgetAccountsService.getById(
                budgetAccountId
            );

            res.status(HttpStatus.OK).send({
                budgetAccount
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

    @Patch(':budgetAccountId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async changeSate(
        @Res() res: Response,
        @Param('budgetAccountId') budgetAccountId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.budgetAccountsService.changeState(
                budgetAccountId,
                changeStateDto.state
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
}
