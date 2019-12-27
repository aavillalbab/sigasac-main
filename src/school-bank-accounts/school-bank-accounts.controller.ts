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

import { SchoolBankAccountsService } from './school-bank-accounts.service';
import { SchoolBankAccountDto } from './dto';
import { ChangeStateDto } from 'src/bank/dto';

@Controller('sigasac/v1/school-bank-accounts')
@ApiTags('school-bank-accounts')
@ApiBearerAuth()
export class SchoolBankAccountsController {
    constructor(private readonly schoolBankAccountService: SchoolBankAccountsService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @User('schoolId') schoolId: number,
        @Body() schoolBankAccountDto: SchoolBankAccountDto
    ) {
        try {
            schoolBankAccountDto.schoolId = schoolId;

            const schoolBankAccount = await this.schoolBankAccountService.create(schoolBankAccountDto);

            res.status(HttpStatus.CREATED).send({
                schoolBankAccount
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
            const schoolBankAccounts = await this.schoolBankAccountService.getAll();

            res.status(HttpStatus.OK).send({
                schoolBankAccounts
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

    @Put(':schoolBankAccountId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('schoolBankAccountId') schoolBankAccountId: number,
        @Body() schoolBankAccountDto: SchoolBankAccountDto
    ) {
        try {
            await this.schoolBankAccountService.update(schoolBankAccountId, schoolBankAccountDto);

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

    @Get(':schoolBankAccountId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(@Res() res: Response, @Param('schoolBankAccountId') schoolBankAccountId: number) {
        try {
            const schoolBankAccount = await this.schoolBankAccountService.getById(schoolBankAccountId);

            res.status(HttpStatus.OK).send({
                schoolBankAccount
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

    @Patch(':schoolBankAccountId')
    @ApiOperation({})
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards(AuthGuard('jwt'))
    async changeState(
        @Res() res: Response,
        @Param('schoolBankAccountId') schoolBankAccountId: number,
        @Body() changeStateDto: ChangeStateDto
    ) {
        try {
            await this.schoolBankAccountService.changeState(
                schoolBankAccountId,
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
