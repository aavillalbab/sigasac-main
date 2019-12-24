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

import { ThirdPartyAccountsService } from './third-party-accounts.service';
import { ThirdPartyAccountDto, ChangeStateDto } from './dto';

@Controller('sigasac/v1/third-party-accounts')
@ApiBearerAuth()
@ApiTags('third-party-accounts')
export class ThirdPartyAccountsController {
    constructor(
        private readonly thirdPartyAccountsService: ThirdPartyAccountsService
    ) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @Body() thirdPartyAccountDto: ThirdPartyAccountDto
    ) {
        try {
            const thirdPartyAccount = await this.thirdPartyAccountsService.create(
                thirdPartyAccountDto
            );

            res.status(HttpStatus.CREATED).send({
                thirdPartyAccount
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
            const thirdPartyAccounts = await this.thirdPartyAccountsService.getAll();

            res.status(HttpStatus.OK).send({
                thirdPartyAccounts
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

    @Put(':thirdPartyAccountId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('thirdPartyAccountId') thirdPartyAccountId: number,
        @Body() thirdPartyAccountDto: ThirdPartyAccountDto
    ) {
        try {
            await this.thirdPartyAccountsService.update(
                thirdPartyAccountId,
                thirdPartyAccountDto
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

    @Get(':thirdPartyAccountId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(
        @Res() res: Response,
        @Param('thirdPartyAccountId') thirdPartyAccountId: number
    ) {
        try {
            const thirdPartyAccount = await this.thirdPartyAccountsService.getById(
                thirdPartyAccountId
            );

            res.status(HttpStatus.OK).send({
                thirdPartyAccount
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

    @Patch(':thirdPartyAccountId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async changeState(
        @Res() res: Response,
        @Param('thirdPartyAccountId') thirdPartyAccountId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.thirdPartyAccountsService.changeState(
                thirdPartyAccountId,
                changeStateDto.state
            );

            res.status(HttpStatus.NO_CONTENT).send({
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
