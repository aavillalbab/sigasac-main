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

import { ThirdPartyService } from './third-party.service';
import { ThirdPartyDto } from './dto';

@Controller('sigasac/v1/third-parties')
@ApiTags('third-parties')
@ApiBearerAuth()
export class ThirdPartyController {
    constructor(private readonly thirdPartyService: ThirdPartyService) {}

    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Res() res: Response,
        @User('schoolId') schoolId: number,
        @Body() third: ThirdPartyDto
    ) {
        try {
            third.schoolId = schoolId;

            const t = await this.thirdPartyService.create(third);

            res.status(HttpStatus.CREATED).send({
                thirdParties: t
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
            const thirdParties = await this.thirdPartyService.getAll();

            res.status(HttpStatus.OK).send({
                thirdParties
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

    @Get(':tpId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getById(@Res() res: Response, @Param('tpId') tpId: number) {
        try {
            const thirdPartie = await this.thirdPartyService.getById(tpId);

            res.status(HttpStatus.OK).send({
                thirdPartie
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

    @Put(':tpId')
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Res() res: Response,
        @Param('tpId') tpId: number,
        @Body() third: ThirdPartyDto
    ) {
        try {
            await this.thirdPartyService.update(tpId, third);

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

    @Patch(':tpId')
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async changeState(
        @Res() res: Response,
        @Param('tpId') tpId: number,
        @Body('state') state: number
    ) {
        try {
            await this.thirdPartyService.changeState(tpId, state);

            res.status(HttpStatus.NO_CONTENT).send({
                response: 'Cambio de estado exitoso!'
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
