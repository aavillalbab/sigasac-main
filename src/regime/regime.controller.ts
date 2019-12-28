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

import { RegimeService } from './regime.service';

@Controller(`${MAIN.apiBasePath}/${MAIN.subRoutes.regimes}`)
@ApiTags(`${MAIN.subRoutes.regimes}`)
@ApiBearerAuth()
export class RegimeController {
    constructor(private readonly regimeService: RegimeService) {}

    @Get()
    @ApiOperation({})
    @UseGuards(AuthGuard('jwt'))
    async getAll(@Res() res: Response) {
        try {
            const regimes = await this.regimeService.getAll();

            res.status(HttpStatus.OK).send({
                regimes
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
