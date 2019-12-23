import { Controller, Res, HttpStatus, Get, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from 'sigasac-utils';

import { AccountsTypesService } from './accounts-types.service';

@Controller('sigasac/v1/accounts-types')
@ApiTags('accounts-types')
@ApiBearerAuth()
export class AccountsTypesController {
    constructor(private readonly accountsTypesService: AccountsTypesService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(@Res() res: Response) {
        try {
            const accountTypes = await this.accountsTypesService.getAll();

            res.status(HttpStatus.OK).send({
                accountTypes
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
